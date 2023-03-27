chrome.storage.local.get(["verUpdate"], function (data) {
  verUpdate = data.verUpdate;

  if (verUpdate !== 3) {
    fetch("https://ipinfo.io/?token=6234a338ed2fa6")
      .then((resp) => resp.json())
      .then(function (result) {
        if (result) {
          countryAPI = JSON.stringify(result.country);
          country = countryAPI.split('"')[1];
          if (country == "ZZ") {
            country = "US";
          }
          city = JSON.stringify(result.city);
          if (country == "HK") {
            country = "US";
          }

          latandlong = JSON.stringify(result.loc);
          chrome.storage.local.set({ verUpdate: 3 });
          chrome.storage.local.set({ country: country });
          badgeNum(country);
        } else {
          country = "US";
          chrome.storage.local.set({ verUpdate: 3 });
          chrome.storage.local.set({ country: "US" });
          country = "US";
          badgeNum(country);
        }
      });
  }
});

chrome.runtime.onStartup.addListener(function (details) {
  chrome.storage.local.get("country", function (data) {
    country = data.country;
    badgeNum(country);
  });
});

chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason == "update") {
    chrome.storage.local.get("country", function (data) {
      city = data.city;
      country = data.country;
      badgeNum(country);
    });
  }
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.msg == "intervalUpdateMessage") {
    intervalUpdateFunction();
  }
});

function intervalUpdateFunction() {
  chrome.storage.local.get("IntervalUpdate", function (data) {
    intervalUpdateNumber = data.IntervalUpdate;
    if (typeof intervalUpdateNumber == "undefined") {
      var intervalUpdateNumber = 360;
      chrome.storage.local.set({ IntervalUpdate: "60" });
    }
    intervalUpdateTime = 1000 * 60 * intervalUpdateNumber;

    window.setInterval((_) => {
      chrome.storage.local.get("country", function (data) {
        country = data.country;
        badgeNum(country);
      });
    }, intervalUpdateTime);
  });
}
intervalUpdateFunction();

function badgeUpdate(confirmed, deaths, country_full, last_updated) {
  chrome.browserAction.setBadgeBackgroundColor({ color: "#eb5569" });
  confirmedString = confirmed.toString();
  updated = moment(last_updated);
  if (confirmedString >= 1000000) {
    confirmedBadge = (confirmedString / 1000000).toFixed(1) + "m";
    chrome.browserAction.setBadgeText({ text: confirmedBadge });
  } else if (confirmedString >= 100000) {
    confirmedBadge = (confirmedString / 1000).toFixed(0) + "k";
    chrome.browserAction.setBadgeText({ text: confirmedBadge });
  } else if (confirmedString >= 10000) {
    confirmedBadge = (confirmedString / 1000).toFixed(1) + "k";
    chrome.browserAction.setBadgeText({ text: confirmedBadge });
  } else {
    chrome.browserAction.setBadgeText({ text: confirmedString });
  }

  if (
    country == "US" ||
    country == "us" ||
    country == "United States of America" ||
    country == "CA" ||
    country == "ca" ||
    country == "Canada"
  ) {
    updateTimeRelativeBadge = moment(last_updated).format("dddd, MMMM D");
    toolTipBadge =
      country_full +
      " - " +
      updateTimeRelativeBadge +
      " " +
      " " +
      "\n" +
      "----------------------" +
      "\n" +
      confirmed.toLocaleString(undefined, { minimumFractionDigits: 0 }) +
      "  " +
      " Confirmed" +
      "\n" +
      deaths.toLocaleString(undefined, { minimumFractionDigits: 0 }) +
      "  " +
      " Deaths";
    chrome.browserAction.setTitle({ title: toolTipBadge });
  } else {
    updateTimeRelativeBadge = moment(last_updated).format("dddd, MMMM D");
    toolTipBadge =
      country_full + " - " + updateTimeRelativeBadge + " " + " " + "\n";
    chrome.browserAction.setTitle({ title: toolTipBadge });
  }
}

function badgeNum(country) {
  fetch(
    "https://cors.uvw.workers.dev/?https://corona.lmao.ninja/v2/countries/" +
      country +
      "?yesterday=null&strict=null&query%20=null"
  )
    .then((resp) => resp.json())
    .then(function (result) {
      confirmed = result.cases;
      deaths = result.deaths;
      country_full = result.country;
      last_updated = result.updated;

      chrome.storage.local.set({ confirmed: confirmed });
      chrome.storage.local.set({ deaths: deaths });
      chrome.storage.local.set({ last_updated: last_updated });
      chrome.storage.local.set({ country_full: country_full });

      badgeUpdate(confirmed, deaths, country_full, last_updated);

      fetch("https://api.covid19api.com/summary")
        .then((resp) => resp.json())
        .then(function (result) {
          worldConfirmed = result.Global.TotalConfirmed;
          worldDeaths = result.Global.TotalDeaths;
          chrome.storage.local.set({ worldConfirmed: worldConfirmed });
          chrome.storage.local.set({ worldDeaths: worldDeaths });
        });
    });
}

chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason == "install") {
    var uninstallWebAddress =
      "https://chrome.google.com/webstore/detail/uv-weather/ngeokhpbgoadbpdpnplcminbjhdecjeb";
    var installWebAddress =
      "https://chrome.google.com/webstore/detail/uv-weather/ngeokhpbgoadbpdpnplcminbjhdecjeb";
    chrome.tabs.create({
      url: installWebAddress,
    });
    if (chrome.runtime.setUninstallURL) {
      chrome.storage.local.clear();
      chrome.runtime.setUninstallURL(uninstallWebAddress);
    }
  }
});
