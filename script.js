function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form-message");

    messageElement.textContent = message;
    messageElement.classList.remove("form-message-success", "form-message-error");
    messageElement.classList.add(`form-message-${type}`);
}

//Funktion wird definiert wenn ein input error angezeigt werden sollte

function setInputError(inputElement, message) {
    inputElement.classList.add("form-input-error");
    inputElement.parentElement.querySelector(".form-input-error-message").textContent = message;
}

//Funktion wird definiert wenn der Inout stimmt und keine Error-Message mehr angezeigt werden sollte

function clearInputError(inputElement) {
    inputElement.classList.remove("form-input-error");
    inputElement.parentElement.querySelector(".form-input-error-message").textContent = "";
}



document.addEventListener("DOMContentLoaded", () => {

    //Konstanten der Login-/createAccount Form werden mit hilfe der ID'S: "login" und "createAccount" erstellt

    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");

    //Clickt der User auf das Element mit der ID:linkCreateAccount wird die class "form-hidden" bei der zuvor definierten Konstante
    //von createAccount entfernt und bei LoginForm hinzugefügt
    //Dies bewirkt das nun die create-Account-Form und nicht mer die Login-Form angezeigt wird

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form-hidden");
        createAccountForm.classList.remove("form-hidden");
    });

    //hier passiert genau das gleiche nur in die andere Richtung

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form-hidden");
        createAccountForm.classList.add("form-hidden");
    });





    document.querySelector("#createAccount").addEventListener("submit", event => {
        event.preventDefault();

        //Konstanten der Inputs werden mit hilfe von ID's erstellt

        const signupUsername = document.querySelector("#signupUsername");
        const signupEmail = document.querySelector("#signupEmail");
        const signupPassword = document.querySelector("#signup-password");
        const signupPasswordConf = document.querySelector("#signuppasswordconf");

        //verschiedene RegEx (regular Expressions) werden erstellt - diese wurden von der Seite "https://ihateregex.io/" entnommen

        const regex1 = /^[a-zA-Z0-9_-]{3,15}$/;
        const regex2 = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const regex3 = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

        //Es werden Variablen erstellt um festzustellen ob der Input valid ist

        let usernameValid = true;
        let emailValid = true;
        let passwordValid = true;
        let passwordConfValid = true;

        //Die einzelnen Values Inputs werden mit den RegEx verglichen, falls sie nicht mit der Regex übereinstimmen,
        //wird eine error message ausgespielt und sie gelten als false

        if (!regex1.test(signupUsername.value)) {
            setInputError(signupUsername, "Benutzername muess zwüsched 3-15 Zeiche ha und derf nur us chlibuechstabe bestah!");
            usernameValid = false;
        } else {
            clearInputError(signupUsername);
        }

        if (!regex2.test(signupEmail.value)) {
            setInputError(signupEmail, "Email muess us eme Name, eme @, enere Domain und eme Suffix bestah!");
            emailValid = false;
        } else {
            clearInputError(signupEmail);
        }

        if (!regex3.test(signupPassword.value)) {
            setInputError(signupPassword, "Passwort muess en Chli- und en Grossbuechstabe, eh Zahl und es Spezialzeiche beinhalte und derf nöd chürzer als 8 Zeiche sie!");
            passwordValid = false;
        } else {
            clearInputError(signupPassword);
        }

        if (signupPassword.value !== signupPasswordConf.value) {
            setInputError(signupPasswordConf, "Passwörter sind nöd identisch!");
            passwordConfValid = false;
        } else {
            clearInputError(signupPasswordConf);
        }

        // sind alle Variablen Ture wird mit der class "form-hidden" die createAccount form versteckt und die LoginForm aufgerufen
        // Ausserdem wird eine Konstante definiert welche die vom User eingegebenen Inputs beinhalten

        if (usernameValid && emailValid && passwordValid && passwordConfValid) {
            loginForm.classList.remove("form-hidden");
            createAccountForm.classList.add("form-hidden");
            const accountData = {
                "username": signupUsername.value,
                "email": signupEmail.value,
                "password": signupPassword.value
            };

            //mithilfe der eben definierten Konstante werden die Daten werden  in eine JSON-formatierte Zeichenkette konvertiert

            accountDataJson = JSON.stringify(accountData);
            setFormMessage(createAccountForm, "success", "Profil isch erfolgrich erstellt worde.");
        }
    });

    loginForm.addEventListener("submit", e => {
        e.preventDefault();

        //Konstanten werden erstellt welche die Values von Username und Passwort beinhalten
        //Ebenfalls werden die Daten im Json mit der parse funktion gelesen und extrahiert, auch dies
        //wird in einer Konstante zusammengefasst

        const enteredUsername = document.querySelector("#username").value;
        const enteredPassword = document.querySelector("#password").value;

        const accountData = JSON.parse(accountDataJson);

        //die Daten aus dem Json werden mit der Eingabe des Users verglichen
        //Bei übereinstimmung wird die success message angezeigt und der User wird auf die Captcha Seite weitergeleitet
        //Bei keiner übereinstimmung wird die error message angezeigt, nichts weiteres passiert

        if (enteredUsername === accountData.username && enteredPassword === accountData.password) {
            setFormMessage(loginForm, "success", "erfolgrich igloggt");
            window.location = "captcha.html";
        } else {
            setFormMessage(loginForm, "error", "Benutzername oder Passwort isch falsch.");
        }
    });

    //Bei submitten in der Captcha Seit wird man auf die  success-Seite weitergeleitet

    function submitForm() {
        location.href = "success.html";
        return true;
    }
});

