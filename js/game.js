(function(exports) {

    // Global namespace
    var Game = exports.Game = {};

    // Create a new game engine
    Game.engine = new Engine();

    // Create a simple debug logger
    Game.log = debug('game');

    /** **/

    /**
     * Game engine. Responsible for connecting states and
     * loading assets.
     */
    function Engine() {
        // Available states
        this.states = {};

        // The current state
        this.state = null;
    }

    /**
     * A turn is an engine state change.
     * @param {String} next     The next state to turn to
     */
    Engine.prototype.turn = function(next) {
        Game.log('Engine turn to ' + next);

        if (!this.states.hasOwnProperty(next)) {
            Game.log('Unknown state: ' + next);
            throw new Error('Unknown state: ' + next);
        }
    };

    Engine.prototype.load = function(data_url) {
        $.get(data_url, function(data, statusText, xhr) {

        });
    };

    /**
     * Start the Game engine. This will render the splash screen
     */
    Engine.prototype.start = function() {
        Game.log('Starting Game engine');
        this.turn('splash');
    };

    // State object skeleton
    exports.State = {
        setup: function() {
            return true;
        },
        draw: function() {
            throw new Error('draw function not implemented');
        },
        update: function() {
            return true;
        }
    };

})(window);
