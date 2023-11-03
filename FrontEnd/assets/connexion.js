const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;
  const data = {
    email: email,
    password: password,
  };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch("http://localhost:5678/api/users/login", options).then((response) =>
    response
      .json()
      .then((result) => {
        if (result.token) {
          localStorage.setItem("token", result.token);

          console.log("Token stocké avec succès !");
          localStorage.setItem("isAuthenticated", "true");
          window.location.href = "index.html";
        } else {
          alert("Identifiant ou mot de passe incorrect.");
        }
      })
      .catch((error) => {
        console.error("Une erreur s'est produite :", error);
      })
  );
});
