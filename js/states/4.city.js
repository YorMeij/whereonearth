(function(Game, State) {


    var CityView = Backbone.View.extend({
        events: {
            "click .option": "turn"
        },
        initialize: function(options) {
            // Placeholder for our template
            this.template = options.template;

            // Get the player location
            this.city = Game.engine.player.city();
        },
        turn: function(event) {
            var $target = $(event.target);
            var location = $target.data('location');

            // Special case for airport
            if (location === 'airport') {
                return Game.engine.turn('airport');
            }

            // Update the player position
            this.city.locations.forEach(function(site) {
                if (site.id === location) {
                    Game.engine.player.location(site);
                }
            });

            // Turn to the actual location
            Game.engine.turn('location');
        },
        render: function() {
            var $el = this.$el;

            // Build the context object
            var context = {
                name:      this.city.name,
                image:     this.city.image,
                locations: this.city.locations
            };

            this.template(context, function(error, html) {
                $el.html(html);
            });

            return this.$el;
        }
    });

    // Build a new state object
    var state = _.defaults({
        name: "city",
        templateUrl: '/templates/city.html',
        render: function(canvas) {
            // Build a new View
            var view = new CityView({
                template: this.template()
            });

            canvas.append(view.render());
        }
    }, State);

    // Register the state with the Game engine
    Game.engine.registerState(state);
})(window.Game, window.State);
