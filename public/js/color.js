/**
 * 
 */
 function change_colors() {
  let dot1 = document.getElementById("dot1")
  let dot2 = document.getElementById("dot2")

	if (change_bg() == "n") {
    let cnx = document.getElementById("cnx");
		let rs = document.getElementById("rs");
		let gif = document.getElementById("gif");
		let cn = document.getElementById("seConnecter");
		let sc = document.getElementById("sInscrire");

		let hour = document.getElementById("hour");
		let min = document.getElementById("minute");
		let sec = document.getElementById("second");

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
    if (sc) {
      sc.style.color = "white";
    }
    if (hour) {
      hour.style.color = "white";
    }
    if (min) {
      min.style.color = "white";
    }
    if (sec) {
      sec.style.color = "white";
    }
    if(dot1) {
      dot1.classList.add("my-white");
    }
    if(dot2) {
      dot2.classList.add("my-white");
    }
  } else {
    if(dot1) {
      dot1.classList.remove("my-white");
    }
    if(dot2) {
      dot2.classList.remove("my-white");
    }
  }
  
  updateTime();
  setInterval(updateTime, 100);
}

/**
 * 
 * @returns 
 */
function change_bg() {
	if(document.body) {
		let date = new Date(Date.now());
		let hours = date.getHours();
		let bg = document.body.style;
		bg.height = "100%";

		if (hours >= 9 && hours <= 21) {
      console.log("day");
			bg.backgroundImage = "url(/images/bg-log.jpg)";
      return "d";
		} else {
      console.log("night");
			bg.backgroundImage = "url(/images/night.jpg)";
			return "n";
		}
	}
}

change_colors();