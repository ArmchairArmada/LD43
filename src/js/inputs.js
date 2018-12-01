function InputManager(canvas) {
    var self = this;

    this.keyUp = false;
    this.keyLeft = false;
    this.keyDown = false;
    this.keyRight = false;
    this.keyAction = false;

    this.mouseX = 0;
    this.mouseY = 0;
    this.mouseButton = false;

    this.clearChange();

    window.addEventListener("keydown", function(event) {
        switch (event.code) {
            case "KeyW":
                if (!self.keyUp)
                    self.keyUpChange = true;
                self.keyUp = true;
                break;

            case "KeyA":
                if (!self.keyLeft)
                    self.keyLeftChange = true;
                self.keyLeft = true;
                break;

            case "KeyS":
                if (!self.keyDown)
                    self.keyDownChange = true;
                self.keyDown = true;
                break;

            case "KeyD":
                if (!self.keyRight)
                    self.keyRightChange = true;
                self.keyRight = true;
                break;

            case "Space":
                if (!self.keyAction)
                    self.keyActionChange = true;
                self.keyAction = true;
                break;
        }
    });

    window.addEventListener("keyup", function(event) {
        switch (event.code) {
            case "KeyW":
                if (self.keyUp)
                    self.keyUpChange = true;
                self.keyUp = false;
                break;

            case "KeyA":
                if (self.keyLeft)
                    self.keyLeftChange = true;
                self.keyLeft = false;
                break;

            case "KeyS":
                if (self.keyDown)
                    self.keyDownChange = true;
                self.keyDown = false;
                break;

            case "KeyD":
                if (self.keyRight)
                    self.keyRightChange = true;
                self.keyRight = false;
                break;

            case "Space":
                if (self.keySpace)
                    self.keySpaceChange = true;
                self.keyAction = false;
                break;
        }
    });

    canvas.addEventListener("mousemove", function(event) {
        self.mouseX = event.x - canvas.offsetLeft;
        self.mouseY = event.y - canvas.offsetTop;
    });

    canvas.addEventListener("mousedown", function(event) {
        if (!self.mouseButton)
            self.mouseButtonChange = true;
        self.mouseButton = true;
    });

    canvas.addEventListener("mouseup", function(event) {
        if (self.mouseButton)
            self.mouseButtonChange = true;
        self.mouseButton = false;
    });
};

InputManager.prototype.clearChange = function() {
    this.keyUpChange = false;
    this.keyLeftChange = false;
    this.keyDownChange = false;
    this.keyRightChange = false;
    this.keyActionChange = false;
    this.mouseButtonChange = false;
};
