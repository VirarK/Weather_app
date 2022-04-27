/**
 *
 */
/* sidePanel functions */
/*show sidePanel of width 325*/
function openNav() {
    document.getElementById("sidePanel").style.width = "330px";
}

/* hide sidePanel width 0 */
function closeNav() {
    document.getElementById("sidePanel").style.width = "0";
}

/* Clock */

setInterval(() => {
    const time = document.querySelector("#time");
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let day_night = "AM";
    if (hours > 12) day_night = "PM";

    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;

    time.textContent = hours + ":" + minutes + ":" + seconds + " " + day_night;
});

/*change login.hbs bg*/
function changeBg() {
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

/*change login.hbs colors*/
function changeColors() {
    if (changeBg() == "n") {
        console.log("night");
        let cn = document.getElementById("seConnecter");
        let cnx = document.getElementById("cnx");
        let rs = document.getElementById("rs");
        let gif = document.getElementById("gif");
        let time = document.getElementById("time");

        cn.style.color = "white";
        cnx.style.color = "white";
        rs.style.color = "white";
        gif.style.backgroundImage = "";
        time.style.color = "white";
    } else if (changeBg() == "d") {
        console.log("day");
    }
}
changeColors();