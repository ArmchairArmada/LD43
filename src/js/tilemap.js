function TileMap(tilesGfx, tileWidth, tileHeight, tileData) {
    this.tilesGfx = tilesGfx;
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;
    this.tileData = tileData;

    this.spriteTiles = [];
}

TileMap.prototype.draw = function(ctx, camera) {
    // TODO: Smarter drawing to avoid drawing off screen
    for (var y=0; y<this.tileData.length; y++) {
        for (var x=0; x<this.tileData[y].length; x++) {
            ctx.drawImage(this.tilesGfx[this.tileData[y][x]], x * this.tileWidth - camera.x, y * this.tileHeight - camera.y);
        }
    }
};

TileMap.prototype.addSpriteTiles = function(spriteManager) {
    for (var y=0; y<this.tileData.length; y++) {
        for (var x=0; x<this.tileData[y].length; x++) {
            var sprite = new Sprite();
            sprite.image = this.tilesGfx[this.tileData[y][x]];
            sprite.x = x * this.tileWidth;
            sprite.y = y * this.tileHeight;
            sprite.z = this.tileHeight-sprite.y;
            spriteManager.add(sprite);
            this.spriteTiles.push(sprite);
        }
    }
};

TileMap.prototype.removeSpriteTiles = function(spriteManager) {
    for (var i=0; i<this.spriteTiles.length; i++) {
        spriteManager.removeSpriteTiles(this.spriteTiles[i]);
    }
    this.spriteTiles = [];
};
