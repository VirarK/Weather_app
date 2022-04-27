/**
 * 
 */

var country_code = null

async function found_city() {
    var place = document.getElementById("input-name-city").value;
    var table_place = place.split(",");
    
    if (table_place.length == 2) {
        var city = table_place[0];
        var country = table_place[1]
        country = country.slice(1)

        let api = `https://restcountries.com/v3.1/name/${country}`
        await fetch(api)
            .then(function(response) {
                if(response.status == 404) {
                    alert(`Ville ou Pays inconnu`);
                    country_code = -1
                }
                else {
                    let data = response.json();
                    return data;
                }
            })
            .then(function(data) {
                if(country_code != -1) {
                    country_code = data[0].cca2
                }
            })

        if(country_code != -1) {
            console.log("here")
            let api = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${country_code}&limit=1&appid=${open_weather_key}`;
            await fetch(api)
                .then(function(response) {
                    let data = response.json();
                    return data;
                })
                .then(function(data) {
                    console.log("here 2")
                    city_found.lat = data[0].lat;
                    city_found.lon = data[0].lon;
                    console.log(city_found)
                })
                .then(function() {
                    fill_place();
                });
        }
    }
    else {
        alert(`${place} : Format invalide`);
    }
}