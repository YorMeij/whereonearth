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

            this.clue = this.findClue(this.city, this.location);
            console.log(this.location);
            console.log("Clue:", this.clue);
            
        },
        findNextCity: function(city, location) {
            for (var i = 0; i < Game.thief._city.length; i++) {
                var _city = Game.thief._city[i];
                if (city.id === _city.id) {
                    var nextCity = Game.thief._city[i + 1];
                    console.log("Next city:", nextCity);
                    return nextCity;
                }
            }
            return null;
        },
        findClue: function(city, location) {
            var nextCity = this.findNextCity(city, location);
            if (nextCity === null) {
                console.log("Dead end clue");
                return city.clues[3];
            }

            // we use the index off the location for selection of the clue
            for (var i = 0; i < 3; i++) {
                if (location.id == city.locations[i].id) {
                    if (nextCity.clues && nextCity.clues.length > 0) {
                        console.log("Clue:", nextCity.clues[i]);
                        return nextCity.clues[i];
                    }
                    return "Placeholder clue " + i;
                }
            }
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
                locations: this.city.locations,
                clue:      this.clue
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
