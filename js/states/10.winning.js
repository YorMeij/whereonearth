(function(Game, State) {
    console.log('damn function works');
    var WinningView = Backbone.View.extend({
        initialize: function(options) {
            // Placeholder for our template
            this.template = options.template;
        },
        events: {
            "click .go": "proceed"
        },
        proceed: function() {
            Game.engine.turn('city');
        },
        render: function() {
            var $el = this.$el;

            var context = {
                artifact: Game.stolen,
                city: Game.player.city()
            };

            this.template(context, function(error, html) {
                $el.html(html);
            });

            return this.$el;
        }
    });

    // Build a new state object
    var state = _.defaults({
        name: "winning",
        templateUrl: '/templates/winning.html',
        render: function(canvas) {
            // Build a new View
            var view = new WinningView({
                template: this.template()
            });

            canvas.append(view.render());
        }
    }, State);

    // Register the state with the Game engine
    Game.engine.registerState(state);
})(window.Game, window.State);
