function TileMap(tiles, tileWidth, tileHeight, tileData) {
    this.tiles = tiles;
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;
    this.tileData = tileData;

    this.spriteTiles = [];
}

TileMap.prototype.addSpriteTiles = function(spriteManager) {
    for (var y=0; y<this.tileData.length; y++) {
        for (var x=0; x<this.tileData[y].length; x++) {
            var tile = this.tiles[this.tileData[y][x]];
            var sprite = new Sprite(
                spriteManager,
                tile.image,
                x * this.tileWidth,
                y * this.tileHeight,
                -this.tileHeight - y * this.tileHeight + tile.depth);
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
