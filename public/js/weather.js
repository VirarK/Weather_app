const weather = {};

const today = new Date(Date.now());
let dt = Math.floor(today / 1000);

var css_custom = null;

// ##############################################################################################

/**
 * Get current, forecast hourly and daily weather.
 */
async function get_weather(city, country, lat, lon) {
  let api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${open_weather_key}&lang=fr&units=metric&exclude=minutely,alerts`;
  await fetch(api)
    .then(function (response) {
      let data = response.json();
      return data;
    })
    .then(function (data) {
      dt = data.current.dt;
      weather.current = data.current;
      weather.forecast_hourly = data.hourly;
      weather.daily = data.daily;
    })
    .then(function () {
      fill_weather(city, country, lat, lon);
    });
}

/**
 * Get previous hours weather.
 */
async function get_weather_hours(city, country, lat, lon) {
  let api = `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${dt}&appid=${open_weather_key}&lang=fr&units=metric`;
  await fetch(api)
    .then(function (response) {
      data = response.json();
      return data;
    })
    .then(function (data) {
      weather.previous_hourly = data.hourly;
    })
    .then(function () {
      fill_hours_weather();
    });
}

// ##############################################################################################

/**
 * Fill user place in html with latitude and longitude.
 */
async function fill_place(city, country, lat, lon) {
  let api = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=2&appid=${open_weather_key}`;
  await fetch(api)
    .then(function (response) {
      let data = response.json();
      return data;
    })
    .then(function () {
      get_weather(city, country, lat, lon);
    });
}

/**
 * Fill today date in html.
 */
function fill_date() {
  var date_html = document.getElementById("date");
  var date = transform_date(today);
  date_html.innerHTML = date;

  fill_color_theme();
}

/**
 * Fill current weather in html.
 */
function fill_weather(city, country, lat, lon) {
  //
  document.getElementById("place").innerHTML = `${
    city
  }, ${transform_country(country)}`;
  document.getElementById(
    "weather-short-description"
  ).innerHTML = `${weather.current.weather[0].description}`;

  // set today weather icon
  var icon = document.getElementById("icon-weather");
  var dir_icon = `/images/weather/${weather.current.weather[0].icon}.png`;
  icon.setAttribute("src", dir_icon);
  icon.setAttribute("width", "128");
  icon.setAttribute("height", "128");

  // set today weather temperature and feels like
  document.getElementById("temperature").innerHTML = `${Math.floor(
    weather.current.temp
  )}°C 
        / ${celsius_to_fahrenheit(Math.floor(weather.current.temp))}°F`;
  document.getElementById("feels-like").innerText = `Ressenti ${Math.floor(
    weather.current.feels_like
  )}°C`;

  // set icon and title website
  document.getElementById("website-icon").setAttribute("href", dir_icon);
  document.getElementById(
    "website-title"
  ).innerHTML = `météo de ${city}`;

  //
  document.getElementById("UV").innerHTML = `UV ${weather.current.uvi}`;
  document.getElementById(
    "wind-speed"
  ).innerHTML = `vitesse du vent ${weather.current.wind_speed}m/s`;
  document.getElementById(
    "humidity"
  ).innerHTML = `Humidité ${weather.current.humidity}%`;
  document.getElementById(
    "clouds"
  ).innerHTML = `Nuage ${weather.current.clouds}%`;

  get_weather_hours(city, country, lat, lon);
}

/**
 * fill hours weather in html.
 */
 function fill_hours_weather() {
  if (weather.current.weather[0].icon.includes("d")) {
    css_custom = "px-2 mx-2 my-1 rounded my-light-white-bg";
  } else {
    css_custom = "px-2 mx-2 my-1 rounded my-dark-white-bg";
  }

  var div_weather_hours = document.getElementById("weather-hour");
  div_weather_hours.innerHTML = "";

  // previous hour
  var date = new Date(weather.previous_hourly[0].dt*1000);
  var end = today.getHours() - date.getHours()

  for (i = 0; i < end; i++) {
    var div_weather_hours_i = document.createElement("div");
    div_weather_hours_i.setAttribute("class", css_custom);

    // Write the hour
    var text_hour_i = document.createElement("div");
    var date_i = new Date(weather.previous_hourly[i].dt * 1000);
    if (date_i.getHours() < 10) {
      text_hour_i.innerHTML = "0" + date_i.getHours() + "H";
    } else {
      text_hour_i.innerHTML = date_i.getHours() + "H";
    }

    // Write hour weather
    var balise_temp_previous_hour_i = document.createElement("div");
    var text_temp_previous_hour_i = Math.floor(
      weather.previous_hourly[i].temp
    );
    balise_temp_previous_hour_i.innerHTML = `${text_temp_previous_hour_i}°C`;

    div_weather_hours_i.appendChild(text_hour_i);
    div_weather_hours_i.appendChild(balise_temp_previous_hour_i);

    div_weather_hours.appendChild(div_weather_hours_i);
  }

  // forcast hour
  for (i = 0; i < 24 - end - 2; i++) {
    var div_weather_hours_i = document.createElement("div");
    div_weather_hours_i.setAttribute("class", css_custom);

    // Write the hour
    var text_hour_i = document.createElement("div");
    var date_i = new Date(weather.forecast_hourly[i].dt * 1000)
    if (date_i.getHours() < 10) {
      text_hour_i.innerHTML = "0" + date_i.getHours() + "H";
    } else {
      text_hour_i.innerHTML = date_i.getHours() + "H";
    }

    // Write hour weather
    var balise_temp_forecast_hour_i = document.createElement("div");
    var text_temp_forecast_hour_i = Math.floor(weather.forecast_hourly[i].temp);
    balise_temp_forecast_hour_i.innerHTML = `${text_temp_forecast_hour_i}°C`;

    div_weather_hours_i.appendChild(text_hour_i);
    div_weather_hours_i.appendChild(balise_temp_forecast_hour_i);

    div_weather_hours.appendChild(div_weather_hours_i);
  }

  fill_week_weather();
}
/**
 * Fill weather week in html.
 */
function fill_week_weather() {
  var div_weather_week = document.getElementById("weather-week");
  div_weather_week.innerHTML = "";

  // create week days
  for (var i = 1; i < 7; i++) {
    var div_weather_week_i = document.createElement("div");
    div_weather_week_i.setAttribute("class", css_custom);

    // Write date
    var date_i = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + i
    );
    var date_i_transform = transform_date(date_i, 1);
    var text_date_i = document.createElement("div");
    text_date_i.innerHTML = date_i_transform;

    // Draw icon
    var weather_date_i = document.createElement("div");
    var weather_icon_date_i = document.createElement("img");
    var weather_dir_icon_date_i = `/images/weather/${weather.daily[i].weather[0].icon}.png`;
    weather_icon_date_i.setAttribute("src", weather_dir_icon_date_i);
    weather_icon_date_i.setAttribute("width", "56");
    weather_icon_date_i.setAttribute("height", "56");

    weather_date_i.appendChild(weather_icon_date_i);

    // Write max and min temperature
    var temperature_day_i_max = document.createElement("div");
    temperature_day_i_max.innerHTML = `max : ${Math.floor(
      weather.daily[i].temp.max
    )}°C`;

    var temperature_day_i_min = document.createElement("div");
    temperature_day_i_min.innerHTML = `min : ${Math.floor(
      weather.daily[i].temp.min
    )}°C`;

    weather_date_i.appendChild(temperature_day_i_max);
    weather_date_i.appendChild(temperature_day_i_min);

    div_weather_week_i.appendChild(text_date_i);
    div_weather_week_i.appendChild(weather_date_i);

    div_weather_week.appendChild(div_weather_week_i);
  }

  fill_date();
}

/**
 * Set background image and theme color with the current weather.
 */
function fill_color_theme() {
  var bg = document.body;

  var weather_dir_img = `url(/images/bg/${weather.current.weather[0].icon}.jpg)`;
  bg.style.backgroundImage = weather_dir_img;

  //
  var main_container = document.getElementById("main-container");
  var lc = document.getElementById("localisation");
  if (weather.current.weather[0].icon.includes("n")) {
    main_container.classList.remove("my-black");
    main_container.classList.add("my-white");

    lc.style.color = "var(--my_white)";
  } else {
    main_container.classList.remove("my-white");
    main_container.classList.add("my-black");

    lc.style.color = "var(--my_black)";
  }
}

// ##############################################################################################

// get_location();

