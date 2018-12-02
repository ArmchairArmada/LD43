const SQRT_MAX = Math.floor(Math.sqrt(Number.MAX_SAFE_INTEGER));

function posHash(x, y) {
    return y * SQRT_MAX + x;
};


function Rect(x, y, width, height, contents) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.contents = contents;
}

Rect.prototype.overlapping = function(rect) {
    return this.x + this.width >= rect.x    // a.right < b.left
        && this.x <= rect.x + rect.width    // a.left > b.right
        && this.y + this.height >= rect.y   // a.bottom < b.top
        && this.y <= rect.y + rect.height;  // a.top > b.bottom
};

Rect.prototype.contains = function(point) {
    return point.x > this.x
        && point.x < this.x + this.width
        && point.y > this.y
        && point.y < this.y + this.height;
};


// --------------------------------------------------------------------------------------------------------------------
function Collision(cellSize) {
    this.buckets = {};
    this.cellSize = cellSize;
}

Collision.prototype.add = function(rect) {
    var x1 = Math.floor(rect.x / this.cellSize);
    var y1 = Math.floor(rect.y / this.cellSize);
    var x2 = Math.floor((rect.x + rect.width) / this.cellSize);
    var y2 = Math.floor((rect.y + rect.height) / this.cellSize);

    for (var j=y1; j<y2+1; j++) {
        for (var i=x1; i<x2+1; i++) {
            var index = posHash(i, j);
            if (!(index in this.buckets)) {
                this.buckets[index] = [];
            }

            this.buckets[index].push(rect);
        }
    }
};

Collision.prototype.remove = function(rect) {
    var x1 = Math.floor(rect.x / this.cellSize);
    var y1 = Math.floor(rect.y / this.cellSize);
    var x2 = Math.floor((rect.x + rect.width) / this.cellSize);
    var y2 = Math.floor((rect.y + rect.height) / this.cellSize);

    for (var j=y1; j<y2+1; j++) {
        for (var i=x1; i<x2+1; i++) {
            var index = posHash(i, j);
            this.buckets[index] = removeFromArray(this.buckets[index], rect);
            if (this.buckets[index].length === 0) {
                delete this.buckets[index];
            }
        }
    }
};

Collision.prototype.getOverlapping = function(rect) {
    var overlappingRects = [];

    var x1 = Math.floor(rect.x / this.cellSize);
    var y1 = Math.floor(rect.y / this.cellSize);
    var x2 = Math.floor((rect.x + rect.width) / this.cellSize);
    var y2 = Math.floor((rect.y + rect.height) / this.cellSize);

    for (var j=y1; j<y2+1; j++) {
        for (var i=x1; i<x2+1; i++) {
            var index = posHash(i, j);
            if (index in this.buckets) {
                var bucket = this.buckets[index];
                for (var k=0; k<bucket.length; k++) {
                    var other = bucket[k];
                    if (rect.overlapping(other) && !(other in overlappingRects)) {
                        overlappingRects.push(other);
                    }
                }
            }
        }
    }

    return overlappingRects;
};
