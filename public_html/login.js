function validate() {
  // Get form input values
  const name = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  // Validate name input
  if (name === "") {
    document.getElementById("name-invalid-feedback").innerHTML = "Provide a username!";
    document.getElementById("name-invalid-feedback").classList.add("text-danger");
  } else {
    document.getElementById("name-invalid-feedback").classList.remove("text-danger");
    document.getElementById("name-invalid-feedback").classList.add("text-success");
    document.getElementById("name-invalid-feedback").innerHTML = "Valid";

  }

  // Validate password input
  if (password === "") {
    document.getElementById("password-invalid-feedback").innerHTML = "Incorrect password!";
    document.getElementById("password-invalid-feedback").classList.add("text-danger");
  } else {
    document.getElementById("password-invalid-feedback").classList.remove("text-danger");
    document.getElementById("password-invalid-feedback").classList.add("text-success");
    document.getElementById("password-invalid-feedback").innerHTML = "Valid";

  }
}  