function SpriteManager() {
    this.sprites = [];
}

SpriteManager.prototype.draw = function(ctx, camera) {
    this.sprites.sort(function(a, b) {
        return b.z - a.z;
    });

    for (var i=0; i<this.sprites.length; i++) {
        this.sprites[i].draw(ctx, camera);
    }
};

SpriteManager.prototype.add = function(sprite) {
    this.sprites.push(sprite);
};

SpriteManager.prototype.remove = function(sprite) {
    this.sprites.remove(sprite);
};


// --------------------------------------------------------------------------------------------------------------------
function Sprite() {
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.image = null;
}

Sprite.prototype.draw = function(ctx, camera) {
    ctx.drawImage(this.image, Math.floor(this.x) - Math.floor(camera.x), Math.floor(this.y) - Math.floor(camera.y));
}
