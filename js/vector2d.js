(function(){
    'use strict';

    function Vector2D(x, y) {
        this.X = x;
        this.Y = y;
    }

    Vector2D.random = function() {
        return new Vector2D(Math.random(), Math.random());
    }

    Vector2D.prototype.add = function(v) {
        return new Vector2D(
            v.X + this.X,
            v.Y + this.Y
        );
    }

    Vector2D.prototype.sub = function(v) {
        return new Vector2D(
            this.X - v.X,
            this.Y - v.Y
        );
    }

    Vector2D.prototype.mult = function(factor) {
        return new Vector2D(
            this.X * factor,
            this.Y * factor
        );
    }

    Vector2D.prototype.div = function(factor) {
        return new Vector2D(
            this.X / factor,
            this.Y / factor
        );
    }

    Vector2D.prototype.normalize = function() {
        return this.div(this.length());
    }

    Vector2D.prototype.length = function() {
        return Math.sqrt(this.X*this.X + this.Y*this.Y);
    }

    Vector2D.prototype.dot = function(v) {
        return this.X * v.X + this.Y * v.Y;
    }

    Vector2D.prototype.opposite = function() {
        return new Vector2D(
            -this.X,
            -this.Y
        );
    }

    window.Vector2D = Vector2D;

}());