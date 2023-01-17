let accountDataJson = "";

function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form-message");

    messageElement.textContent = message;
    messageElement.classList.remove("form-message-success", "form-message-error");
    messageElement.classList.add(`form-message-${type}`);
}

function setInputError(inputElement, message) {
    inputElement.classList.add("form-input-error");
    inputElement.parentElement.querySelector(".form-input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form-input-error");
    inputElement.parentElement.querySelector(".form-input-error-message").textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form-hidden");
        createAccountForm.classList.remove("form-hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form-hidden");
        createAccountForm.classList.add("form-hidden");
    });

    loginForm.addEventListener("submit", e => {
        e.preventDefault();
        const enteredUsername = document.querySelector("#username").value;
        const enteredPassword = document.querySelector("#password").value;

        // parse the JSON data from accountDataJson
        const accountData = JSON.parse(accountDataJson);

        if (enteredUsername === accountData.username && enteredPassword === accountData.password) {
            setFormMessage(loginForm, "success", "Logged in Successfully");
            window.location = "captcha.html";
        } else {
            setFormMessage(loginForm, "error", "Incorrect username or password. Please try again.");
        }
    });
    document.querySelector("#createAccount").addEventListener("submit", event => {
        event.preventDefault();

        const signupUsername = document.querySelector("#signupUsername");
        const signupEmail = document.querySelector("#signupEmail");
        const signupPassword = document.querySelector("#signup-password");
        const signupPasswordConf = document.querySelector("#signuppasswordconf");
        const regex1 = /^[a-zA-Z0-9_-]{3,15}$/;
        const regex2 = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const regex3 = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
        let usernameValid = true;
        let emailValid = true;
        let passwordValid = true;
        let passwordConfValid = true;

        if (!regex1.test(signupUsername.value)) {
            setInputError(signupUsername, "Invalid username. It should contain 3-15 alphanumeric characters, underscores and/or hyphens.");
            usernameValid = false;
        } else {
            clearInputError(signupUsername);
        }

        if (!regex2.test(signupEmail.value)) {
            setInputError(signupEmail, "Invalid email address.");
            emailValid = false;
        } else {
            clearInputError(signupEmail);
        }

        if (!regex3.test(signupPassword.value)) {
            setInputError(signupPassword, "Invalid password. It should contain at least one uppercase letter, one lowercase letter, one number and one special character and be at least 8 characters long.");
            passwordValid = false;
        } else {
            clearInputError(signupPassword);
        }

        if (signupPassword.value !== signupPasswordConf.value) {
            setInputError(signupPasswordConf, "Passwords do not match.");
            passwordConfValid = false;
        } else {
            clearInputError(signupPasswordConf);
        }

        if (usernameValid && emailValid && passwordValid && passwordConfValid) {
            loginForm.classList.remove("form-hidden");
            createAccountForm.classList.add("form-hidden");
            const accountData = {
                "username": signupUsername.value,
                "email": signupEmail.value,
                "password": signupPassword.value
            };
            accountDataJson = JSON.stringify(accountData);
            setFormMessage(createAccountForm, "success", "Account created successfully");
        }
    });
    function submitForm() {
        grecaptcha.ready(function() {
            grecaptcha.execute('6LczKgAkAAAAAOi6dugV0lsqZckb1wg4TamxDZ3-', {action: 'homepage'}).then(function(token) {
                if(token.length > 0) {
                    return true;
                }else{
                    return false;
                }
            });
        });
    }
});


