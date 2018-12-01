function AnimationCursor() {
    this.animation = null;
    this.index = 0;
    this.timeToNext = 0;
    this.progress = 0;
    this.isPlaying = false;
}

AnimationCursor.prototype.play = function(animation) {
    this.isPlaying = true;
    this.animation = animation;
    this.index = 0;
    this.frame = animation.frames[0];
    this.nextFrame = animation.frames[this.getNextIndex()];
    this.frameTime = 0;
};

AnimationCursor.prototype.getNextIndex = function() {
    var index = this.index + 1;

    if (index >= this.animation.frames.length) {
        switch (this.animation.playMode) {
            case "once":
                index--;
                break;

            case "loop":
                index = 0;
                break;
        }
    }

    return index;
};

AnimationCursor.prototype.update = function() {
    if (!this.isPlaying)
        return;

    this.frameTime++;

    if (this.frameTime > this.frame.time) {
        var index = this.getNextIndex();
        if (index === this.index) {
            this.isPlaying = false;
        }

        this.index = index;
        this.frame = this.animation.frames[this.index];
        this.nextFrame = this.animation.frames[this.getNextIndex()];
        this.timeToNext = this.frame.time;
        this.frameTime = 0;
    }

    this.progress = this.frameTime / this.frame.time;
};
