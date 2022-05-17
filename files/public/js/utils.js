/**
 * 
 * @param {*} lang 
 * @param {*} country 
 * @returns 
 */
function transform_country(lang, country) {
    try {
        let region_names = new Intl.DisplayNames([lang], { type: "region" });
        return region_names.of(country);
    } catch (RangeError) {
        return country;
    }
}

/**
 * Convert celsius in fehrenheit.
 *
 * @param {Number} temperature .
 * @returns celsius.
 */
function celsius_to_fahrenheit(temperature) {
    return (temperature * 9) / 5 + 32;
}

function first_letter_cap(str){
    return (str.charAt(0).toUpperCase() + str.substr(1));
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

    let api = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=2&appid=${keys[num_key]}`;
    await fetch(api)
        .then(function(response) {
            let data = response.json();
            return data;
        })
        .then(function(data) {
            city = data[0].name;
            country = data[0].country;
        })
        .then(function() {
            window.location = `/weather/${city}/${country}/${lat}/${lon}`;
        });
}

// #######################################################################################

var image_input = document.querySelector("#image_input");
if (image_input) {
    image_input.addEventListener("change", function() {
        console.log(this.files);
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            localStorage.setItem("recent-image", reader.result);
        });

        reader.readAsDataURL(this.files[0]);
        alert("Rafraîchir la page pour mettre à jour la photo de profil !");
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const recentImageUrl = localStorage.getItem("recent-image");
    if (recentImageUrl) {
        var uploaded_image = document.getElementById("uploadedImage");
        if (uploaded_image) uploaded_image.setAttribute("src", recentImageUrl);
    }
});

function deleteStoredImages() {
    localStorage.clear();
}