(function(Game, State) {

    var AirportView = Backbone.View.extend({
        events: {
            "click .pin": "travel"
        },
        initialize: function(options) {
            this.template = options.template;
            this.cities = Game.cities;
            console.log(this.cities);
        },
        travel: function(event) {
            var $target = $(event.target);
            var cityName = $target.data('city');

            Game.log('Traveling to ' + cityName);

            var city = _.find(Game.cities, function(available) {
                return available.id === cityName;
            });

            Game.engine.player.city(city);
            Game.engine.player.location(null);

            Game.engine.turn('city');
        },
        render: function() {
            var $el = this.$el;

            var current = Game.engine.player.city();
            var context = {
                cities:  this.cities,
                current: current
            };

            function createPin(city) {
                var container = $('<div></div>')
                    .addClass('pin')
                    .css({
                        left: city.map.x + 'px',
                        top:  city.map.y + 'px'
                    })
                    .data('city', city.id);

                if (city.id === current.id) {
                    container.addClass('current');
                }

                return container;
            }

            this.template(context, function(error, html) {
                $el.html(html);

                var map = $el.find('.world-map');

                // Paint all rectangles with jQuery so we can attach events
                context.cities.map(createPin).forEach(function(pin) {
                    map.append(pin);
                });
            });

            return this.$el;
        }

    });

    // Build a new state object
    var state = _.defaults({
        name: "airport",
        templateUrl: '/templates/airport.html',
        render: function(canvas) {
            // Build a new View
            var view = new AirportView({
                template: this.template()
            });

            canvas.append(view.render());
        }
    }, State);

    // Register the state with the Game engine
    Game.engine.registerState(state);
})(window.Game, window.State);
