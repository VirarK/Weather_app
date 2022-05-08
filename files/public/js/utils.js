/**
 * Return corresponding french day.
 *
 * @param {String} day english day.
 * @returns french day.
 */
 function transform_day(day) {
	const map_day_en_to_fr = {
		Mon: "Lundi",
		Tue: "Mardi",
		Wed: "Mercredi",
		Thu: "Jeudi",
		Fri: "Vendredi",
		Sat: "Samedi",
		Sun: "Dimanche",
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
		Mon: "Lun",
		Tue: "Mar",
		Wed: "Mer",
		Thu: "Jeu",
		Fri: "Ven",
		Sat: "Sam",
		Sun: "Dim",
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
	Jan: "Janvier",
	Feb: "Fevrier",
	Mar: "Mars",
	Apr: "Avril",
	May: "Mai",
	Jun: "Juin",
	Jul: "Juillet",
	Aug: "Aout",
	Sep: "Septembre",
	Oct: "Octobre",
	Nov: "Novembre",
	Dec: "Decembre",
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
		return (
		transform_day(table_date_str[0]) +
		" " +
		table_date_str[2] +
		" " +
		transform_month(table_date_str[1])
		);
	} else if (mode == 1) {
		return transform_day_low(table_date_str[0]) + " " + table_date_str[2];
	}
}

/**
 * Return country code corresponding to country name.
 *
 * @param {String} country the country code (FR, EN, ...).
 * @returns the country full name (France, ...).
 */
function transform_country(country) {
	try {
		let region_names = new Intl.DisplayNames(["en"], { type: "region" });
		return region_names.of(country);
	} catch(RangeError) {
		return country;
	}
}

// ##############################################################################################

/**
 * Convert celsius in fehrenheit.
 *
 * @param {Number} temperature .
 * @returns celsius.
 */
function celsius_to_fahrenheit(temperature) {
	return (temperature * 9) / 5 + 32;
}

// ##############################################################################################

/**
 * Get user location with navigator.
 */
function get_location() {
	if ("geolocation" in navigator) {
		navigator.geolocation.getCurrentPosition(set_position);
	}
}

async function set_position(geolocation) {
	lat = geolocation.coords.latitude;
	lon = geolocation.coords.longitude;
  
	let api = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=2&appid=${process.env.OPEN_WEATHER_KEY}`;
	await fetch(api)
	.then(function (response) {
		let data = response.json();
		return data;
	})
	.then(function (data) {
		city = data[0].name
		country = data[0].country
	})
	.then(function () {
		window.location = `/weather/${city}/${country}/${lat}/${lon}`;
	});
}