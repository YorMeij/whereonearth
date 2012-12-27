(function(exports) {
    var State = exports.State;
    var views = exports.views;

    // Available game states
    var states = {};

    // Starting menu
    states.menu = _.extend({}, State);

    // Mystery introduction
    states.intro = _.extend({}, State);

    // City location (can be main location)
    states.location = _.extend({}, State);

    // Airport state
    states.airport = _.extend({}, State);

    // Travel state
    states.travel = _.extend({}, State);

    // End state (won/lost)
    states.end = _.extend({}, State);

})(window);
