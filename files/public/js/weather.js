const user_location = {};

const open_weather_key_hasnae = "27ea29f7607830944e90d5e9f0560259";
const open_weather_key_melissa = "b0dcff87aa3fbe043e172859070fb6a3";
const open_weather_key_mickael = "e4b40859cda1f2ff60ebabf6202a6de6";
const open_weather_key = open_weather_key_hasnae

const today = new Date(Date.now());
const dt = Math.floor(today / 1000);
const shift_hours = 3;

var css_custom = null;

// ##############################################################################################

/**
 * Return corresponding french day.
 * 
 * @param {String} day english day.
 * @returns french day.
 */
function transform_day(day) {
    const map_day_en_to_fr = {
        "Mon": "Lundi",
        "Tue": "Mardi",
        "Wed": "Mercredi",
        "Thu": "Jeudi",
        "Fri": "Vendredi",
        "Sat": "Samedi",
        "Sun": "Dimanche",
    };

    return map_day_en_to_fr[day];
}

/**
 * Return corresponding french day but shortest version.
 * 
 * @param {String} day english day.
 * @returns french day.
 */
function transform_day_low(day) {
    const map_day_en_to_fr = {
        "Mon": "Lun",
        "Tue": "Mar",
        "Wed": "Mer",
        "Thu": "Jeu",
        "Fri": "Ven",
        "Sat": "Sam",
        "Sun": "Dim",
    };

    return map_day_en_to_fr[day];
}

/**
 * Return corresponding french month.
 * 
 * @param {*} month english month.
 * @returns french month.
 */
function transform_month(month) {
    const map_month_en_to_fr = {
        "Jan": "Janvier",
        "Feb": "Fevrier",
        "Mar": "Mars",
        "Apr": "Avril",
        "May": "Mai",
        "Jun": "Juin",
        "Jul": "Juillet",
        "Aug": "Aout",
        "Sep": "Septembre",
        "Oct": "Octobre",
        "Nov": "Novembre",
        "Dec": "Decembre",
    };

    return map_month_en_to_fr[month];
}

/**
 * Transform date in french version.
 * 
 * @param {Date} date english version (ex Mer Mar 16).
 * @param {Number} mode shortest day or not.
 * @returns date in french version (ex Mer Mar 16 -> Mercredi 16 Mars or Mer 16 Mars).
 */
function transform_date(date, mode = 0) {
    var date_str = date.toDateString();
    var table_date_str = date_str.split(" ");

    if (mode == 0) {
        return transform_day(table_date_str[0]) + " " + table_date_str[2] + " " + transform_month(table_date_str[1]);
    } else if (mode == 1) {
        return transform_day_low(table_date_str[0]) + " " + table_date_str[2];
    }
}

/**
 * Return country code corresponding to country name.
 * 
 * @param {String} country_code the country code (FR, EN, ...). 
 * @returns the country full name (France, ...).
 */
function transform_country_code() {
    let region_names = new Intl.DisplayNames(['en'], { type: 'region' });
    return region_names.of(user_location.country_code);
}

// ##############################################################################################

/**
 * Convert celsius in fehrenheit.
 * 
 * @param {Number} temperature .
 * @returns celsius.
 */
function celsius_to_fahrenheit(temperature) {
    return (temperature * 9 / 5) + 32;
}

// ##############################################################################################

/**
 * Get user location with navigator.
 */
function get_location() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(set_position, get_ip_adress);
    } else {
        get_ip_adress();
    }
}

/**
 * Set user position structure.
 * @param {Object} geolocation object with user coords.
 */
async function set_position(geolocation) {
    user_location.lat = geolocation.coords.latitude;
    //console.log("🚀 ~ file: script.js ~ line 131 ~ set_position ~ user_location.lat", user_location.lat)
    user_location.lon = geolocation.coords.longitude;
    //console.log("🚀 ~ file: script.js ~ line 133 ~ set_position ~ user_location.lon", user_location.lon)

    fill_place();
}

/**
 * Get user ip adress and set latitude/ longitude
 */
async function get_ip_adress() {
    let api = `https://eu-api.ipdata.co/?api-key=26764a7363ed0775539678097b1944f2dcc4689d6bc883eebbe7b242`;
    await fetch(api)
        .then(function(response) {
            let data = response.json();
            return data;
        })
        .then(function(data) {
            user_location.lat = data.latitude;
            user_location.lon = data.longitude;
        })
        .then(function() {
            fill_place();
        });
}

// ##############################################################################################

/**
 * Get current, forecast hourly and daily weather.
 */
async function get_weather() {
    let api = `https://api.openweathermap.org/data/2.5/onecall?lat=${user_location.lat}&lon=${user_location.lon}&appid=${open_weather_key}&lang=fr&units=metric&exclude=minutely,alerts`;
    await fetch(api)
        .then(function(response) {
            let data = response.json();
            return data;
        })
        .then(function(data) {
            weather.current = data.current;
            weather.forecast_hourly = data.hourly;
            weather.daily = data.daily;
        })
        .then(function() {
            fill_weather();
        });
}

/**
 * Get previous hours weather.
 */
async function get_weather_hours() {
    let api = `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${user_location.lat}&lon=${user_location.lon}&dt=${dt}&appid=${open_weather_key}&lang=fr`;
    await fetch(api)
        .then(function(response) {
            data = response.json();
            return data;
        })
        .then(function(data) {
            weather.previous_hourly = data.hourly;
        })
        .then(function() {
            fill_hours_weather()
        });
}

// ##############################################################################################

/**
 * Fill user place in html with latitude and longitude.
 */
async function fill_place() {
    let api = `http://api.openweathermap.org/geo/1.0/reverse?lat=${user_location.lat}&lon=${user_location.lon}&limit=2&appid=${open_weather_key}`;
    await fetch(api)
        .then(function(response) {
            let data = response.json();
            return data;
        })
        .then(function(data) {
            user_location.city = data[0].name;
            user_location.country_code = data[0].country;
        })
        .then(function() {
            get_weather();
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
function fill_weather() {
    // 
    document.getElementById("place").innerHTML = `${user_location.city}, ${transform_country_code()}`;
    document.getElementById("weather-short-description").innerHTML = `${weather.current.weather[0].description}`;

    // set today weather icon
    var icon = document.getElementById("icon-weather");
    var dir_icon = `images/weather/${weather.current.weather[0].icon}.png`;
    icon.setAttribute("src", dir_icon);
    icon.setAttribute("width", "128");
    icon.setAttribute("height", "128");

    // set today weather temperature and feels like
    document.getElementById("temperature").innerHTML = `${Math.floor(weather.current.temp)}°C 
        / ${celsius_to_fahrenheit(Math.floor(weather.current.temp))}°F`;
    document.getElementById("feels-like").innerText = `Ressenti ${Math.floor(weather.current.feels_like)}°C`;

    // set icon and title website
    document.getElementById("website-icon").setAttribute("href", dir_icon);
    document.getElementById("website-title").innerHTML = `météo de ${user_location.city}`;

    // 
    document.getElementById("UV").innerHTML = `UV ${weather.current.uvi}`;
    document.getElementById("wind-speed").innerHTML = `vitesse du vent ${weather.current.wind_speed}m/s`;
    document.getElementById("humidity").innerHTML = `Humidité ${weather.current.humidity}%`;
    document.getElementById("clouds").innerHTML = `Nuage ${weather.current.clouds}%`;

    get_weather_hours();
}

/**
 * fill hours weather in html.
 */
function fill_hours_weather() {
    if (weather.current.weather[0].icon.includes("d")) {
        css_custom = "px-3 m-4 rounded my-light-white-bg";
    } else {
        css_custom = "px-3 m-4 rounded my-dark-white-bg";
    }

    var div_weather_hours = document.getElementById("weather-hour");
    div_weather_hours.innerHTML = '';

    // previous hour
    var i = 1;
    for (i; i < today.getHours; i += shift_hours) {
        var div_weather_hours_i = document.createElement("div");
        div_weather_hours_i.setAttribute("class", css_custom);

        // Write the hour
        var text_hour_i = document.createElement("div");
        if (i < 10) {
            text_hour_i.innerHTML = "0" + i + "H";
        } else {
            text_hour_i.innerHTML = i + "H";
        }

        // Write hour weather
        var balise_temp_previous_hour_i = document.createElement("div");
        var text_temp_previous_hour_i = Math.floor(weather.previous_hourly[i - 1].temp);
        balise_temp_previous_hour_i.innerHTML = `${text_temp_previous_hour_i}°C`;

        div_weather_hours_i.appendChild(text_hour_i);
        div_weather_hours_i.appendChild(balise_temp_previous_hour_i);

        div_weather_hours.appendChild(div_weather_hours_i);
    }

    // forecast hour
    var j = 1;
    for (i; i < 24; i += shift_hours) {
        var div_weather_hours_i = document.createElement("div");
        div_weather_hours_i.setAttribute("class", css_custom);

        // Write the hour
        var text_hour_i = document.createElement("div");
        if (i < 10) {
            text_hour_i.innerHTML = "0" + i + "H";
        } else {
            text_hour_i.innerHTML = i + "H";
        }

        // Write hour weather
        var balise_temp_forecast_hour_i = document.createElement("div");
        var text_temp_forecast_hour_i = Math.floor(weather.forecast_hourly[j].temp);
        balise_temp_forecast_hour_i.innerHTML = `${text_temp_forecast_hour_i}°C`;

        div_weather_hours_i.appendChild(text_hour_i);
        div_weather_hours_i.appendChild(balise_temp_forecast_hour_i);

        div_weather_hours.appendChild(div_weather_hours_i);

        j += shift_hours;
    }

    fill_week_weather();
}

/**
 * Fill weather week in html.
 */
function fill_week_weather() {
    var div_weather_week = document.getElementById("weather-week");
    div_weather_week.innerHTML = '';

    // create week days
    for (var i = 1; i < 7; i++) {
        var div_weather_week_i = document.createElement("div");
        div_weather_week_i.setAttribute("class", css_custom);

        // Write date
        var date_i = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);
        var date_i_transform = transform_date(date_i, 1);
        var text_date_i = document.createElement("div");
        text_date_i.innerHTML = date_i_transform;

        // Draw icon
        var weather_date_i = document.createElement("div");
        var weather_icon_date_i = document.createElement("img");
        var weather_dir_icon_date_i = `images/weather/${weather.daily[i].weather[0].icon}.png`;
        weather_icon_date_i.setAttribute("src", weather_dir_icon_date_i);
        weather_icon_date_i.setAttribute("width", "56");
        weather_icon_date_i.setAttribute("height", "56");

        weather_date_i.appendChild(weather_icon_date_i);

        // Write max and min temperature
        var temperature_day_i_max = document.createElement("div");
        temperature_day_i_max.innerHTML = `max : ${Math.floor(weather.daily[i].temp.max)}°C`;

        var temperature_day_i_min = document.createElement("div");
        temperature_day_i_min.innerHTML = `min : ${Math.floor(weather.daily[i].temp.min)}°C`;

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

    var weather_dir_img = `url(images/bg/${weather.current.weather[0].icon}.jpg)`;
    bg.style.backgroundImage = weather_dir_img;

    //
    var main_container = document.getElementById("main-container");
    if (weather.current.weather[0].icon.includes("n")) {
        main_container.classList.remove("my-black");
        main_container.classList.add("my-white");
    } else {
        main_container.classList.remove("my-white");
        main_container.classList.add("my-black");
    }
}

// ##############################################################################################

function main() {
    // start of function call list 
    get_location();

    //show_menu();
}

// ##############################################################################################

main();