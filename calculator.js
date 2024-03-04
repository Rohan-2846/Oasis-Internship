let currentInput = '';
let operator = '';
let displayElement = document.getElementById('display');

function clearDisplay() {
    currentInput = '';
    operator = '';
    updateDisplay();
}

function appendNumber(number) {
    currentInput += number;
    updateDisplay();
}

function appendDecimal() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
        updateDisplay();
    }
}

function setOperator(newOperator) {
    if (currentInput !== '') {
        operator = newOperator;
        currentInput += ' ' + newOperator + ' ';
        updateDisplay();
    }
}

function calculate() {
    try {
        currentInput = eval(currentInput).toString();
        updateDisplay();
        operator = '';
    } catch (error) {
        currentInput = 'Error';
        updateDisplay();
    }
}

function updateDisplay() {
    displayElement.textContent = currentInput;
}
