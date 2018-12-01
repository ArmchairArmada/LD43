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
    ctx.beginPath();
    ctx.arc(100, 100, 100, 0, 2*Math.PI);
    ctx.stroke();
};


// --------------------------------------------------------------------------------------------------------------------
function GameStateTitle() {
    console.log("Creating Game State Title");
};

GameStateTitle.prototype.gainFocus = function(oldState) {
    console.log("Game State Title gaining focus");
};

GameStateTitle.prototype.loseFocus = function(oldState) {
    console.log("Game State Title losing focus");
};

GameStateTitle.prototype.update = function(ctx) {
};
