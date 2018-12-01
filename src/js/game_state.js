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

    this.animation = {
        playMode: "loop",
        frames: [
            {time: 30, value: [1, 0, 0]},
            {time: 30, value: [0, 1, 0]},
            {time: 30, value: [0, 0, 1]}
        ]
    };

    this.animCursor = new AnimationCursor();
    this.animCursor.play(this.animation);
};

GameStateTitle.prototype.gainFocus = function(oldState) {
    console.log("Game State Title gaining focus");
    for (var i=0; i<100; i++) {
        var entity = new TestEntity(this.scene);
        this.scene.entityManager.add(entity);
    }
};

GameStateTitle.prototype.loseFocus = function(oldState) {
    console.log("Game State Title losing focus");
};

GameStateTitle.prototype.update = function(ctx) {
    this.animCursor.update();

    var p = this.animCursor.progress;
    var r = Math.floor(255 * (this.animCursor.frame.value[0] * (1 - p) + this.animCursor.nextFrame.value[0] * p));
    var g = Math.floor(255 * (this.animCursor.frame.value[1] * (1 - p) + this.animCursor.nextFrame.value[1] * p));
    var b = Math.floor(255 * (this.animCursor.frame.value[2] * (1 - p) + this.animCursor.nextFrame.value[2] * p));

    ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    console.log(ctx.fillStyle);

    this.scene.update();
    this.scene.draw(ctx);
};
