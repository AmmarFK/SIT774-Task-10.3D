function validate() {
    const modal = document.getElementById("feedbackModal");
    // Get form input values
    const name = document.getElementById("name").value.trim();
    const feedback = document.getElementById("feedback").value.trim();
    const rating = document.getElementById("rating").value.trim();
  
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
    if (feedback === "") {
        document.getElementById("feedback-invalid-feedback").innerHTML = "Please provide your feedback!";
        document.getElementById("feedback-invalid-feedback").classList.add("text-danger");
      } else {
        document.getElementById("feedback-invalid-feedback").classList.remove("text-danger");
        document.getElementById("feedback-invalid-feedback").classList.add("text-success");
        document.getElementById("feedback-invalid-feedback").innerHTML = "Valid";
        
      }

      // Validate rating input
      if (rating === "0") {
        document.getElementById("rating-invalid-feedback").innerHTML = "Please select rating!";
        document.getElementById("rating-invalid-feedback").classList.add("text-danger");
      } else {
        document.getElementById("rating-invalid-feedback").classList.remove("text-danger");
        document.getElementById("rating-invalid-feedback").classList.add("text-success");
        document.getElementById("rating-invalid-feedback").innerHTML = "Valid";     
      }
      modal.classList.remove('show');
  }  
  
  