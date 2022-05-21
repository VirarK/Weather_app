async function looking_for_city(city, countrycode) {
    var lat = null;
    var lon = null;

    var unknown = false

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