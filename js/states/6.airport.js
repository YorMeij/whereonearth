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

            var context = {
                cities: this.cities
            };

            this.template(context, function(error, html) {
                $el.html(html);
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
