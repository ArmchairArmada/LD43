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
    this.spriteManager = new SpriteManager();
};

GameStateTitle.prototype.gainFocus = function(oldState) {
    console.log("Game State Title gaining focus");
    this.sprite = new Sprite();
    this.sprite.image = services.assetManager.images["test.png"];
    this.sprite.x = 100;
    this.sprite.y = 100;
    this.spriteManager.add(this.sprite);
};

GameStateTitle.prototype.loseFocus = function(oldState) {
    console.log("Game State Title losing focus");
};

GameStateTitle.prototype.update = function(ctx) {
    ctx.fillStyle = "#FFFF00";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    this.sprite.x++;
    this.sprite.y++;

    this.spriteManager.draw(ctx, {x:0, y:0});
};
