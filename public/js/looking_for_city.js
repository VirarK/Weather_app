async function looking_for_city() {
	var lat = null;
	var lon = null;
	var country = null
	var country_code = null

	var unknown = false

	var place = document.getElementById("input-name-city").value;
	var table_place = place.split(",");
		
	if (table_place.length == 2) {
		var city = table_place[0];
		while (city[city.length - 1] == " ") {
			city = city.slice(0,-1);
		}

		var country = table_place[1]
		while (country[0] == " ") {
			country = country.slice(1)
		}

		let api = `https://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&limit=1&appid=${open_weather_key}`;
		await fetch(api)
		.then(function(response) {
			let data = response.json();
			return data;
		})
		.then(function(data) {
			if (!data[0]) {
				unknown = true;
			} else {
				lat = data[0].lat;
				lon = data[0].lon;
				country_code = data[0].country;
				city = data[0].name

				if (country.toLocaleLowerCase() != transform_country(country_code).toLocaleLowerCase()) {
					unknown = true;
				}
			}
		})
		.then(function() {
			if (!unknown) {
				window.location = `/weather/${city}/${country_code}/${lat}/${lon}`;
			} else {
				alert(`${place} : Ville ou Pays inconnu`);
			}
		});
	}
	else {
		alert(`${place} : Format invalide`);
	}
}