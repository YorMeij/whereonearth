(function(Game, State) {


    var CityView = Backbone.View.extend({
        initialize: function(options) {
            // Placeholder for our template
            this.template = options.template;
        },
        render: function() {
            var $el = this.$el;
            this.template({ city: 'Amsterdam', }, function(error, html) {
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
