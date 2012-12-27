(function(Game, State) {


    var LocationView = Backbone.View.extend({
        events: {
            "click .option": "turn"
        },
        initialize: function(options) {
            // Placeholder for our template
            this.template = options.template;

            // Get the player location
            this.city = Game.player.city();
            this.location = Game.player.location();

            console.log(this.location);
            // 
        },
        turn: function(event) {
            var $target = $(event.target);
            var location = $target.data('location');

            console.log(location);
            if (location === 'airport') {
                return Game.engine.turn('airport');
            }

            // Update the player position
            this.city.locations.forEach(function(site) {
                if (site.id === location) {
                    Game.player.location(site);
                }
            });

            Game.engine.turn('location');
        },
        render: function() {
            var $el = this.$el;

            // Build the context object
            var context = {
                name:      this.city.name,
                image:     this.city.image,
                location:  this.location,
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
        name: "location",
        templateUrl: '/templates/location.html',
        render: function(canvas) {
            // Build a new View
            var view = new LocationView({
                template: this.template()
            });

            canvas.append(view.render());
        }
    }, State);

    // Register the state with the Game engine
    Game.engine.registerState(state);
})(window.Game, window.State);
