/**
 * 
 */

async function found_city() {
    var place = document.getElementById("input-name-city").value;
    var table_place = place.split(" ");
    if (table_place.length == 2) {
        var city = table_place[0];
        //console.log("🚀 ~ file: found_city.js ~ line 9 ~ found_city ~ city", city)
        var country_code = table_place[1];
        //console.log("🚀 ~ file: found_city.js ~ line 11 ~ found_city ~ country_code", country_code)
        let api = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${country_code}&limit=1&appid=${open_weather_key}`;
        await fetch(api)
            .then(function(response) {
                let data = response.json();
                return data;
            })
            .then(function(data) {
                user_location.lat = data[0].lat;
                //console.log("🚀 ~ file: found_city.js ~ line 20 ~ user_location.lat", user_location.lat)
                user_location.lon = data[0].lon;
                //console.log("🚀 ~ file: found_city.js ~ line 22 ~ user_location.lon", user_location.lon)
            })
            .then(function() {
                fill_place();
            });
    } else {
        alert(`${place} : Format invalide`);
    }
}