 
function validate() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const cnfrmpassword = document.getElementById("confirm-password").value.trim();
        
    // Validate name input
    if (name === "") {
        document.getElementById("name-invalid-feedback").innerHTML = "Enter your name!";
        document.getElementById("name-invalid-feedback").classList.add("text-danger");
    } else {
        document.getElementById("name-invalid-feedback").classList.remove("text-danger");
        document.getElementById("name-invalid-feedback").classList.add("text-success");
        document.getElementById("name-invalid-feedback").innerHTML = "Valid";
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
    
    // Validate password input
    const regex = /\d/;
    if (password === "") {
        document.getElementById("password-invalid-feedback").innerHTML = "Please provide a password!";
        document.getElementById("password-invalid-feedback").classList.add("text-danger");
        } 
    else if(!regex.test(password) || password.length < 8){
        document.getElementById("password-invalid-feedback").innerHTML = "Password should be at least 8 characters long and should include a number!";
        document.getElementById("password-invalid-feedback").classList.add("text-danger");  
        }
    else {
        document.getElementById("password-invalid-feedback").classList.remove("text-danger");
        document.getElementById("password-invalid-feedback").classList.add("text-success");
        document.getElementById("password-invalid-feedback").innerHTML = "Valid";      
    }

    //check if confirm password matches passwrod
    if(cnfrmpassword!=password || cnfrmpassword === ""){
        document.getElementById("cnfrm-password-invalid-feedback").innerHTML = "Passwords do not match!";
        document.getElementById("cnfrm-password-invalid-feedback").classList.add("text-danger");  
    }else{
        document.getElementById("cnfrm-password-invalid-feedback").classList.remove("text-danger");
        document.getElementById("cnfrm-password-invalid-feedback").classList.add("text-success");
        document.getElementById("cnfrm-password-invalid-feedback").innerHTML = "Valid";   
    }
    if(name != "" && email.includes("@") && password != "" && regex.test(password) && password.length >= 8 && cnfrmpassword == password && cnfrmpassword != "")
    {
        return true;
    }
    else
    {
        return false;
    }
}      

function signup()
{
    //var result = validate();
    var result = true;
    if(result)
    {
        Swal.fire({
            title: 'You are now registered!',
            text: 'Login to access your account',
            icon: 'success',
            confirmButtonText: 'OK'
            });
        //document.getElementById("signup-form").reset();
    } 
}
 
