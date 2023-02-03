const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector("#email-input-login").value.trim();
 
 
  const password = document.querySelector("#password-input-login").value.trim();

  if (email && password) {
    const response = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed t login");
    }
  }
};

document
  .querySelector("#login-form")
  .addEventListener("submit", loginFormHandler);