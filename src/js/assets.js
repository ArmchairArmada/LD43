function AssetManager(assetBase, doneCallback) {
    this.assetBase = assetBase;
    this.doneCallback = doneCallback;
    this.images = {};
    this.assetsLoaded = 0;
    this.assetCount = 0;
}

AssetManager.prototype.doneImageLoad = function() {
    this.assetsLoaded++;
    if (this.assetsLoaded === this.assetCount)
        this.doneCallback();
}

AssetManager.prototype.load = function(assets) {
    this.assetCount += assets.images.length;

    for (var i=0; i<assets.images.length; i++) {
        this.loadImage(assets.images[i]);
    }
};

AssetManager.prototype.loadImage = function(name) {
    var self = this;
    var path = this.assetBase + name;
    var image = new Image();
    image.src = path;
    image.addEventListener("load", function() {
        console.log("Loaded image: " + path);
        self.images[name] = image;
        self.doneImageLoad();
    });
};
