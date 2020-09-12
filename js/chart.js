(function () {
    'use strict';

    var chartCanvas, chartDimensions, context, maxValue,
        currentStep, dangerSick, safeSick, healthy, recovered;

    function drawLine(height, from, to) {
        context.beginPath();
        context.moveTo(from, height);
        context.lineTo(to, height);
        context.closePath();

        context.strokeStyle = Common.colors.chart.safeLine;
        context.stroke();
    }

    function drawRect(color, x, y, width, height) {
        context.fillStyle = color;
        context.fillRect(x, y, width, height);
    }

    function drawPolygon(data, color, height, stepSize) {
        context.beginPath();
        context.moveTo(0, height);

        var step = -stepSize;
        for (var i=0; i<data.length; i++) {
            step += stepSize;
            context.lineTo(step, data[i] * height);
        }

        context.lineTo(step, height);
        context.closePath();

        context.fillStyle = color;
        context.fill();
    }

    function init(chart, value) {
        // init parameters
        chartCanvas =  chart.canvas;
        chartDimensions = chart.dimensions;
        context = chartCanvas.getContext('2d');
        maxValue = value;
    }

    function clear() {
        chartCanvas.width = chartCanvas.height = 0;
    }

    function start() {
        dangerSick = [];
        safeSick = [];
        healthy = [];
        recovered = [];
        currentStep = 0;
    }

    function update(data) {
        var sickValue = maxValue - data.sick;
        var healthyValue = sickValue - data.healthy;
        var recoveredValue = healthyValue - data.recovered;
        sickValue /= maxValue;
        healthyValue /= maxValue;
        recoveredValue /= maxValue;

        dangerSick.push(sickValue);
        safeSick.push(Math.max(sickValue, Common.chartSafeLimit));
        healthy.push(healthyValue);
        recovered.push(recoveredValue);
    }

    function draw() {
        var width = chartDimensions.offsetWidth;
        var height = chartDimensions.offsetHeight;
        var stepSize = width / (Common.simulation.totalFrames - 1);
        var currentStepSize = currentStep * stepSize;

        chartCanvas.width = width;
        chartCanvas.height = height;

        drawRect(Common.colors.chart.empty, currentStepSize, 0, width - currentStepSize, height);

        drawRect(Common.colors.chart.dead, 0, 0, currentStepSize, height);

        drawPolygon(recovered, Common.colors.chart.recovered, height, stepSize);

        drawPolygon(healthy, Common.colors.chart.healthy, height, stepSize);

        drawPolygon(dangerSick, Common.colors.chart.dangerSick, height, stepSize);

        drawPolygon(safeSick, Common.colors.chart.safeSick, height, stepSize);

        drawLine(height * Common.chartSafeLimit, 0, currentStepSize);

        currentStep++;
    }

    window.Chart = {
        init: init,
        clear: clear,
        start: start,
        update: update,
        draw: draw
    };

}());