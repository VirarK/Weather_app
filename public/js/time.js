function updateTime() {
	var now = new Date(Date.now());
	var hour = now.getHours();
	var min = now.getMinutes();
	var sec = now.getSeconds();
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

setInterval(updateTime, 100)