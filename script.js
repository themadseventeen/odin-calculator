var result = 0;
var number = 0;
var operator = "+";
var number_string = "";
var hasPoint = false;
function processDigit(buttonText) {
    return function (event) {
        var display = document.querySelector(".display");
        if (buttonText === ".") {
            if (!hasPoint)
                number_string += buttonText;
            hasPoint = true;
        }
        else
            number_string += buttonText;
        if (display !== null) {
            // console.log(buttonText);
            display.textContent = number_string;
        }
    };
}
function setDisplay(contents) {
    var display = document.querySelector(".display");
    if (display !== null) {
        display.textContent = contents;
    }
}
function reset() {
    result = 0;
    number = 0;
    number_string = "";
    operator = "+";
    setDisplay("0");
}
function truncateString(s) {
    var ret = "";
    var i = 0;
    var counter = 0;
    while (i < s.length && counter < 7) {
        if (s.charAt(i) == '.')
            ret += ".";
        else {
            ret += s.charAt(i);
            counter++;
        }
        i++;
    }
    return ret;
}
function calculate() {
    console.log("Operator " + operator);
    switch (operator) {
        case "+":
            console.log("adding");
            result = result + number;
            break;
        case "-":
            result -= number;
            break;
        case "*":
            result *= number;
            break;
        case "/":
            if (number === 0) {
                reset();
                setDisplay("lol");
                return;
            }
            result /= number;
            break;
    }
    setDisplay(truncateString(result.toString()));
}
function processOperator(buttonText) {
    return function (event) {
        hasPoint = false;
        var display = document.querySelector(".display");
        var ops = ['+', '-', '/', '*'];
        if (ops.includes(buttonText)) {
            console.log("lol");
            number = Number(number_string);
            number_string = "";
            console.log(result);
            calculate();
            console.log(result);
            operator = buttonText;
        }
        else if (buttonText == "AC") {
            reset();
        }
        else if (buttonText == "=") {
            number = Number(number_string);
            number_string = "";
            calculate();
            operator = "";
        }
    };
}
function main() {
    var numberButtons = document.querySelectorAll('button.blue');
    numberButtons.forEach(function (button) {
        button.onclick = processDigit(button.innerText);
    });
    var operatotButtons = document.querySelectorAll('button.green, button.orange');
    operatotButtons.forEach(function (button) {
        button.onclick = processOperator(button.innerText);
    });
}
main();
