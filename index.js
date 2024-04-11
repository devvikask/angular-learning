
document
    .getElementById("generatePassword")
    .addEventListener("click", function () {
        // JavaScript logic for generating password based on user selections
        // Update the generated password display accordingly
        function generatePassword() {
            const length = parseInt(
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
            const beginWithLetter =
                document.getElementById("beginWithLetter").checked;
            const noSimilarChars =
                document.getElementById("noSimilarChars").checked;
            const noDuplicateChars =
                document.getElementById("noDuplicateChars").checked;
            const noSequentialChars =
                document.getElementById("noSequentialChars").checked;

            let charset = "";
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
            .addEventListener("click", generatePassword);
    });

document
    .getElementById("copyPassword")
    .addEventListener("click", function () {
        var generatedPassword = document.getElementById("generatedPassword");
        generatedPassword.select();
        document.execCommand("copy");
        showNotification("Password copied to clipboard!");

    });
function showNotification(message) {
    // Create a notification element
    var notification = document.createElement("div");
    notification.className = "alert alert-success fixed-top mt-0";
    notification.role = "alert";
    notification.textContent = message;
    // Append the notification to the body
    document.body.appendChild(notification);
    // Fade out and remove the notification after 3 seconds
    setTimeout(function () {
        notification.style.opacity = "0";
        setTimeout(function () {
            notification.remove();
        }, 1000);
    }, 3000);
}

document
    .getElementById("resetSettings")
    .addEventListener("click", function () {
        // Reset all settings to default values
        document.getElementById("passwordLength").value = 12;
        document
            .querySelectorAll('input[type="checkbox"]')
            .forEach(function (checkbox) {
                checkbox.checked = false;
            });
    });
