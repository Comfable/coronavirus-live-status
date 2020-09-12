(function(){
    'use strict';
    var fps = 60;
    var simulationSeconds = 30;
    var safeLimitPercentage = 0.3;

    var width = 100;
    var height = 100 * .45;
    var ballRadius = 0.9;
    var ballSpeed = 0.2;
    var ballsGap = 0.001;
    var borderWidth = .1;

    var oneThirdWidth = width / 3;
    var twoThirdsWidth = 2 * oneThirdWidth;
    var borderWidthHalf = borderWidth / 2;

    var blackColor = '#f7f7f7';
    var lightGrayColor = '#3f5973';
    var darkGrayColor = '#2C3E50';
    var healthyColor = '#16a085';
    var sickColor = '#eb5569';
    var recoveredColor = '#f39c12';
    var dangerSickColor = '#e74c3c';
    var redColor = '#c0392b';
    var safeColor = '#f1c40f';

    window.Common = {
        states: {
            healthy: 'healthy',
            sick: 'sick',
            recovered: 'recovered',
            dead: 'dead'
        },
        simulation: {
            intervalMs: 1000 / fps,
            totalFrames: fps * simulationSeconds
        },
        localCanvasDimensions: {
            width: width,
            height: height
        },
        borders: {
            left: {
                position: oneThirdWidth,
                leftWall: oneThirdWidth - borderWidthHalf,
                rightWall: oneThirdWidth + borderWidthHalf,
                ballLeftPosition: oneThirdWidth - borderWidthHalf - ballRadius,
                ballRightPosition: oneThirdWidth + borderWidthHalf + ballRadius,
                closed: false,
                color: lightGrayColor
            },
            right: {
                position: twoThirdsWidth,
                leftWall: twoThirdsWidth - borderWidthHalf,
                rightWall: twoThirdsWidth + borderWidthHalf,
                ballLeftPosition: twoThirdsWidth - borderWidthHalf - ballRadius,
                ballRightPosition: twoThirdsWidth + borderWidthHalf + ballRadius,
                closed: false,
                color: lightGrayColor
            }
        },
        ball: {
            radius: ballRadius,
            speed: ballSpeed,
            gap: ballsGap,
            fullRotation: 2 * Math.PI,
            minDistance: 2 * ballRadius
        },
        ballMovingBoundaries: {
            left: ballRadius,
            right: width - ballRadius,
            top: ballRadius,
            bottom: height - ballRadius
        },
        colors: {
            border: {
                opened: lightGrayColor,
                closed: redColor
            },
            states: {
                healthy: healthyColor,
                sick: sickColor,
                recovered: recoveredColor,
                dead: blackColor
            },
            chart: {
                healthy: healthyColor,
                safeSick: sickColor,
                dangerSick: dangerSickColor,
                recovered: recoveredColor,
                dead: darkGrayColor,
                empty: darkGrayColor,
                safeLine: safeColor,
            },
            canvasBoundary: darkGrayColor,
        },
        rates: {
            infectionRate: 1,
            deathRate: 0.03
        },
        sicknessInterval: {
            from: 6 * fps,
            to: 8 * fps
        },
        chartSafeLimit: 1 - safeLimitPercentage
    };

}());