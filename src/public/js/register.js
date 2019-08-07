const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", event => {
  event.preventDefault();
  const name = document.querySelector("#user_name").value;
  const username = document.querySelector("#user_username").value;
  const email = document.querySelector("#user_mail").value;
  const password = document.querySelector("#user_password").value;

  const userDetails = { name, username, email, password };
  const registerOptions = createOptions(userDetails);
  registerUser(registerOptions);
});

async function registerUser(options) {
  const response = await fetch(
    "http://94.231.110.64:3000/api/user/register",
    options
  );
  const data = await response.json();

  const status = document.querySelector("#register-status");
  status.innerHTML = data.msg;

  const linkDiv = document.querySelector("#link-login-page");

  const linkToLogin = document.createElement("a");
  linkToLogin.href = "login.html"; // Insted of calling setAttribute
  linkToLogin.innerHTML = "Go to login page"; // <a>INNER_TEXT</a>
  linkToLogin.classList = "font-dark";
  if (data.code === 200) {
    status.classList = "teal lighten-2 text-box card-panel text-white";

    const submitBtn = document.querySelector("#submit-button-container");
    submitBtn.style.display = "none";
    linkDiv.appendChild(linkToLogin);
    linkDiv.classList = "waves-effect waves-light btn btn-wide";
  } else {
    status.classList = "red lighten-2 text-box card-panel";
  }
}

//Managing post options
function createOptions(data) {
  const options = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };
  return options;
}
