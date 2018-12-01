function Scene() {
    this.entityManager = new EntityManager();
    this.spriteManager = new SpriteManager();
    this.camera = {x:0, y:0};
}

Scene.prototype.update = function() {
    this.entityManager.update();
};

Scene.prototype.draw = function(ctx) {
    this.spriteManager.draw(ctx, this.camera);
}

// --------------------------------------------------------------------------------------------------------------------
function EntityManager() {
    this.entities = [];
}

EntityManager.prototype.add = function(entity) {
    this.entities.push(entity);
};

EntityManager.prototype.remove = function(entity) {
    this.entities.remove(entity);
};

EntityManager.prototype.killAll = function() {
    for (var i=0; i<this.entities.length; i++) {
        this.entities[i].kill();
    }
    this.entities = [];
};

EntityManager.prototype.update = function() {
    for (var i=this.entities.length-1; i>=0; i--) {
        var entity = this.entities[i];
        if (!entity.update()) {
            this.remove(entity);
        }
    }
};


// --------------------------------------------------------------------------------------------------------------------
function TestEntity(scene) {
    this.scene = scene;

    this.sprite = new Sprite();
    this.sprite.x = Math.random() * 800;
    this.sprite.y = Math.random() * 600;
    this.sprite.image = services.assetManager.images["test.png"];
    scene.spriteManager.add(this.sprite);

    this.dx = Math.random() - 0.5;
    this.dy = Math.random() - 0.5;
}

TestEntity.prototype.update = function() {
    this.sprite.x += this.dx;
    this.sprite.y += this.dy;
    this.sprite.z = -this.sprite.y;

    return true;
};

TestEntity.prototype.kill = function() {
    console.log("TestEntity killed");
    this.scene.spriteManager.remove(this.sprite);
};
