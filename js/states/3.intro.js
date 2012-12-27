(function(Game, State) {

    var IntroView = Backbone.View.extend({
        initialize: function(options) {
            // Placeholder for our template
            this.template = options.template;
        },

    });

    // Build a new state object
    var state = _.defaults({
        name: "intro",
        templateUrl: '/templates/intro.html',
        render: function(canvas) {
            // Build a new View
            var view = new IntroView({
                template: this.template()
            });

            canvas.append(view.render());
        }
    }, State);

    // Register the state with the Game engine
    Game.engine.registerState(state);
})(window.Game, window.State);
