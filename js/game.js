(function(exports) {

    // Global namespace
    var Game = exports.Game = {
        // Create a simple debug logger
        log: debug('game'),
        artifacts: [],
        locations: [],
        load: function(callback) {
            // Load queue
            var queue = [];

            // Load art objects
            // @FIXME Load art objects

            // Load game locations
            queue.push(function(done) {
                Game.engine.load('/data/locations.json', function(data) {
                    Game.cities = data;
                    done(null);
                });
            });

            // Load templates
            queue.push(function(done) {
                async.forEach(_.toArray(Game.engine.states), function(state, loaded) {
                    state.load(loaded);
                }, done);
            });

            // Preload images
            // @FIXME Preload images

            // Process load queue
            async.forEach(queue, function(step, done) {
                step(done);
            }, callback);
        },

        /**
         * Init method
         * @param jQuery el HTML element to render to
         */
        initialize: function(el) {
            Game.load(function() {
                // Register the canvas element
                Game.engine.$el = el;

                // Hack the first location
                Game.engine.player.city(Game.cities[0]);

                // Turn to the first state
                Game.engine.turn('city');
            });
        }
    };

    // Create a new Engine
    Game.engine = new Engine();

/** ******************************************************************************************* **/

    /**
     * Game engine. Responsible for connecting states and
     * loading assets.
     */
    function Engine() {
        // Available states
        this.states = {};

        // The current state
        this.state = null;

        // Reference to the canvas element
        this.$el = null;

        // Current player
        this.player = new Player();
    }

    Engine.prototype.registerState = function(state) {
        this.states[state.name] = state;
        return this;
    };

    /**
     * A turn is an engine state change.
     * @param {String} next     The next state to turn to
     */
    Engine.prototype.turn = function(next) {
        Game.log('Engine turn to ' + next);

        // Get the next state
        var state = this.states[next];

        // Check if the state exists
        if (!state) {
            Game.log('Unknown state: ' + next);
            throw new Error('Unknown state: ' + next);
        }

        // Display transition overlay
        // @FIXME Add state transistions

        // Wipe the previous state
        state.wipe();

        // Clear the canvas (if something was left over)
        this.$el.children().remove();

        // Render the new State
        state.render(this.$el);
    };

    Engine.prototype.load = function(data_url, callback) {
        $.getJSON(data_url, callback);
    };

    /**
     * Initialize the Game engine. This will render the splash screen and turn handling
     * is done from there.
     */
    Engine.prototype.initialize = function() {
        Game.log('Starting Game engine');
        this.turn('splash');
    };

/** ******************************************************************************************* **/

    /**
     * Game player
     */
    function Player() {
        this.name = "Sherlock Holmes";

        this._city = null;
        this._location = null;
    }

    Player.prototype.city = function(city) {
        if (!arguments.length) return this._city;

        this._city = city;
        return this;
    };

    /**
     * Get or set the current player location
     * @param {Object} location
     */
    Player.prototype.location = function(location) {
        if (!arguments.length) return this._location;

        this._location = location;

        return this;
    };

/** ******************************************************************************************* **/

    var cache = {};

    // State object skeleton
    exports.State = {
        load: function(done) {
            if (!this.templateUrl) return done(null);
            var name = this.name;

            Game.log('compiling template ' + name);
            // Fetch the template
            $.get(this.templateUrl, function(data, statusText, xhr) {
                // Load the template into dust
                var template = dust.compile(data, name);
                dust.loadSource(template);

                // We are done without errors
                done(null);
            });
        },
        template: function() {
            var name = this.name;

            // Return a render function
            return function(context, callback) {
                if (!callback) callback = function() {};
                dust.render(name, context, callback);
            };
        },
        setup: function() {
            return true;
        },
        render: function() {
            throw new Error('render function not implemented');
        },
        wipe: function() {
            return true;
        }
    };

})(window);
