function main(canvasId) {
    var game = new Game(canvasId);
    game.gameLoop();
}


// --------------------------------------------------------------------------------------------------------------------
function Game(canvasId) {
    var self = this;

    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");

    services.inputManager = new InputManager(this.canvas);

    services.stateManager = new GameStateManager();

    services.stateManager.addState("intro", new GameStateIntro());
    services.stateManager.addState("title", new GameStateTitle());

    services.stateManager.switchState("intro");

    services.assetManager = new AssetManager("/assets/", function() {
        services.stateManager.switchState("title");
    });

    services.assetManager.load({
        "images": [
            "test.png"
        ]
    });
}

Game.prototype.gameLoop = function() {
    services.stateManager.update();
    services.stateManager.draw(this.ctx);
    window.requestAnimationFrame(this.gameLoop.bind(this));
    // TODO: This may not be reliable because input events are not tied to the animation update
    services.inputManager.clearChange();
};
