const regex_email =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const regex_email2 = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

var is_login = false;

var log_btn = document.getElementById("log-btn");

if (log_btn != null) {
  if (!is_login) {
    var link_login = document.createElement("a");
    link_login.setAttribute("class", "btn btn-dark mx-2");
    link_login.setAttribute("href", "../html/login.html");
    link_login.innerHTML = "S'inscrire";
    log_btn.appendChild(link_login);
  } else {
    // TODO : a tester
    var link_login = document.createElement("a");
    link_login.setAttribute("class", "btn btn-dark mx-2 rounded-circle");
    link_login.setAttribute("href", "../html/account.html");
    // TODO : action avec la bd
    link_login.innerHTML = "??";
    log_btn.appendChild(link_login);
  }
}

/**
 *
 */
function get_login_data() {
  var email_address = document.getElementById("input-email").value;
  var password = document.getElementById("input-password").value;
  is_login = true;
  if (!email_address.match(regex_email2)) {
    alert("format mail incorrect");
    //console.log("erreur")
  } else {
    alert(`mail : ${email_address}, mot de passe : ${password}`);
  }
  // TODO : action avec la bd

  // TODO : redirection vers le site principale
}

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

function changeBg() {
  let date = new Date();
  let hours = date.getHours();
  let whatTime;
  let bg = document.body;
  let bg_day = "url(../../icons/bg-log.jpg)";
  let bg_night = "url(../../icons/night.jpg)";

  if (hours > 9 && hours < 18) {
    bg.style.backgroundImage = bg_day;
    bg.style.height = "100%";
    whatTime = "d";
  } else {
    bg.style.background = bg_night;
    bg.style.height = "100%";
    whatTime = "n";
  }
  return whatTime;
}

function changeColors() {
  if (changeBg() == "n") {
    console.log("night");
    let cn = document.getElementById("seConnecter");
    let rm = document.getElementById("rememberMe");
    let btn = document.getElementById("btn");
    let gif = document.getElementById("gif");

    cn.style.color = "white";
    rm.style.color = "white";
    btn.style.color = "white";
    gif.style.backgroundImage = "";
  } else if (changeBg() == "d") {
    console.log("day");
  }
}
changeColors();
