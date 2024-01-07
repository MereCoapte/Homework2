function validateForm(){
    
    document.getElementById('emailError').innerText = '';
    document.getElementById('passwordError').innerText = '';
    document.getElementById('confirmPasswordError').innerText = '';

    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmPassword').value;

    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)){
        document.getElementById("emailError").innerHTML = "Introduceti o adresa de e-mail valida !";
        return false;
    }

    let passwordRegex = /^(?!.*\s).*$/;
    if (password.length < 8){
        document.getElementById("passwordError").innerHTML = "Parola trebuie sa contina cel putin 8 caractere !";
        return false;
    }
    else if (!passwordRegex.test(password)){
        document.getElementById("passwordError").innerHTML = "Parola trebuie sa nu contina spatii ca si caractere !";
        return false;
    }

    if (password != confirmPassword){
        document.getElementById("confirmPasswordError").innerHTML = "Parola nu corespunde !";
        return false;
    }

    showSuccessMessage();
    event.preventDefault();
    return true;
}

function showSuccessMessage(){
    let successMessage = document.getElementById("successMessage");
    successMessage.style.display = "block";

    setTimeout(function() {successMessage.style.display = "none";}, 3000);

}