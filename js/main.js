"use strict";

var getButton = document.querySelector("#sumbit-button");
var input = document.querySelector("#search-filed");

var response;

function setLocalStorage(key) {
  sessionStorage.setItem("country", JSON.stringify(key));
}

if (sessionStorage.getItem("country") != null) {
  var convert = JSON.parse(sessionStorage.getItem("country"));
  fetchWeatherData(convert);
} else {
  fetchWeatherData("egypt");
}

getButton.addEventListener("click", function () {
  setLocalStorage(input.value);
  fetchWeatherData(input.value);
});


async function fetchWeatherData(query) {
  var data = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=4b7101a17663464d965233241240301&q=${query}&days=5`
  );
  response = await data.json();
  rebuildUi(response);
}


function rebuildUi(data) {
  var container = `
  <div class="col-lg-4 col-md-6 p-lg-0" >
                    <div class="first-container">
                      <div class="header d-flex justify-content-between">
                        <h3 class="day">${new Date(
                          data.forecast.forecastday[1].date
                        ).toLocaleDateString("en", { weekday: "long" })}</h3>
                        <h3 class="data">${
                          new Date(data.location.localtime).toLocaleDateString(
                            "en",
                            {
                              month: "long",
                            }
                          ) +
                          " - " +
                          new Date(data.location.localtime).toLocaleDateString(
                            "en",
                            {
                              day: "2-digit",
                            }
                          )
                        }</h3>
                      </div>
                      <div class="body">
                        <h3>${data.location.name}</h3>
                        <div class="d-flex dagree">
                          <h4>${data.current.temp_c}<sup>o</sup>C</h4>
                          <div class="img">
                            <img src=${data.current.condition.icon} alt="">
                          </div>
                        </div>
                        <p>${data.current.condition.text}</p>
                        <span><img src="img/icon-umberella.png" alt="">${
                          data.current.wind_degree
                        }%</span>
                         <span><img src="img/icon-compass.png" alt="">${
                           data.current.wind_dir
                         }</span>
                <span><img src="img/icon-wind.png" alt="">${
                  data.current.wind_kph
                }km/h</span>
               
                      </div>
                    </div>
                </div>
                <div class="col-lg-4 p-lg-0 col-md-6 ">
                  <div class="second-container text-center">
                    <div class="header">
                      <h3>${new Date(
                        data.forecast.forecastday[2].date
                      ).toLocaleDateString("en", {
                        weekday: "long",
                      })}</h3>
                    </div>
                    <div class="body">
                      <img src=${
                        data.forecast.forecastday[2].day.condition.icon
                      } alt="">
                      <h4>${
                        data.forecast.forecastday[2].day.maxtemp_c
                      }<sup>o</sup>C</h4>
                      <small>${
                        data.forecast.forecastday[2].day.mintemp_c
                      }<sup>o</sup></small>
                      <p>${data.forecast.forecastday[2].day.condition.text}</p>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4 col-md-6 p-lg-0">
                  <div class="text-center last-container">
                    <div class="header">
                      <h3>${new Date(
                        data.forecast.forecastday[3].date
                      ).toLocaleDateString("en", {
                        weekday: "long",
                      })}</h3>
                    </div>
                    <div class="body">
                      <img src=${
                        data.forecast.forecastday[3].day.condition.icon
                      } alt="">
                      <h4>${
                        data.forecast.forecastday[3].day.maxtemp_c
                      }<sup>o</sup>C</h4>
                      <small>${
                        data.forecast.forecastday[3].day.mintemp_c
                      }<sup>o</sup></small>
                      <p>${data.forecast.forecastday[3].day.condition.text}</p>
                    </div>
                  </div>
                </div>
  `;
  document.querySelector("#getNewData").innerHTML = container;
}
