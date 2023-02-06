document.addEventListener("DOMContentLoaded", function () {
  const options = { duration: 0.9 };
  chrome.storage.local.set({ mainPageClick: "0" });
  const preloader = document.querySelector(".preloader");
  const fadeEffect = setInterval(() => {
    if (!preloader.style.opacity) {
      return (preloader.style.opacity = 1);
    }
    if (preloader.style.opacity > 0) {
      return (preloader.style.opacity -= 0.1);
    } else {
      clearInterval(fadeEffect);
    }
  }, 50);

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
      "latGeo",
      "lngGeo",
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
      latGeo = data.latGeo;
      lngGeo = data.lngGeo;

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
          // population: [
          //     document.getElementById('population-slider'),
          //     document.getElementById('population-number')
          // ],
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
            : Common.colors.border.opened; // change border color
          borderBtns[key].value =
            (Common.borders[key].closed ? "OPEN" : "CLOSE") +
            " " +
            key +
            " SECTION"; // change border button text
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
      var todayDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      );
      var yesterdayDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - 1
      );
      var lastWeek = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - 14
      );
      var startDate = new Date("22 Jan 2020");

      var upToday = Math.floor(
        (new Date() - new Date("22 Jan 2020")) / (24 * 3600000)
      );

      const initialYaxis = [
        { show: false },
        {
          seriesName: "Confirmed",
          show: false,
          // logarithmic: true,
        },
        // { seriesName: 'Recovered', show: false },
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
            //autoSelected: 'zoom'
          },
        },
        //colors: ["#00BAEC"],
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
            // formatter: undefined,
            // title: {
            //     formatter: (seriesName) => seriesName,
            // },
          },
          z: {
            show: false,
            formatter: undefined,
            title: "Size: ",
          },
          marker: {
            show: true,
          },
          // items: {
          //    display: flex,
          // },
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
        // legend: {
        //   show: false
        // },
        legend: {
          show: true,
          position: "top",
          horizontalAlign: "left",
          // floating: true,
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
              min: startDate.getTime(), // min: new Date("01 Apr 2020 10:00:00").getTime(), //lastWeek
              max: yesterdayDate.getTime(), // max: new Date("06 Apr 2020 10:00:00").getTime()
            },
          },
        },
        colors: ["#455564"], //#FF0080 // eb5569
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

      function generateDayWiseTimeSeries(baseval, count, yrange) {
        var i = 0;
        var series = [];
        while (i < count) {
          var x = baseval;
          var y =
            Math.floor(Math.random() * (yrange.max - yrange.min + 1)) +
            yrange.min;

          series.push([x, y]);
          baseval += 86400000;
          i++;
        }
        return series;
      }

      function changePercentage(casesToday, casesTotal) {
        if (isNaN(casesToday) || casesToday == 0) {
          return "0 today";
        } else {
          return "+" + casesToday + " today";
        }
      }

      var mapInner = document.getElementById("map_id");
      var mapClose = document.getElementById("map_popup_close");
      var screenShot = document.getElementById("screenShot");
      var wrapper = document.getElementById("wrapper");
      var parameters = document.getElementById("parameters");
      var mapButton = document.getElementById("map_button");
      var simulation = document.getElementById("simulation");

      document.querySelector("#map_button").addEventListener("click", (e) => {
        chrome.storage.local.get("mainPageClick", function (data) {
          mainPageClick = data.mainPageClick;
          if (mainPageClick == "1") {
            myToast.hideToast();
          }
        });

        simulation.style.display = "none";
        screenShot.style.display = "none";
        wrapper.style.display = "none";
        parameters.style.display = "none";
        mapButton.style.display = "none";
        setTimeout(function () {
          mapClose.style.visibility = "visible";
        }, 300);
        mapInner.style.visibility = "visible";
        Map();
      });

      document
        .querySelector("#map_popup_close")
        .addEventListener("click", (e) => {
          mapInner.style.visibility = "hidden";
          mapClose.style.visibility = "hidden";
          screenShot.style.display = "block";
          wrapper.style.display = "block";
          parameters.style.display = "block";
          mapButton.style.display = "block";
          chrome.storage.local.set({ mainPageClick: "0" });
        });

      function Map() {
        mapStyle = "mapbox://styles/mapbox/light-v10";
        mapboxgl.accessToken =
          "pk.eyJ1IjoidXZ3ZWF0aGVyIiwiYSI6ImNrOXdxa2Q3czBjYXgzcm50cnpkNnFvM3QifQ.QVJcndyavGweKZBD-pOBEw";
        if (
          typeof (latGeo !== "undefined") ||
          typeof (lngGeo !== "undefined")
        ) {
          latandlongMapBox = JSON.parse("[" + lngGeo + "," + latGeo + "]");
        } else {
          latandlongMapBox = [-79.3832, 43.6532];
        }

        const getSizeFromCount = (count) => {
          if (count >= 1000000) {
            return "70px";
          }
          if (count >= 500000) {
            return "60px";
          }
          if (count >= 200000) {
            return "50px";
          }
          if (count >= 100000) {
            return "45px";
          }
          if (count >= 50000) {
            return "35px";
          }
          if (count >= 10000) {
            return "25px";
          }
          if (count >= 5000) {
            return "20px";
          }
          if (count >= 1000) {
            return "12px";
          }
          if (count >= 500) {
            return "8px";
          }
          if (count >= 400) {
            return "7px";
          }
          if (count >= 300) {
            return "6px";
          }
          if (count >= 200) {
            return "5px";
          }
          if (count >= 100) {
            return "4px";
          }
          if (count >= 50) {
            return "4px";
          }
          if (count >= 20) {
            return "3px";
          }
          if (count >= 10) {
            return "2px";
          }
          if (count >= 5) {
            return "1px";
          }
          if (count == 0) {
            return "0px";
          }
          return "2px";
        };

        const getColorFromCount = (count) => {
          if (count >= 50000) {
            return "#670000";
          }
          if (count >= 10000) {
            return "#9a0000";
          }
          if (count >= 5000) {
            return "#cc0000";
          }
          if (count >= 1000) {
            return "#ff0000";
          }
          if (count >= 500) {
            return "#ff8800";
          }
          if (count >= 100) {
            return "#feb805";
          }
          return "#ffd700";
        };

        var map = new mapboxgl.Map({
          container: "map_id",
          style: mapStyle,
          center: latandlongMapBox,
          minZoom: 1,
          maxZoom: 6,
          zoom: 5,
        });

        map.addControl(new mapboxgl.NavigationControl());

        fetch("https://disease.sh/v3/covid-19/countries")
          .then((response) => response.json())
          .then((data) => {
            data.forEach((location) => {
              if (location.cases == 0) {
                location.cases = "-";
              }
              if (location.deaths == 0) {
                location.deaths = "-";
              }
              if (location.tests == 0) {
                location.tests = "-";
              }
              if (location.casesPerOneMillion == 0) {
                location.casesPerOneMillion = "-";
              }
              if (location.deathsPerOneMillion == 0) {
                location.deathsPerOneMillion = "-";
              }
              if (location.testsPerOneMillion == 0) {
                location.testsPerOneMillion = "-";
              }

              var popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
                "<h3>" +
                  location.country +
                  "</h3>" +
                  "<br>" +
                  location.cases.toLocaleString(undefined, {
                    minimumFractionDigits: 0,
                  }) +
                  " Total cases" +
                  "<br>" +
                  location.deaths.toLocaleString(undefined, {
                    minimumFractionDigits: 0,
                  }) +
                  " Deaths" +
                  "<br>" +
                  location.tests.toLocaleString(undefined, {
                    minimumFractionDigits: 0,
                  }) +
                  " Tested" +
                  "<br>" +
                  "<br>" +
                  location.casesPerOneMillion.toLocaleString(undefined, {
                    minimumFractionDigits: 0,
                  }) +
                  " Cases per million" +
                  "<br>" +
                  location.deathsPerOneMillion.toLocaleString(undefined, {
                    minimumFractionDigits: 0,
                  }) +
                  " Deaths per million" +
                  "<br>" +
                  location.testsPerOneMillion.toLocaleString(undefined, {
                    minimumFractionDigits: 0,
                  }) +
                  " Tested per million" +
                  "<br>"
              );

              var el = document.createElement("div");
              el.id = "marker";

              let marker = new mapboxgl.Marker(el).setLngLat([
                location.countryInfo.long,
                location.countryInfo.lat,
              ]);
              const element = marker.getElement();
              element.id = "marker";

              if (
                location.country == "US" ||
                location.country == "USA" ||
                location.country == "United States of America"
              ) {
                element.style.height = "0px";
                element.style.width = "0px";
              } else {
                element.style.height = getSizeFromCount(location.cases);
                element.style.width = getSizeFromCount(location.cases);
              }

              element.addEventListener("mouseenter", () => popup.addTo(map));
              element.addEventListener("mouseleave", () => popup.remove());

              marker.setPopup(popup);
              marker.addTo(map);
            });
          });

        fetch("https://disease.sh/v3/covid-19/jhucsse/counties")
          .then((response) => response.json())
          .then((data) => {
            data.forEach((location) => {
              var popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
                "<h3>" +
                  location.county +
                  "</h3>" +
                  "<br>" +
                  location.stats.confirmed.toLocaleString(undefined, {
                    minimumFractionDigits: 0,
                  }) +
                  " Total cases" +
                  "<br>" +
                  location.stats.deaths.toLocaleString(undefined, {
                    minimumFractionDigits: 0,
                  }) +
                  " Deaths"
              );

              var el = document.createElement("div");
              el.id = "marker";

              let marker = new mapboxgl.Marker(el).setLngLat([
                location.coordinates.longitude,
                location.coordinates.latitude,
              ]);
              const element = marker.getElement();
              element.id = "marker";

              element.style.height = getSizeFromCount(location.stats.confirmed);
              element.style.width = getSizeFromCount(location.stats.confirmed);

              element.addEventListener("mouseenter", () => popup.addTo(map));
              element.addEventListener("mouseleave", () => popup.remove());

              marker.setPopup(popup);
              marker.addTo(map);
            });
          });
      }
    }
  );
});
