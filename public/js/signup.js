const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector("#name-input-signup").value.trim();
    
    const email = document.querySelector("#email-input-signup").value.trim();
    
    const password = document
      .querySelector("#password-input-signup")
      .value.trim();
  
    if (name && email && password) {
      
        const response = await fetch("/api/user", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
        document.location.replace("/dashboard");
      } else {
        alert(response.statusText);
      }
    }
  };
  
  document
    .querySelector("#signup-form")
    .addEventListener("submit", signupFormHandler);