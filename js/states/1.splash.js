(function(Game, State) {

    var state = _.extend({
        "name": "splash",
        "render": function() {

        }
    }, State);


    // Register this state with the Game engine
    Game.engine.states[state.name] = state;

})(window.Game, window.State);
