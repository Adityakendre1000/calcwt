document.addEventListener('DOMContentLoaded', () => {
    let screen = document.getElementById('screen');
    let buttons = document.querySelectorAll('button');
    let screenValue = '';
    let errorImage = document.getElementById('error-image');
    let customAlert = document.getElementById('custom-alert');
    let errorCount = 0; // Counter for errors

    function handleInput(input) {
        let button = getButtonByInput(input);

        if (button) {
            button.classList.add('glow');
            setTimeout(() => {
                button.classList.remove('glow');
            }, 500);
        }

        if (input === 'X' || input === '*') {
            input = '*';
            screenValue += input;
            screen.value = screenValue;
        } else if (input === 'C') {
            screenValue = '';
            screen.value = screenValue;
            screen.classList.remove('error');
            errorCount = 0; // Reset error counter on clear
            customAlert.style.display = 'none'; // Hide custom alert on clear
        } else if (input === '=' || input === 'Enter') {
            try {
                screen.value = eval(screenValue);
                screen.classList.remove('error');
                errorCount = 0; // Reset error counter on successful evaluation
                customAlert.style.display = 'none'; // Hide custom alert on successful evaluation
            } catch (e) {
                screen.value = 'Error';
                screen.classList.add('error');
                errorCount++; // Increment error counter

                if (errorCount === 1) {
                    // First error: Show error message
                    customAlert.style.display = 'block';
                    customAlert.innerText = 'Its a simple calc, use it properly!';
                } else if (errorCount === 2) {
                    // Second error: Show alert
                    customAlert.style.display = 'none';
                    alert('Ja na be ZAMLYA Calc neet vapar na!');
                } else if (errorCount === 3) {
                    // Third error: Show error image
                    customAlert.style.display = 'none';
                    errorImage.style.display = 'block';
                    setTimeout(() => {
                        errorImage.style.display = 'none'; // Hide the error image after 2 seconds
                    }, 2000);
                } else if (errorCount >= 4) {
                    // Fourth error or more: Redirect to a website
                    window.location.href = 'https://shantanukh.github.io/Portfolio/';
                }
            }
        } else if (input === 'Backspace') {
            screenValue = screenValue.slice(0, -1);
            screen.value = screenValue;
        } else if (input.match(/[0-9+\-*/().%]/)) {
            screenValue += input;
            screen.value = screenValue;
        }
    }

    function getButtonByInput(input) {
        switch (input) {
            case '0': return document.getElementById('btn-0');
            case '1': return document.getElementById('btn-1');
            case '2': return document.getElementById('btn-2');
            case '3': return document.getElementById('btn-3');
            case '4': return document.getElementById('btn-4');
            case '5': return document.getElementById('btn-5');
            case '6': return document.getElementById('btn-6');
            case '7': return document.getElementById('btn-7');
            case '8': return document.getElementById('btn-8');
            case '9': return document.getElementById('btn-9');
            case '.': return document.getElementById('btn-dot');
            case '+': return document.getElementById('btn-plus');
            case '-': return document.getElementById('btn-minus');
            case '*':
            case 'X': return document.getElementById('btn-multiply');
            case '/': return document.getElementById('btn-divide');
            case '(': return document.getElementById('btn-open-paren');
            case ')': return document.getElementById('btn-close-paren');
            case '%': return document.getElementById('btn-percent');
            case 'Enter': return document.getElementById('btn-equal');
            case '=': return document.getElementById('btn-equal');
            case 'C': return document.getElementById('btn-clear');
            case 'Backspace': return null;
            default: return null;
        }
    }

    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            let buttonText = e.target.innerText;
            handleInput(buttonText);
        });
    });

    document.addEventListener('keydown', (e) => {
        let key = e.key;
        handleInput(key);
    });
});