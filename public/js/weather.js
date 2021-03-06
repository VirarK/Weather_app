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
        .then(function(response) {
            if (response.status == 429) {
                num_key = (num_key + 1) % 4;
                err = true;
                fill_place(city, country, lat, lon);
            } else {
                let data = response.json();
                return data;
            }
        })
        .then(function() {
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
        .then(function(response) {
            if (response.status == 429) {
                num_key = (num_key + 1) % 4;
                get_weather(city, country, lat, lon);
            } else {
                let data = response.json();
                return data;
            }
        })
        .then(function(data) {
            if (data) {
                weather.current = data.current;
                weather.forecast_hourly = data.hourly;
                weather.daily = data.daily;
                weather.timezone = data.timezone;
            }
            return data;
        })
        .then(function(data) {
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
    ).innerHTML = `${first_letter_cap(weather.current.weather[0].description)}`;

    // set today weather icon
    var icon = document.getElementById("icon-weather");
    var dir_icon = `/images/weather/${weather.current.weather[0].icon}.png`;
    icon.setAttribute("src", dir_icon);
    icon.setAttribute("width", "128");
    icon.setAttribute("height", "128");

    // set today weather temperature and feels like
    document.getElementById("temperature").innerHTML = `${Math.floor(
    	weather.current.temp
	)}??C 
        / ${celsius_to_fahrenheit(Math.floor(weather.current.temp))}??F`;
    document.getElementById("feels-like").innerText = `Ressenti ${Math.floor(
		weather.current.feels_like
	)}??C`;

    // set icon and title website
    document.getElementById("website-icon").setAttribute("href", dir_icon);
    document.getElementById(
        "website-title"
    ).innerHTML = `m??t??o de ${city}`;

    //
    var div_uv = document.getElementById("UV");
    var icon_uv = document.createElement("img");
    icon_uv.classList.add("mx-2");
    icon_uv.setAttribute("src", "/images/weather/UV.png");
    icon_uv.setAttribute("height", "32");
    icon_uv.setAttribute("width", "32");
    div_uv.appendChild(icon_uv);
    var text_uv = document.createElement("div");
    text_uv.innerHTML = `Indice UV : ${weather.current.uvi}`;
    div_uv.appendChild(text_uv);

    var div_wind_speed = document.getElementById("wind-speed");
    var icon_wind_speed = document.createElement("img");
    icon_wind_speed.classList.add("mx-2");
    icon_wind_speed.setAttribute("src", "/images/weather/wind2.png");
    icon_wind_speed.setAttribute("height", "32");
    icon_wind_speed.setAttribute("width", "32");
    div_wind_speed.appendChild(icon_wind_speed);
    var text_wind_speed = document.createElement("div");
    text_wind_speed.innerHTML = `Vitesse du vent : ${weather.current.wind_speed} m/s`;
    div_wind_speed.appendChild(text_wind_speed);

    var div_humidity = document.getElementById("humidity");
    var icon_humidity = document.createElement("img");
    icon_humidity.classList.add("mx-2");
    icon_humidity.setAttribute("src", "/images/weather/drop.png");
    icon_humidity.setAttribute("height", "32");
    icon_humidity.setAttribute("width", "32");
    div_humidity.appendChild(icon_humidity);
    var text_humidity = document.createElement("div");
    text_humidity.innerHTML = `Humidit?? : ${weather.current.humidity}%`;
    div_humidity.appendChild(text_humidity);

    var div_clouds = document.getElementById("clouds");
    var icon_clouds = document.createElement("img");
    icon_clouds.classList.add("mx-2");
    icon_clouds.setAttribute("src", "/images/weather/clouds_percentage.png");
    icon_clouds.setAttribute("height", "32");
    icon_clouds.setAttribute("width", "32");
    div_clouds.appendChild(icon_clouds);
    var text_clouds = document.createElement("div");
    text_clouds.innerHTML = `Nuages : ${weather.current.clouds}%`;
    div_clouds.appendChild(text_clouds);

    get_weather_hours(city, country, lat, lon);
}

/**
 * Get previous hours weather.
 */
async function get_weather_hours(city, country, lat, lon) {
    let api = `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${weather.current.dt}&appid=${keys[num_key]}&lang=fr&units=metric`;
    await fetch(api)
        .then(function(response) {
            data = response.json();
            return data;
        })
        .then(function(data) {
            weather.previous_hourly = data.hourly;
        })
        .then(function() {
            fill_hours_weather();
        });
}

/**
 * fill hours weather in html.
 */
function fill_hours_weather() {
    css_custom = "px-2 mx-2 my-1 rounded h6"
    if (weather.current.weather[0].icon.includes("d")) {
        css_custom += " my-light-white-bg";
    } else {
        css_custom += " my-dark-white-bg";
    }

    var div_weather_hours = document.getElementById("weather-hour");
    div_weather_hours.innerHTML = "";

    // previous hour
    var str_end_hour = moment();
    var end_hour = parseInt(str_end_hour.format("HH"));

    var div_carousel = null;
    var div_carousel_d_flex = null;

    var active = false;
    var first_carousel = null;

    var i = 0;
    for (; i <= end_hour - 2; i++) {
        var div_weather_hours_i = document.createElement("div");

        if (i % 5 == 0) {
            if (div_carousel != null) {
                div_weather_hours.appendChild(div_carousel)
            }
            div_carousel = document.createElement("div");
            div_carousel.classList.add("carousel-item");

            if (i == 0) {
                first_carousel = div_carousel;
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
        var date_i = moment(weather.previous_hourly[i].dt * 1000);
        text_hour_i.innerHTML = date_i.format("HH") + "H";
        div_weather_hours_i.appendChild(text_hour_i);

        if (date_i.format("HH") == str_end_hour.tz(weather.timezone).format("HH")) {
            div_carousel.classList.add("active");
            active = true;
        }

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

        // Write hour weather
        var balise_temp_previous_hour_i = document.createElement("div");
        balise_temp_previous_hour_i.classList.add("my-1");
        balise_temp_previous_hour_i.classList.add("text-center");
        var text_temp_previous_hour_i = Math.floor(
            weather.previous_hourly[i].temp
        );
        balise_temp_previous_hour_i.innerHTML = `${text_temp_previous_hour_i}??C`;

        div_weather_hours_i.appendChild(balise_temp_previous_hour_i);

        div_carousel_d_flex.appendChild(div_weather_hours_i);
    }

    // forcast hour
    var j = i;
    end_hour = 24 - end_hour;
    for (var i = 1; i <= end_hour; i++) {
        if (j % 5 == 0) {
            if (div_carousel != null) {
                div_weather_hours.appendChild(div_carousel)
            }
            div_carousel = document.createElement("div");
            div_carousel.classList.add("carousel-item");

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
        var date_i = moment(weather.forecast_hourly[i].dt * 1000);
        text_hour_i.innerHTML = date_i.format("HH") + "H";
        div_weather_hours_i.appendChild(text_hour_i);

        if (date_i.format("HH") == str_end_hour.tz(weather.timezone).format("HH")) {
            div_carousel.classList.add("active");
            active = true;
        }

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

        // Write hour weather
        var balise_temp_forecast_hour_i = document.createElement("div");
        balise_temp_forecast_hour_i.classList.add("text-center");
        balise_temp_forecast_hour_i.classList.add("my-1");
        var text_temp_forecast_hour_i = Math.floor(weather.forecast_hourly[i].temp);
        balise_temp_forecast_hour_i.innerHTML = `${text_temp_forecast_hour_i}??C`;

        div_weather_hours_i.appendChild(balise_temp_forecast_hour_i);

        div_carousel_d_flex.appendChild(div_weather_hours_i);
        j++;
    }

    div_carousel.appendChild(div_carousel_d_flex)
    div_weather_hours.appendChild(div_carousel)

    if (!active) {
        first_carousel.classList.add("active");
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
        // main div
        var div_weather_week_i = document.createElement("div");
        div_weather_week_i.classList.add("d-flex");
        div_weather_week_i.setAttribute("class", css_custom);

        // date
        var date = moment();
        var date_i_timezone = date.tz(weather.timezone);
        var date_i = date_i_timezone.add(i, "days");
        var text_date_i = document.createElement("div");
        text_date_i.classList.add("text-center");
        text_date_i.classList.add("my-2");
        text_date_i.innerHTML = first_letter_cap(date_i.format("ddd D"));
        div_weather_week_i.appendChild(text_date_i);

        // icon weather
        var weather_icon_date_div_i = document.createElement("div");
        weather_icon_date_div_i.classList.add("text-center");
        weather_icon_date_div_i.classList.add("my-2");

        var weather_icon_date_i = document.createElement("img");
        var weather_dir_icon_date_i = `/images/weather/${weather.daily[i].weather[0].icon}.png`;
        weather_icon_date_i.setAttribute("src", weather_dir_icon_date_i);
        weather_icon_date_i.setAttribute("width", "80");
        weather_icon_date_i.setAttribute("height", "80");
        weather_icon_date_div_i.appendChild(weather_icon_date_i);
        div_weather_week_i.appendChild(weather_icon_date_div_i);

        // description
        var weather_description_i = document.createElement("div");
        weather_description_i.classList.add("text-center");
        weather_description_i.classList.add("text-small");
        weather_description_i.classList.add("my-2");
        weather_description_i.innerHTML = first_letter_cap(weather.daily[i].weather[0].description);
        div_weather_week_i.appendChild(weather_description_i);

        // temperature max
        var div_temperature_day_i_max = document.createElement("div");
        div_temperature_day_i_max.classList.add("d-flex");
        div_temperature_day_i_max.classList.add("align-items-center");
        div_temperature_day_i_max.classList.add("justify-content-center");
        div_temperature_day_i_max.classList.add("mx-2");
        div_temperature_day_i_max.classList.add("mt-2");

        var icon_temperature_day_i_max = document.createElement("img");
        icon_temperature_day_i_max.setAttribute("src", "/images/weather/hot.png");
        icon_temperature_day_i_max.setAttribute("height", "32");
        icon_temperature_day_i_max.setAttribute("width", "32");
        div_temperature_day_i_max.appendChild(icon_temperature_day_i_max);

        var text_temperature_day_i_max = document.createElement("div");
        text_temperature_day_i_max.classList.add("mx-2");
        text_temperature_day_i_max.classList.add("text-center");
        text_temperature_day_i_max.innerHTML = `${Math.floor(
      		weather.daily[i].temp.max
    	)}??C`;
        div_temperature_day_i_max.appendChild(text_temperature_day_i_max);
        div_weather_week_i.appendChild(div_temperature_day_i_max);

        // temperature min
        var div_temperature_day_i_min = document.createElement("div");
        div_temperature_day_i_min.classList.add("d-flex");
        div_temperature_day_i_min.classList.add("align-items-center");
        div_temperature_day_i_min.classList.add("justify-content-center");
        div_temperature_day_i_min.classList.add("mx-2");
        div_temperature_day_i_min.classList.add("mb-2");

        var icon_temperature_day_i_min = document.createElement("img");
        icon_temperature_day_i_min.setAttribute("src", "/images/weather/cold.png");
        icon_temperature_day_i_min.setAttribute("height", "32");
        icon_temperature_day_i_min.setAttribute("width", "32");
        div_temperature_day_i_min.appendChild(icon_temperature_day_i_min);

        var text_temperature_day_i_min = document.createElement("div");
        text_temperature_day_i_min.classList.add("mx-2");
        text_temperature_day_i_min.classList.add("text-center");
        text_temperature_day_i_min.innerHTML = `${Math.floor(
			weather.daily[i].temp.min
		)}??C`;
        div_temperature_day_i_min.appendChild(text_temperature_day_i_min);
        div_weather_week_i.appendChild(div_temperature_day_i_min);

        // weather humidity
        var div_weather_humidity_i = document.createElement("div");
        div_weather_humidity_i.classList.add("d-flex");
        div_weather_humidity_i.classList.add("justify-content-center");
        div_weather_humidity_i.classList.add("align-items-center");
        div_weather_humidity_i.classList.add("my-2");

        var weather_humidity_i_icon = document.createElement("img");
        weather_humidity_i_icon.classList.add("text-center");

        var weather_humidity_i_icon_dir = `/images/weather/drop.png`;
        weather_humidity_i_icon.setAttribute("src", weather_humidity_i_icon_dir);
        weather_humidity_i_icon.setAttribute("width", "32");
        weather_humidity_i_icon.setAttribute("height", "32");
        div_weather_humidity_i.appendChild(weather_humidity_i_icon);

        var weather_humidity_i_text = document.createElement("div");
        weather_humidity_i_text.classList.add("mx-1");
        weather_humidity_i_text.innerHTML = `${weather.daily[i].humidity}%`;
        div_weather_humidity_i.appendChild(weather_humidity_i_text);
        div_weather_week_i.appendChild(div_weather_humidity_i);

        // weather wind
        var div_weather_wind_i = document.createElement("div");
        div_weather_wind_i.classList.add("d-flex");
        div_weather_wind_i.classList.add("justify-content-center");
        div_weather_wind_i.classList.add("align-items-center");
        div_weather_wind_i.classList.add("my-2");

        var weather_wind_i_icon = document.createElement("img");
        weather_wind_i_icon.classList.add("text-center");
        weather_wind_i_icon.classList.add("mx-1");

        var weather_wind_i_icon_dir = `/images/weather/wind2.png`;
        weather_wind_i_icon.setAttribute("src", weather_wind_i_icon_dir);
        weather_wind_i_icon.setAttribute("width", "32");
        weather_wind_i_icon.setAttribute("height", "32");
        div_weather_wind_i.appendChild(weather_wind_i_icon);

        var weather_wind_i_text = document.createElement("div");
        weather_wind_i_text.classList.add("mx-1");
        weather_wind_i_text.innerHTML = `${weather.daily[i].wind_speed} m/s`;
        div_weather_wind_i.appendChild(weather_wind_i_text);
        div_weather_week_i.appendChild(div_weather_wind_i);
        div_weather_week.appendChild(div_weather_week_i);
    }

    fill_date();
}

/**
 * Fill today date in html.
 */
function fill_date() {
    var date_html = document.getElementById("date");
    var now = moment(weather.dt);
    var now_timezone = now.tz(weather.timezone);
    date_html.innerHTML = first_letter_cap(now_timezone.format("dddd D MMMM"));

    change_colors();
}

/**
 * 
 */
function updateTime() {
    var now = moment().tz(weather.timezone).format("HH mm ss");
    var now_split = now.split(" ");

    var div_hour = document.getElementById("hour");
    var div_min = document.getElementById("minute");
    var div_sec = document.getElementById("second");

    if (div_hour.innerHTML != now_split[0]) {
        div_hour.innerHTML = now_split[0];
    }
    if (div_min.innerHTML != now_split[1]) {
        div_min.innerHTML = now_split[1];
    }
    if (div_sec.innerHTML != now_split[2]) {
        div_sec.innerHTML = now_split[2];
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
    if (document.body) {

        var now = moment(weather.dt);
        var now_timezone = now.tz(weather.timezone);

        var sunrise = moment(weather.current.sunrise * 1000);
        var sunrise_timezone = sunrise.tz(weather.timezone);

        var sunset = moment(weather.current.sunset * 1000);
        var sunset_timezone = sunset.tz(weather.timezone);

        if (now_timezone.isAfter(sunrise_timezone) && now_timezone.isBefore(sunset_timezone)) {
            return "d";
        } else {
            return "n";
        }
    }
}