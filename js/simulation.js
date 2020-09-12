(function () {
    'use strict';

    var simulationCanvas, simulationDimensions, context, simulationStats, simulationEnd, simulationParameters,
        balls, currentFrame, updateInterval, resizeTimeout;

    function drawLine(color, position, dimensions) {
        var scaledPosition = position * dimensions.scaleWidthRatio;

        context.beginPath();
        context.moveTo(scaledPosition, 0);
        context.lineTo(scaledPosition, dimensions.height);
        context.closePath();

        context.strokeStyle = color;
        context.stroke();
    }

    function drawBorder(border, dimensions) {
        drawLine(border.color, border.leftWall, dimensions);
        drawLine(border.color, border.rightWall, dimensions);
    }

    function drawCanvasBoundaries(dimensions) {
        context.strokeStyle = Common.colors.canvasBoundary;
        context.strokeRect(0, 0, dimensions.width, dimensions.height);
    }

    function drawBall(ball, scaleWidthRatio) {
        var scaledCoords = ball.position.mult(scaleWidthRatio);
        var scaledRadius = Common.ball.radius * scaleWidthRatio;

        context.beginPath();
        context.arc(scaledCoords.X, scaledCoords.Y, scaledRadius, 0, Common.ball.fullRotation);
        context.closePath();

        context.fillStyle = Common.colors.states[ball.state];
        context.fill();
    }

    function resizeEventHandler() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            draw();
        }, Common.simulation.intervalMs);
    }

    function shuffleBalls() {
        for (var i=0; i<balls.length; i++) {
            var rand = parseInt(Math.random() * balls.length);
            var temp = balls[i];
            balls[i] = balls[rand];
            balls[rand] = temp;
        }
    }

    function start() {
        balls = [];
        currentFrame = 0;

        var ballIdx = 0;
        while (ballIdx < simulationParameters.sickPopulation) {
            balls.push(new Ball(Common.states.sick));
            ballIdx++;
        }
        while (ballIdx < simulationParameters.totalPopulation) {
            balls.push(new Ball(Common.states.healthy));
            ballIdx++;
        }

        shuffleBalls();

        for (var i=0; i<simulationParameters.socialDistancingPopulation; i++)
            balls[i].socialDistancing = true;

        Chart.start();

        updateInterval = setInterval(update, Common.simulation.intervalMs);
    }

    function draw() {
        var dimensions = {
            width: simulationDimensions.offsetWidth,
            height: simulationDimensions.offsetHeight,
            scaleWidthRatio: simulationDimensions.offsetWidth / Common.localCanvasDimensions.width
        };

        simulationCanvas.width = dimensions.width;
        simulationCanvas.height = dimensions.height;

        drawBorder(Common.borders.left, dimensions);
        drawBorder(Common.borders.right, dimensions);

        drawCanvasBoundaries(dimensions);

        for (var i=0; i<balls.length; i++)
            if (balls[i].state == Common.states.dead)
                drawBall(balls[i], dimensions.scaleWidthRatio);

        for (var i=0; i<balls.length; i++)
            if (balls[i].state != Common.states.dead)
                drawBall(balls[i], dimensions.scaleWidthRatio);

        Chart.draw();
    }

    function update() {
        for (var i=0; i<balls.length; i++)
            for (var j=i+1; j<balls.length; j++)
                balls[i].ballsCollision(balls[j]);

        var statsData = {sick: 0, healthy: 0, recovered: 0, dead: 0};
        for (var i=0; i<balls.length; i++) {
            statsData[balls[i].state]++;

            balls[i].move();

            balls[i].canvasBoundariesCollision();

            balls[i].bordersCollision();
        }

        simulationStats(statsData);

        Chart.update(statsData);

        draw();

        currentFrame++;
        if (currentFrame == Common.simulation.totalFrames) {
            clearInterval(updateInterval);
            window.addEventListener('resize', resizeEventHandler);
            simulationEnd();
        }
    }

    function init(simulation, chart, stats, end, parameters) {
        simulationCanvas =  simulation.canvas;
        simulationDimensions = simulation.dimensions;
        context = simulationCanvas.getContext('2d');

        simulationStats = stats;
        simulationEnd = end;
        simulationParameters = parameters;

        Common.rates.infectionRate = simulationParameters.infectionRate;
        Common.rates.deathRate = simulationParameters.deathRate;

        Chart.init(chart, simulationParameters.totalPopulation);

        start();
    }

    function clear() {
        window.removeEventListener('resize', resizeEventHandler);
        clearTimeout(resizeTimeout);

        Chart.clear();

        simulationCanvas.width = simulationCanvas.height = 0;
    }

    function restart() {
        clear();
        start();
    }

    window.Simulation = {
        init: init,
        clear: clear,
        restart: restart
    };

}());