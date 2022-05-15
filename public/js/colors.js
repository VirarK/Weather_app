/* sidePanel functions */
/*show sidePanel of width 325*/
function open_nav() {
	document.getElementById("sidePanel").style.width = "330px";
}

/* hide sidePanel width 0 */
function close_nav() {
	document.getElementById("sidePanel").style.width = "0";
}

/*change login.hbs bg*/
function change_bg() {
	if(document.body) {
		let date = new Date();
		let hours = date.getHours();
		let whatTime;
		let bg = document.body.style;
		let bg_day = "url(../images/bg-log.jpg)";
		let bg_night = "url(../images/night.jpg)";
	
		if (hours > 9 && hours < 18) {
			bg.backgroundImage = bg_day;
			bg.height = "100%";
			whatTime = "d";
		} else {
			bg.backgroundImage = bg_night;
			bg.height = "100%";
			whatTime = "n";
		}
		return whatTime;
	}
}

/*change login.hbs colors*/
function change_colors() {
	if (change_bg() == "n") {
		let cn = document.getElementById("seConnecter");
		let cnx = document.getElementById("cnx");
		let rs = document.getElementById("rs");
		let gif = document.getElementById("gif");
		let time = document.getElementById("time");
		let sc = document.getElementById("sInscrire");

		if (cn) {
			cn.style.color = "white";
		}
		if (cnx) {
			cnx.style.color = "white";
		}
		if (rs) {
			rs.style.color = "white";
		}
		if (gif) {
			gif.style.backgroundImage = "";
		}
		if (time) {
			time.style.color = "white";
		}
		if (sc) {
			sc.style.color = "white";
		}
	}
}

change_colors();