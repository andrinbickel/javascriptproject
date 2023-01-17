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
    document.querySelectorAll(".form-input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 3) {
                setInputError(inputElement, "Username must be at least 3 characters in length");
            }
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });

    document.querySelector("#createAccount").addEventListener("submit", event => {
        event.preventDefault();

        const signupUsername = document.querySelector("#signupUsername").value;
        const signupEmail = document.querySelector("#signupEmail").value;
        const signupPassword = document.querySelector("#signup-password").value;
        const signupPasswordConf = document.querySelector("#signuppasswordconf").value;
        const regex1 = /^[a-z0-9_-]{3,15}$/;
        const regex2 = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
        const regex3 = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

        if (regex1.test(signupUsername) && regex2.test(signupEmail) && regex3.test(signupPassword) && signupPassword === signupPasswordConf) {
            loginForm.classList.remove("form-hidden");
            createAccountForm.classList.add("form-hidden");
            const accountData = {
                "username": signupUsername,
                "email": signupEmail,
                "password": signupPassword
            };
            accountDataJson = JSON.stringify(accountData);
            setFormMessage(createAccountForm, "success", "Account created successfully");
        } else {
            setFormMessage(createAccountForm, "error", "Invalid Input");
        }
    });});