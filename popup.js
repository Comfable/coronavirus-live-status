document.addEventListener("DOMContentLoaded", function () {
  chrome.storage.local.set({ mainPageClick: "0" });

  var myToast = Toastify({
    className: "rateUs",
    text:
      "More from this developer<br>UV WEATHER CHROME EXTENSION <br>Check the forecast right in your browser.<br> <br>CLICK HERE to KNOW MORE<br>Featured by Chrome Web Store",
    destination:
      "https://chrome.google.com/webstore/detail/uv-weather/ngeokhpbgoadbpdpnplcminbjhdecjeb",
    newWindow: true,
    gravity: "top",
    position: "left",
    close: false,
    stopOnFocus: true,
    backgroundColor: "#eb5569",
    duration: 1200000,
  });

  chrome.storage.local.get(
    [
      "confirmed",
      "deaths",
      "country_full",
      "worldConfirmed",
      "worldDeaths",
      "country",
      "last_updated",
    ],
    function (data) {
      country_full = data.country_full;
      country = data.country;
      confirmed = data.confirmed;
      deaths = data.deaths;
      worldConfirmed = data.worldConfirmed;
      worldDeaths = data.worldDeaths;
      last_updated = data.last_updated;

      var wrapper = document.getElementById("wrapper");
      document.querySelector(
        "#confirmed"
      ).textContent = confirmed.toLocaleString(undefined, {
        minimumFractionDigits: 0,
      });
      document.querySelector("#deaths").textContent = deaths.toLocaleString(
        undefined,
        {
          minimumFractionDigits: 0,
        }
      );
      updated = moment(last_updated);
      document.querySelector("#last_updated").textContent =
        "Coronavirus Live Status";
      document.querySelector("#country_full").textContent = country_full;
      document.querySelector(
        "#worldConfirmed"
      ).textContent = worldConfirmed.toLocaleString(undefined, {
        minimumFractionDigits: 0,
      });
      document.querySelector(
        "#worldDeaths"
      ).textContent = worldDeaths.toLocaleString(undefined, {
        minimumFractionDigits: 0,
      });

      (function () {
        "use strict";
        var simulationContainer = document.getElementById("simulation");
        var parametersContainer = document.getElementById("parameters");
        var borderBtnsContainer = document.getElementById("borders-btns");
        var simulationEndBtnsContainer = document.getElementById(
          "simulation-end-btns"
        );
        var deathRate = Math.round((deaths * 100) / confirmed);
        if (
          deathRate == 0 ||
          typeof deathRate == "undefined" ||
          deathRate == "undefined"
        ) {
          var deathRate = 1;
        }
        document.getElementById("death-slider").value = deathRate;
        document.querySelector("#death-percent").textContent = deathRate;

        var simulation = {
          canvas: document.getElementById("simulation-canvas"),
          dimensions: document.getElementById("simulation-dimensions"),
        };
        var chart = {
          canvas: document.getElementById("chart-canvas"),
          dimensions: document.getElementById("chart-dimensions"),
        };
        var btns = {
          start: document.getElementById("start"),
          adjust: document.getElementById("adjust"),
          restart: document.getElementById("restart"),
        };
        var borderBtns = {
          left: document.getElementById("left-border"),
          right: document.getElementById("right-border"),
        };
        var sliders = {
          sick: [
            document.getElementById("sick-slider"),
            document.getElementById("sick-percent"),
          ],
          distancing: [
            document.getElementById("distancing-slider"),
            document.getElementById("distancing-percent"),
          ],
          infection: [
            document.getElementById("infection-slider"),
            document.getElementById("infection-percent"),
          ],
          death: [
            document.getElementById("death-slider"),
            document.getElementById("death-percent"),
          ],
        };
        var stats = {
          healthy: document.getElementById("healthy-number"),
          sick: document.getElementById("sick-number"),
          recovered: document.getElementById("recovered-number"),
          dead: document.getElementById("dead-number"),
        };

        function hide(element) {
          element.style.display = "none";
        }

        function show(element) {
          element.style.display = "block";
        }

        function simulationEnd() {
          hide(borderBtnsContainer);
          show(simulationEndBtnsContainer);
        }

        function simulationStats(data) {
          Object.keys(stats).forEach(function (key) {
            stats[key].innerHTML = data[key];
          });
        }

        function changeBorder(key) {
          Common.borders[key].color = Common.borders[key].closed
            ? Common.colors.border.closed
            : Common.colors.border.opened;
          borderBtns[key].value =
            (Common.borders[key].closed ? "OPEN" : "CLOSE") +
            " " +
            key +
            " SECTION";
        }

        function resetBorders() {
          Object.keys(borderBtns).forEach(function (key) {
            Common.borders[key].closed = false;
            changeBorder(key);
          });
        }

        function addSliderEventListener(event, key) {
          sliders[key][0].addEventListener(event, function () {
            sliders[key][1].innerHTML = sliders[key][0].value;
          });
        }

        btns.start.addEventListener("click", function () {
          chrome.storage.local.set({ mainPageClick: "1" });
          hide(wrapper);
          hide(parametersContainer);
          hide(simulationEndBtnsContainer);

          show(simulationContainer);
          show(borderBtnsContainer);

          resetBorders();

          var slidersValues = {};
          Object.keys(sliders).forEach(function (key) {
            slidersValues[key] = parseInt(sliders[key][0].value);
          });

          Simulation.init(simulation, chart, simulationStats, simulationEnd, {
            totalPopulation: 100,
            sickPopulation: parseInt((100 * slidersValues.sick) / 100),
            socialDistancingPopulation: parseInt(
              (100 * slidersValues.distancing) / 100
            ),
            infectionRate: slidersValues.infection / 100,
            deathRate: slidersValues.death / 100,
          });

          myToast.showToast();
        });

        btns.adjust.addEventListener("click", function () {
          myToast.hideToast();
          show(wrapper);
          hide(simulationContainer);
          show(parametersContainer);
          Simulation.clear();
          chrome.storage.local.set({ mainPageClick: "0" });
        });

        btns.restart.addEventListener("click", function () {
          hide(simulationEndBtnsContainer);
          show(borderBtnsContainer);
          resetBorders();
          Simulation.restart();
        });

        Object.keys(borderBtns).forEach(function (key) {
          borderBtns[key].addEventListener("click", function () {
            Common.borders[key].closed = !Common.borders[key].closed; // Open or close border
            changeBorder(key);
          });
        });

        Object.keys(sliders).forEach(function (key) {
          addSliderEventListener("change", key);
          addSliderEventListener("input", key);
        });
      })();

      var today = new Date();
      var yesterdayDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - 1
      );
      var startDate = new Date("22 Jan 2020");

      const initialYaxis = [
        { show: false },
        {
          seriesName: "Confirmed",
          show: false,
        },
        { seriesName: "Deaths", show: false },
      ];

      var options1 = {
        chart: {
          id: "chart2",
          type: "line",
          stacked: false,
          height: 190,
          foreColor: "#ccc",
          toolbar: {
            show: false,
            offsetX: 0,
            offsetY: 0,
            tools: {
              download: false,
              selection: false,
              zoom: false,
              zoomin: false,
              zoomout: false,
              pan: false,
              reset: false | '<img src="/static/icons/reset.png" width="20">',
              customIcons: [],
            },
          },
        },
        colors: ["#eb5569", "#1abc9c", "#f1c40f"],
        stroke: {
          width: 2,
          curve: "straight",
          lineCap: "round",
        },
        animations: {
          enabled: true,
          easing: "linear",
          dynamicAnimation: {
            speed: 1000,
          },
        },
        dropShadow: {
          enabled: true,
          opacity: 0.3,
          blur: 5,
          left: -7,
          top: 22,
        },
        grid: {
          show: false,
        },
        dataLabels: {
          enabled: false,
        },
        fill: {
          gradient: {
            enabled: false,
            opacityFrom: 0.55,
            opacityTo: 0,
          },
        },
        markers: {
          size: 4,
          colors: ["#eb5569", "#1abc9c", "#f1c40f"],
          strokeColor: ["#2C3E50", "#2C3E50", "#2C3E50"],
          strokeWidth: 1,
          hover: {
            size: 5,
          },
        },
        series: [],
        tooltip: {
          enabled: true,
          enabledOnSeries: undefined,
          shared: true,
          followCursor: false,
          intersect: false,
          inverseOrder: true,
          custom: undefined,
          fillSeriesColor: false,
          theme: "dark",
          style: {
            fontSize: "11px",
            fontFamily: "Helvetica",
          },
          onDatasetHover: {
            highlightDataSeries: false,
          },
          x: {
            show: true,
            format: "dd MMM",
            formatter: undefined,
          },
          y: {
            show: false,
          },
          z: {
            show: false,
            formatter: undefined,
            title: "Size: ",
          },
          marker: {
            show: true,
          },
          fixed: {
            enabled: false,
            position: "bottomLeft",
            offsetX: 0,
            offsetY: 0,
          },
        },
        xaxis: {
          type: "datetime",
          tooltip: {
            enabled: false,
          },
          labels: {
            style: {
              colors: [],
              fontSize: "10px",
              fontFamily: "Helvetica",
              fontWeight: 200,
              cssClass: "apexcharts-xaxis-label",
            },
            offsetX: 0,
            offsetY: -5,
            rotateAlways: false,
            hideOverlappingLabels: true,
            showDuplicates: false,
            trim: false,
            minHeight: undefined,
            maxHeight: 120,
          },

          axisTicks: {
            show: false,
            borderType: "solid",
            color: "#ccc",
            height: 4,
            offsetX: 0,
            offsetY: -2,
          },
        },

        yaxis: initialYaxis,
        legend: {
          show: true,
          position: "top",
          horizontalAlign: "left",
          offsetY: 35,
          offsetX: -25,
          fontSize: "11px",
          onItemClick: {
            toggleDataSeries: true,
          },
          onItemHover: {
            highlightDataSeries: false,
          },
        },
        plotOptions: {
          bar: {
            columnWidth: "100%",
          },
        },
        noData: {
          text: "○ ○ ○",
          style: {
            color: "#97a7b8",
            fontSize: "16px",
            fontFamily: "Helvetica",
          },
        },
      };

      var chart1 = new ApexCharts(
        document.querySelector("#chart-area"),
        options1
      );

      chart1.render();

      var options2 = {
        chart: {
          id: "chart1",
          height: 95,
          type: "bar",
          foreColor: "#ccc",
          brush: {
            target: "chart2",
            enabled: true,
          },
          selection: {
            enabled: true,
            fill: {
              color: "#fff",
              opacity: 0.1,
            },
            xaxis: {
              min: startDate.getTime(),
              max: yesterdayDate.getTime(),
            },
          },
        },
        colors: ["#455564"],
        series: [],
        stroke: {
          width: 2,
        },
        grid: {
          borderColor: "#444",
          show: false,
        },
        markers: {
          size: 0,
        },
        xaxis: {
          type: "datetime",
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: false,
          },
          crosshairs: {
            show: false,
          },
        },
        yaxis: {
          tickAmount: 0,
          tooltip: {
            enabled: false,
          },
          labels: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          legend: {
            show: false,
          },
        },
      };
      var chart2 = new ApexCharts(
        document.querySelector("#chart-bar"),
        options2
      );
      chart2.render();

      fetch("https://pomber.github.io/covid19/timeseries.json")
        .then((resp) => resp.json())
        .then(function (result) {
          if (country_full == "USA") {
            country_full = "US";
          }
          cTimeline = result[country_full];
          timelineConfirmed = cTimeline[cTimeline.length - 1].confirmed;
          todayConfirmed =
            cTimeline[cTimeline.length - 1].confirmed -
            cTimeline[cTimeline.length - 2].confirmed;

          timelineDeaths = cTimeline[cTimeline.length - 1].deaths;
          todayDeaths =
            cTimeline[cTimeline.length - 1].deaths -
            cTimeline[cTimeline.length - 2].deaths;

          var restructuredData_confirmed = cTimeline.reduce((a, b) => {
            return a.concat([{ date: b["date"], confirmed: b["confirmed"] }]);
          }, []);
          var restructuredData_deaths = cTimeline.reduce((a, b) => {
            return a.concat([{ date: b["date"], deaths: b["deaths"] }]);
          }, []);
          restructuredData_confirmed_2 = Object.values(
            restructuredData_confirmed
          );
          const restructuredData_confirmed_3 = restructuredData_confirmed_2.map(
            function (row) {
              return { x: row.date, y: row.confirmed };
            }
          );
          restructuredData_deaths_2 = Object.values(restructuredData_deaths);
          const restructuredData_deaths_3 = restructuredData_deaths_2.map(
            function (row) {
              return { x: row.date, y: row.deaths };
            }
          );
          chart1.updateSeries([
            {
              name: "Confirmed",
              type: "column",
              data: restructuredData_confirmed_3,
            },
            { name: "Deaths", type: "column", data: restructuredData_deaths_3 },
          ]);

          chart2.updateSeries([
            {
              data: restructuredData_confirmed_3,
            },
          ]);

          ConfirmedRate = changePercentage(todayConfirmed, timelineConfirmed);
          DeathsRate = changePercentage(todayDeaths, timelineDeaths);
          document.querySelector("#confirmedRate").textContent = ConfirmedRate;
          document.querySelector("#deathsRate").textContent = DeathsRate;
        });

      function changePercentage(casesToday, casesTotal) {
        if (isNaN(casesToday) || casesToday == 0) {
          return "0 today";
        } else {
          return "+" + casesToday + " today";
        }
      }
    }
  );
});
