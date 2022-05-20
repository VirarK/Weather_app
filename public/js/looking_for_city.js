async function looking_for_city(city, countrycode) {
    var lat = null;
    var lon = null;

    var country = null;
    // var country_code = null;

    var unknown = false

    // var place = document.getElementById("input-name-city").value;
    // var table_place = place.split(",");


    // var city = place.name;
    // var country = place.address_components[3].long_name;
    // if (table_place.length == 2) {
    // 	var city = table_place[0];
    // 	while (city[city.length - 1] == " ") {
    // 		city = city.slice(0,-1);
    // 	}

    // 	var country = table_place[1]
    // 	while (country[0] == " ") {
    // 		country = country.slice(1)
    // 	}

    let api = `https://api.openweathermap.org/geo/1.0/direct?q=${city},${countrycode}&limit=1&appid=${keys[num_key]}`;
    await fetch(api)
        .then(function(response) {
            let data = response.json();
            return data;
        })
        .then(function(data) {
            if (!data[0]) {
                unknown = true;
            } else if (data[0].lat && data[0].lon) {
                lat = data[0].lat;
                lon = data[0].lon;
            } else {
                unknown = true;
            }
        })
        .then(function() {
            if (!unknown) {
                window.location = `/weather/${city}/${countrycode}/${lat}/${lon}`;
            } else {
                alert(`${place} : Ville ou Pays inconnu`);
            }
        });
}
// } else {
//     alert(`${place} : Format invalide`);
// }
// }