function main(canvasId) {
    var game = new Game(canvasId);
    game.gameLoop();
}


// --------------------------------------------------------------------------------------------------------------------
function Game(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");

    this.stateManager = new GameStateManager();

    this.stateManager.addState("intro", new GameStateIntro());
    this.stateManager.addState("title", new GameStateTitle());

    this.stateManager.switchState("intro");
}

Game.prototype.gameLoop = function() {
    this.stateManager.update(this.ctx);
    window.requestAnimationFrame(this.gameLoop.bind(this));
}
