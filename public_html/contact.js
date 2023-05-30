function validate() {
  // Get form input values
  const name = document.getElementById("name").value.trim();
  const message = document.getElementById("message").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();

  // Validate name input
  if (name === "") {
    document.getElementById("name-invalid-feedback").innerHTML = "Provide your name!";
    document.getElementById("name-invalid-feedback").classList.add("text-danger");
  } else {
    document.getElementById("name-invalid-feedback").classList.remove("text-danger");
    document.getElementById("name-invalid-feedback").classList.add("text-success");
    document.getElementById("name-invalid-feedback").innerHTML = "Valid";

  }

  // Validate feedback input
  if (message === "") {
    document.getElementById("feedback-invalid-feedback").innerHTML = "Please enter your message!";
    document.getElementById("feedback-invalid-feedback").classList.add("text-danger");
  } else {
    document.getElementById("feedback-invalid-feedback").classList.remove("text-danger");
    document.getElementById("feedback-invalid-feedback").classList.add("text-success");
    document.getElementById("feedback-invalid-feedback").innerHTML = "Valid";

  }

  // Validate email input
  if (!email.includes("@")) {
    document.getElementById("email-invalid-feedback").innerHTML = "Invalid e-mail";
    document.getElementById("email-invalid-feedback").classList.add("text-danger");
  } else {
    document.getElementById("email-invalid-feedback").classList.remove("text-danger");
    document.getElementById("email-invalid-feedback").classList.add("text-success");
    document.getElementById("email-invalid-feedback").innerHTML = "Valid";
  }

  // Validate phone input
  // if (!/^\d{10}$/.test(phone)) {
  //   if (/\D/.test(phone)) {
  //     document.getElementById("phone-invalid-feedback").innerHTML = `Contains character '${phone.match(/\D/)}', numbers only!`;
  //   } else {
  //     document.getElementById("phone-invalid-feedback").innerHTML = "Must be of exactly 10 digits in length";
  //   }
  //   document.getElementById("phone-invalid-feedback").classList.add("text-danger");
  // } else {
  //   document.getElementById("phone-invalid-feedback").classList.remove("text-danger");
  //   document.getElementById("phone-invalid-feedback").innerHTML = "Valid";
  //   document.getElementById("phone-invalid-feedback").classList.add("text-success");
  // }

  if (name != "" && email.includes("@") && message != "") {
    // && /^\d{10}$/.test(phone) && !/\D/.test(phone)
    return true;
  }
  else {
    return false
  }
}

function displaymessage() {
  var result = validate();
  if (result) {

    Swal.fire({
      title: 'Message Sent!',
      text: 'We tent to respond within 2-3 business days',
      icon: 'success'
    });

    //document.getElementById("contact-form").reset();
  }
}