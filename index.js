function generatePassword() {
    let length = parseInt(
        document.getElementById("passwordLength").value
    );
    const includeNumbers =
        document.getElementById("includeNumbers").checked;
    const includeLowercase =
        document.getElementById("includeLowercase").checked;
    const includeUppercase =
        document.getElementById("includeUppercase").checked;
    const includeSymbols =
        document.getElementById("includeSymbols").checked;
    const beginWithLetter = false;
    const noSimilarChars = false;
    const noDuplicateChars = false;
    const noSequentialChars = false;
    let charset = "";
    let defaultValue = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%";
    if (includeNumbers) charset += "0123456789";
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeSymbols) charset += "!@#$%^&*()-_=+{}[]|;:',.<>?";

    let password = "";
    if (beginWithLetter) {
        password += getRandomChar(
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
        );
        length--;
    }
    charset = charset.length ? charset : defaultValue;
    for (let i = 0; i < length; i++) {
        let char = getRandomChar(charset);
        if (noSimilarChars && isSimilar(char)) {
            i--; // If similar character found, generate another one
            continue;
        }
        if (noDuplicateChars && password.includes(char)) {
            i--; // If duplicate character found, generate another one
            continue;
        }
        if (
            noSequentialChars &&
            isSequential(char, password.charAt(password.length - 1))
        ) {
            i--; // If sequential character found, generate another one
            continue;
        }
        password += char;
    }

    document.getElementById("generatedPassword").value = password;
}

function getRandomChar(charset) {
    return charset.charAt(Math.floor(Math.random() * charset.length));
}

function isSimilar(char) {
    const similarChars = /[il1Lo0]/;
    return similarChars.test(char);
}

function isSequential(char, prevChar) {
    const sequentialChars =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const charIndex = sequentialChars.indexOf(char);
    const prevCharIndex = sequentialChars.indexOf(prevChar);
    return Math.abs(charIndex - prevCharIndex) === 1;
}
document
    .getElementById("generatePassword")
    .addEventListener("click", function () {
        generatePassword();
    });

document
    .getElementById("copyPassword")
    .addEventListener("click", function () {
        var generatedPassword = document.getElementById("generatedPassword");
        generatedPassword.select();
        document.execCommand("copy");
        showNotification("Copied to clipboard!");

    });
function showNotification(message) {
    var notification = document.createElement("div");
    notification.className = "alert alert-success fixed-top mt-0";
    notification.role = "alert";
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(function () {
        notification.style.opacity = "0";
        setTimeout(function () {
            notification.remove();
        }, 1000);
    }, 3000);
}
generatePassword();