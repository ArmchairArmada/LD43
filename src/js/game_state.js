function GameStateManager() {
    this.currentState = null;
    this.states = {};
};

GameStateManager.prototype.switchState = function(newStateName) {
    var newState = this.states[newStateName];
    var oldState = this.currentState;
    if (this.currentState !== null)
        this.currentState.loseFocus(newState);
    this.currentState = newState;
    this.currentState.gainFocus(oldState);
};

GameStateManager.prototype.addState = function(name, state) {
    this.states[name] = state;
};

GameStateManager.prototype.update = function(ctx) {
    this.currentState.update(ctx);
};


// --------------------------------------------------------------------------------------------------------------------
function GameStateIntro() {
    console.log("Creating Game State Intro");
};

GameStateIntro.prototype.gainFocus = function(oldState) {
    console.log("Game State Intro gaining focus");
};

GameStateIntro.prototype.loseFocus = function(oldState) {
    console.log("Game State Intro losing focus");
};

GameStateIntro.prototype.update = function(ctx) {
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};


// --------------------------------------------------------------------------------------------------------------------
function GameStateTitle() {
    console.log("Creating Game State Title");
    this.scene = new Scene();
};

GameStateTitle.prototype.gainFocus = function(oldState) {
    console.log("Game State Title gaining focus");
    for (var i=0; i<1000; i++) {
        var entity = new TestEntity(this.scene);
        this.scene.entityManager.add(entity);
    }
};

GameStateTitle.prototype.loseFocus = function(oldState) {
    console.log("Game State Title losing focus");
};

GameStateTitle.prototype.update = function(ctx) {
    ctx.fillStyle = "#FFFF00";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    this.scene.update();
    this.scene.draw(ctx);
};
