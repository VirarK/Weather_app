const weather = {};

moment.locale("fr");
const today = moment();

var css_custom = null;

// ##############################################################################################

/**
 * Fill user place in html with latitude and longitude.
 */
 async function fill_place(city, country, lat, lon) {
  var err = false;
  let api = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=2&appid=${keys[num_key]}`;
  await fetch(api)
    .then(function (response) {
      if (response.status == 429) {
        num_key = (num_key + 1) % 4;
        err = true;
        fill_place(city, country, lat, lon);
      } else {
        let data = response.json();
        return data;
      }
    })
    .then(function () {
      if (!err) {
        get_weather(city, country, lat, lon);
      }
    });
}

/**
 * Get current, forecast hourly and daily weather.
 */
async function get_weather(city, country, lat, lon) {
  let api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${keys[num_key]}&lang=fr&units=metric&exclude=minutely,alerts`;
  await fetch(api)
    .then(function (response) {
      if (response.status == 429) {
        num_key = (num_key + 1) % 4;
        get_weather(city, country, lat, lon);
      } else {
        let data = response.json();
        return data;
      }
    })
    .then(function (data) {
      if (data) {
        weather.current = data.current;
        weather.forecast_hourly = data.hourly;
        weather.daily = data.daily;
        weather.dt = data.current.dt;
        weather.timezone = data.timezone;
        weather.sunrise = data.current.sunrise;
        weather.sunset = data.current.sunset;
      }
      return data;
    })
    .then(function (data) {
      if (data) {
        fill_weather(city, country, lat, lon);
      }
    });
}

/**
 * Fill current weather in html.
 */
 function fill_weather(city, country, lat, lon) {
  //
  document.getElementById("place").innerHTML = `${
    city
  }, ${transform_country("fr", country)}`;
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
 * Get previous hours weather.
 */
async function get_weather_hours(city, country, lat, lon) {
  let api = `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${weather.dt}&appid=${keys[num_key]}&lang=fr&units=metric`;
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

/**
 * fill hours weather in html.
 */
 function fill_hours_weather() {
  css_custom = "px-2 mx-2 my-1 rounded"
  if (weather.current.weather[0].icon.includes("d")) {
    css_custom += " my-light-white-bg";
  } else {
    css_custom += " my-dark-white-bg";
  }

  var div_weather_hours = document.getElementById("weather-hour");
  div_weather_hours.innerHTML = "";

  // previous hour
  var date = new Date(weather.current.dt * 1000);
  var end = date.getHours();

  var div_carousel = null
  var div_carousel_d_flex = null

  var i = 0;
  for (; i <= end - 2; i++) {
    var div_weather_hours_i = document.createElement("div");
    
    if (i % 5 == 0) {
      if (div_carousel != null) {
        div_weather_hours.appendChild(div_carousel)
      }
      div_carousel = document.createElement("div");
      div_carousel.classList.add("carousel-item");
      if (i == 0) {
        div_carousel.classList.add("active");
      }

      div_carousel_d_flex = document.createElement("div");
      div_carousel_d_flex.classList.add("d-flex");
      div_carousel_d_flex.classList.add("justify-content-center");
      div_carousel.appendChild(div_carousel_d_flex)
    }

    div_weather_hours_i.setAttribute("class", css_custom);
    
    // Write the hour
    var text_hour_i = document.createElement("div");
    text_hour_i.classList.add("text-center");
    text_hour_i.classList.add("my-1");
    var date_i = new Date(weather.previous_hourly[i].dt * 1000);
    if (date_i.getHours() < 10) {
      text_hour_i.innerHTML = "0" + date_i.getHours() + "H";
    } else {
      text_hour_i.innerHTML = date_i.getHours() + "H";
    }
    div_weather_hours_i.appendChild(text_hour_i);

    // Draw icon
    var weather_icon_date_div_i = document.createElement("div");
    weather_icon_date_div_i.classList.add("text-center");
    weather_icon_date_div_i.classList.add("my-1");
    var weather_icon_date_i = document.createElement("img");
    var weather_dir_icon_date_i = `/images/weather/${weather.previous_hourly[i].weather[0].icon}.png`;
    weather_icon_date_i.setAttribute("src", weather_dir_icon_date_i);
    weather_icon_date_i.setAttribute("width", "64");
    weather_icon_date_i.setAttribute("height", "64");

    weather_icon_date_div_i.appendChild(weather_icon_date_i);
    div_weather_hours_i.appendChild(weather_icon_date_div_i);

    //
    /* var weather_description_i = document.createElement("div");
    weather_description_i.classList.add("text-center");
    weather_description_i.innerHTML = weather.previous_hourly[i].weather[0].description;
    div_weather_hours_i.appendChild(weather_description_i); */

    // Write hour weather
    var balise_temp_previous_hour_i = document.createElement("div");
    balise_temp_previous_hour_i.classList.add("my-1");
    balise_temp_previous_hour_i.classList.add("text-center");
    var text_temp_previous_hour_i = Math.floor(
      weather.previous_hourly[i].temp
    );
    balise_temp_previous_hour_i.innerHTML = `${text_temp_previous_hour_i}°C`;

    div_weather_hours_i.appendChild(balise_temp_previous_hour_i);

    div_carousel_d_flex.appendChild(div_weather_hours_i);
  }

  // forcast hour
  var j = i;
  end = 24 - end;
  for (var i = 1; i <= end; i++) {
    if (j % 5 == 0) {
      if (div_carousel != null) {
        div_weather_hours.appendChild(div_carousel)
      }
      div_carousel = document.createElement("div");
      div_carousel.classList.add("carousel-item");
      if (j == 0) {
        div_carousel.classList.add("active");
      }

      div_carousel_d_flex = document.createElement("div");
      div_carousel_d_flex.classList.add("d-flex");
      div_carousel_d_flex.classList.add("justify-content-center");
      div_carousel.appendChild(div_carousel_d_flex)
    }

    var div_weather_hours_i = document.createElement("div");
    div_weather_hours_i.setAttribute("class", css_custom);

    // Write the hour
    var text_hour_i = document.createElement("div");
    text_hour_i.classList.add("text-center");
    text_hour_i.classList.add("my-1");
    var date_i = new Date(weather.forecast_hourly[i].dt * 1000)
    if (date_i.getHours() < 10) {
      text_hour_i.innerHTML = "0" + date_i.getHours() + "H";
    } else {
      text_hour_i.innerHTML = date_i.getHours() + "H";
    }
    div_weather_hours_i.appendChild(text_hour_i);

    // Draw icon
    var weather_icon_date_div_i = document.createElement("div");
    weather_icon_date_div_i.classList.add("text-center");
    weather_icon_date_div_i.classList.add("my-1");
    var weather_icon_date_i = document.createElement("img");
    var weather_dir_icon_date_i = `/images/weather/${weather.forecast_hourly[i].weather[0].icon}.png`;
    weather_icon_date_i.setAttribute("src", weather_dir_icon_date_i);
    weather_icon_date_i.setAttribute("width", "64");
    weather_icon_date_i.setAttribute("height", "64");

    weather_icon_date_div_i.appendChild(weather_icon_date_i);
    div_weather_hours_i.appendChild(weather_icon_date_div_i);

    //
    /* var weather_description_i = document.createElement("div");
    weather_description_i.classList.add("text-center");
    weather_description_i.innerHTML = weather.forecast_hourly[i].weather[0].description;
    div_weather_hours_i.appendChild(weather_description_i); */

    // Write hour weather
    var balise_temp_forecast_hour_i = document.createElement("div");
    balise_temp_forecast_hour_i.classList.add("text-center");
    balise_temp_forecast_hour_i.classList.add("my-1");
    var text_temp_forecast_hour_i = Math.floor(weather.forecast_hourly[i].temp);
    balise_temp_forecast_hour_i.innerHTML = `${text_temp_forecast_hour_i}°C`;

    div_weather_hours_i.appendChild(balise_temp_forecast_hour_i);

    div_carousel_d_flex.appendChild(div_weather_hours_i);
    j++;
  }

  div_carousel.appendChild(div_carousel_d_flex)
  div_weather_hours.appendChild(div_carousel)

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
    div_weather_week_i.classList.add("d-flex");
    div_weather_week_i.setAttribute("class", css_custom);

    // Write date
    var date_i = moment().add(i, "days");
    var text_date_i = document.createElement("div");
    text_date_i.classList.add("text-center");
    text_date_i.classList.add("my-1");
    text_date_i.innerHTML = date_i.format("ddd D");

    div_weather_week_i.appendChild(text_date_i);

    // Draw icon
    var weather_icon_date_div_i = document.createElement("div");
    weather_icon_date_div_i.classList.add("text-center");
    weather_icon_date_div_i.classList.add("my-1");
    var weather_icon_date_i = document.createElement("img");
    var weather_dir_icon_date_i = `/images/weather/${weather.daily[i].weather[0].icon}.png`;
    weather_icon_date_i.setAttribute("src", weather_dir_icon_date_i);
    weather_icon_date_i.setAttribute("width", "100");
    weather_icon_date_i.setAttribute("height", "100");

    weather_icon_date_div_i.appendChild(weather_icon_date_i);
    div_weather_week_i.appendChild(weather_icon_date_div_i);

    // Write max and min temperature
    var temperature_day_i = document.createElement("div");
    temperature_day_i.classList.add("d-flex");
    temperature_day_i.classList.add("justify-content-center");
    temperature_day_i.classList.add("my-1");
    
    var temperature_day_i_max = document.createElement("div");
    temperature_day_i_max.classList.add("mx-2");
    temperature_day_i_max.classList.add("text-center");
    temperature_day_i_max.innerHTML = `${Math.floor(
      weather.daily[i].temp.max
    )}°C`;
    temperature_day_i.appendChild(temperature_day_i_max);

    var temperature_day_i_min = document.createElement("div");
    temperature_day_i_min.classList.add("mx-2");
    temperature_day_i_min.classList.add("text-center");
    temperature_day_i_min.classList.add("align-self-center");
    temperature_day_i_min.innerHTML = `${Math.floor(
      weather.daily[i].temp.min
    )}°C`;
    temperature_day_i_min.classList.add("text-small");
    temperature_day_i.appendChild(temperature_day_i_min);

    //
    var weather_description_i = document.createElement("div");
    weather_description_i.classList.add("text-center");
    weather_description_i.classList.add("text-small");
    weather_description_i.innerHTML = weather.daily[i].weather[0].description;
    div_weather_week_i.appendChild(weather_description_i);

    div_weather_week_i.appendChild(temperature_day_i);

    div_weather_week.appendChild(div_weather_week_i);
  }

  fill_date();
}

/**
 * Fill today date in html.
 */
function fill_date() {
  var date_html = document.getElementById("date");
  date_html.innerHTML = today.format("dddd D MMMM");

  change_colors();
}

/**
 * 
 */
function updateTime() {
	var now = moment().tz(weather.timezone);
	var hour = now.hours();
	var min = now.minutes();
	var sec = now.seconds();
	var div_hour = document.getElementById("hour");
	var div_min = document.getElementById("minute");
	var div_sec = document.getElementById("second");
	
	if (div_hour.innerHTML != hour) {
		if (hour < 10) {
			div_hour.innerHTML = "0" + hour;
		} else {
			div_hour.innerHTML = hour;
		}
	}

	if (div_min.innerHTML != min) {
		if (min < 10) {
			div_min.innerHTML = "0" + min;
		} else {
			div_min.innerHTML = min;
		}
	}

	if (div_sec.innerHTML != sec) {
		if (sec < 10) {
			div_sec.innerHTML = "0" + sec;
		} else {
			div_sec.innerHTML = sec;
		}
	}
}

/**
 * 
 */
function change_colors() {
	let icon_prev = document.getElementById("prev");
	let icon_next = document.getElementById("next");
  
  var lc = document.getElementById("localisation");
  
  var bg = document.body;
  
  var weather_dir_img = `url(/images/bg/${weather.current.weather[0].icon}.jpg)`;
  bg.style.backgroundImage = weather_dir_img;
  bg.style.height = "100%";

  var main_container = document.getElementById("main-container");

	if (change_bg() == "n") {
    main_container.classList.add("my-white");
    lc.classList.add("my-white");

		if (icon_prev) {
      icon_prev.classList.remove("my-white");
      icon_prev.classList.add("my-white");
		}
		if (icon_next) {
      icon_next.classList.remove("my-white");
      icon_next.classList.add("my-white");
		}
	} else {
		if (icon_prev) {
      icon_prev.classList.remove("my-white");
      icon_prev.classList.add("my-black");
		}
		if (icon_next) {
      icon_next.classList.remove("my-white");
      icon_next.classList.add("my-black");
		}
    
    main_container.classList.remove("my-white");
    lc.classList.remove("my-white");
	}
  
  updateTime();
  setInterval(updateTime, 100);
}

/**
 * 
 * @returns 
 */
function change_bg() {
	if(document.body) {
    
    var now = moment(weather.dt * 1000);
    var now_timezone = now.tz(weather.timezone);
    //console.log(now_timezone.format("LLLL"));

    var sunrise = moment(weather.sunrise * 1000);
    var sunrise_timezone = sunrise.tz(weather.timezone);
    console.log(sunrise_timezone.format("LLLL"));
    
    var sunset = moment(weather.sunset * 1000);
    var sunset_timezone = sunset.tz(weather.timezone);
    console.log(sunset_timezone.format("LLLL"));

		if (now_timezone.isAfter(sunrise_timezone) && now_timezone.isBefore(sunset_timezone)) {
      console.log("day");
      return "d";
		} else {
      console.log("night");
			return "n";
		}
	}
}