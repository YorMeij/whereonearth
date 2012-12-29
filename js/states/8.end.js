var City = Game.player.city(); // city = location player
var ThiefCity = Game.thief.city(); // _city = location thief
function winning(){
    var goed = 0;
    if (City = ThiefCity){
        goed = goed + 1;}
    if (goed >= 3){
        state.wipe();
        this.$el.children().remove();
        throw new Error('end game');
    }
}



