const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", event => {
  event.preventDefault();
  const email = document.querySelector("#user_mail").value;
  const password = document.querySelector("#user_password").value;

  const userDetails = { email, password };
  const loginOptions = createOptions(userDetails);
  loginUser(loginOptions);
});

async function loginUser(options) {
  const response = await fetch(
    "http://94.231.110.64:3000/api/user/login",
    options
  );
  const data = await response.json();

  const status = document.querySelector("#login-status");
  status.innerHTML = data.msg;

  if (data.code === 200) {
    status.classList = "teal lighten-2 text-box card-panel text-white";
    localStorage.setItem("auth-token", data.token);
    window.open("/index.html", "_self");
  } else {
    status.classList = "red lighten-2 text-box card-panel";
  }
}

//Managing post options
function createOptions(data) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };
  return options;
}
