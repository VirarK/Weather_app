var is_login = false

var log_btn = document.getElementById("log-btn");

if (log_btn != null) {
	if (!is_login) {
		var link_login = document.createElement("a");
		link_login.setAttribute("class", "btn btn-dark mx-2");
		link_login.setAttribute("href", "../html/login.html");
		link_login.innerHTML = "Se connecter";
		log_btn.appendChild(link_login);
	}
	else {
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
	alert(`${email_address}, ${password}`);
	// TODO : action avec la bd
	// TODO : redirection vers le site principale
}