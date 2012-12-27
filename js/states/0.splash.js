(function(Game, State) {

    var state = _.extend({
        "name": "splash"
    }, State);


    // Register this state with the Game engine
    Game.engine.states[state.name] = state;

})(Game, State);
