(function(){
    'use strict';

    function applySpeed(velocity) {
        return velocity.normalize().mult(Common.ball.speed);
    }

    function reflectBall(ball, direction, distanceDiff) {
        direction = direction.normalize();

        var diff = distanceDiff + Common.ball.gap / 2;
        ball.position = ball.position.add(direction.mult(diff));

        ball.velocity = ball.velocity.sub(direction.mult(2 * ball.velocity.dot(direction)));
    }

    function separateBalls(ballA, ballB, positionSub, distanceDiff) {
        var diff = distanceDiff / 2 + Common.ball.gap;
        var adjustment = positionSub.normalize().mult(diff);
        ballA.position = ballA.position.add(adjustment);
        ballB.position = ballB.position.add(adjustment.opposite());
    }

    function ellasticCollision(ballA, ballB, direction, distance) {
        var adjustment = direction.mult(ballA.velocity.sub(ballB.velocity).dot(direction) / (distance * distance));
        ballA.velocity = applySpeed(ballA.velocity.sub(adjustment));
        ballB.velocity = applySpeed(ballB.velocity.sub(adjustment.opposite()));
    }

    function borderCollision(border, ball) {
        if (!border.closed)
            return;

        if (border.ballLeftPosition <= ball.position.X && border.ballRightPosition >= ball.position.X) {
            ball.position.X = (ball.position.X <= border.position) ?
                border.ballLeftPosition : border.ballRightPosition;

            ball.velocity.X = -ball.velocity.X;
        }
    }


    function Ball(state) {
        this.state = state;
        this.position = Vector2D.random();
        this.position.X *= Common.localCanvasDimensions.width;
        this.position.Y *= Common.localCanvasDimensions.height;
        this.velocity = applySpeed(Vector2D.random().sub(new Vector2D(0.5, 0.5)));
        this.socialDistancing = false;
        this.sicknessLeft = parseInt(Common.sicknessInterval.from + Math.random() * (Common.sicknessInterval.to - Common.sicknessInterval.from));
    }

    Ball.prototype.ballsCollision = function(ball) {
        if (this.state == Common.states.dead || ball.state == Common.states.dead)
            return;

        var positionSub = this.position.sub(ball.position);
        var distance = positionSub.length();
        var distanceDiff = Common.ball.minDistance - distance;

        if (distanceDiff >= 0) {
            if (this.socialDistancing)
                reflectBall(ball, positionSub.opposite(), distanceDiff);
            else if (ball.socialDistancing)
                reflectBall(this, positionSub, distanceDiff);
            else {
                separateBalls(this, ball, positionSub, distanceDiff);

                if (!ball.socialDistancing || !this.socialDistancing)
                    ellasticCollision(this, ball, positionSub, distance);
            }

            if ((this.state == Common.states.sick || ball.state == Common.states.sick) &&
                (this.state == Common.states.healthy || ball.state == Common.states.healthy) &&
                (Math.random() < Common.rates.infectionRate))
                this.state = ball.state = Common.states.sick;
        }
    }

    Ball.prototype.canvasBoundariesCollision = function() {
        if (this.position.X <= Common.ballMovingBoundaries.left || this.position.X >= Common.ballMovingBoundaries.right) {
            this.position.X = (this.position.X <= Common.ballMovingBoundaries.left) ?
                                Common.ballMovingBoundaries.left : Common.ballMovingBoundaries.right;

            this.velocity.X = -this.velocity.X;
        }
        if (this.position.Y <= Common.ballMovingBoundaries.top || this.position.Y >= Common.ballMovingBoundaries.bottom) {
            this.position.Y = (this.position.Y <= Common.ballMovingBoundaries.top) ?
                                Common.ballMovingBoundaries.top : Common.ballMovingBoundaries.bottom;

            this.velocity.Y = -this.velocity.Y;
        }
    }

    Ball.prototype.bordersCollision = function() {
        borderCollision(Common.borders.left, this);
        borderCollision(Common.borders.right, this);
    }

    Ball.prototype.move = function() {
        if (!this.socialDistancing && this.state != Common.states.dead)
            this.position = this.position.add(this.velocity);

        if (this.state == Common.states.sick && (--this.sicknessLeft) == 0)
            this.state = (Math.random() < Common.rates.deathRate) ? Common.states.dead : Common.states.recovered;
    }

    window.Ball = Ball;

}());