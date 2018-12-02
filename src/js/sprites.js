function SpriteManager(cellSize) {
    this.sprites = [];
    this.collision = new Collision(cellSize);
}

SpriteManager.prototype.draw = function(ctx, camera) {
    var visibleRects = this.collision.getOverlapping(camera);

    visibleRects.sort(function(a, b) {
        return b.contents.z - a.contents.z;
    });

    for (var i=0; i<visibleRects.length; i++) {
        visibleRects[i].contents.draw(ctx, camera);
    }
};

SpriteManager.prototype.add = function(sprite) {
    this.sprites.push(sprite);
    this.collision.add(sprite.rect);
};

SpriteManager.prototype.remove = function(sprite) {
    this.sprites = removeFromArray(this.sprites, sprite);
    this.collision.remove(sprite.rect);
};


// --------------------------------------------------------------------------------------------------------------------
function Sprite(spriteManager, image, x, y, z) {
    this.spriteManager = spriteManager;
    this.rect = new Rect(x, y, image.width, image.height, this);
    this.z = z;
    this.image = image;
    this.visible = true;
    spriteManager.add(this);
}

Sprite.prototype.draw = function(ctx, camera) {
    if (this.visible) {
        ctx.drawImage(
            this.image, Math.floor(this.rect.x) - Math.floor(camera.x),
            Math.floor(this.rect.y) - Math.floor(camera.y));
    }
};

Sprite.prototype.move = function(x, y) {
    this.spriteManager.remove(this);
    this.rect.x = x;
    this.rect.y = y;
    this.spriteManager.add(this);
};
