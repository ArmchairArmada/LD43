function Scene(width, height) {
    this.entityManager = new EntityManager();
    this.spriteManager = new SpriteManager(128);
    this.camera = new Rect(0, 0, width, height, null);
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
    removeFromArray(this.entities, entity);
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

    this.sprite = new Sprite(
        scene.spriteManager,
        services.assetManager.images["test.png"],
        Math.random() * 800,
        Math.random() * 600,
        0);

    this.dx = Math.random() - 0.5;
    this.dy = Math.random() - 0.5;
}

TestEntity.prototype.update = function() {
    this.sprite.move(
        this.sprite.rect.x + this.dx,
        this.sprite.rect.y + this.dy);
    this.sprite.z = -this.sprite.rect.y - this.sprite.rect.height;

    return true;
};

TestEntity.prototype.kill = function() {
    console.log("TestEntity killed");
    this.scene.spriteManager.remove(this.sprite);
    this.scene.entityManager.remove(this);
};

// --------------------------------------------------------------------------------------------------------------------
const PLAYER_ACCEL = 0.5;
const PLAYER_DRAG = 0.13;

function PlayerEntity(scene) {
    this.scene = scene;

    this.sprite = new Sprite(
        scene.spriteManager,
        services.assetManager.images["wizard.png"],
        400,
        300,
        0);

    this.vx = 0;
    this.vy = 0;
}

PlayerEntity.prototype.update = function() {
    var ix = 0;
    var iy = 0;

    if (services.inputManager.keyUp) {
        iy -= 1;
    }

    if (services.inputManager.keyDown) {
        iy += 1;
    }

    if (services.inputManager.keyLeft) {
        ix -= 1;
    }

    if (services.inputManager.keyRight) {
        ix += 1;
    }

    var d = Math.sqrt(ix * ix + iy * iy);
    if (d > 0) {
        ix = ix / d;
        iy = iy / d;
    }

    this.vx += PLAYER_ACCEL * ix;
    this.vy += PLAYER_ACCEL * iy;

    this.vx -= this.vx * PLAYER_DRAG;
    this.vy -= this.vy * PLAYER_DRAG;

    this.sprite.move(
        this.sprite.rect.x + this.vx,
        this.sprite.rect.y + this.vy);

    this.sprite.z = -this.sprite.rect.y - this.sprite.rect.height;

    this.scene.camera.x = this.sprite.rect.x - globals.canvasWidth/2 + 25;
    this.scene.camera.y = this.sprite.rect.y - globals.canvasHeight/2 + 25;

    return true;
};

PlayerEntity.prototype.kill = function() {
    this.scene.spriteManager.remove(this.sprite);
    this.scene.entityManager.remove(this);
};

// --------------------------------------------------------------------------------------------------------------------
function TargetEntity(scene) {
    this.scene = scene;

    this.sprite = new Sprite(
        scene.spriteManager,
        services.assetManager.images["target.png"],
        400,
        300,
        -10000);
}

TargetEntity.prototype.update = function() {
    if (services.inputManager.mouseButton && services.inputManager.mouseButtonChange) {
        console.log("Click: " + services.inputManager.mouseX + ", " + services.inputManager.mouseY);
    }

    this.sprite.move(this.scene.camera.x + services.inputManager.mouseX-25, this.scene.camera.y + services.inputManager.mouseY-25);

    return true;
}

TargetEntity.prototype.kill = function() {
    this.scene.spriteManager.remove(this.sprite);
    this.scene.entityManager.remove(this);
};
