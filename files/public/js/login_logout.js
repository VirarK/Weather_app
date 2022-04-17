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

