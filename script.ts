var result: number = 0;
var number: number = 0;
var operator: string = "+";
var number_string: string = "";
var hasPoint: boolean = false;

function processDigit(buttonText: string): (event: MouseEvent) => void {
    return function (event: MouseEvent): void {
        const display = document.querySelector(".display");

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

function setDisplay(contents: string): void {
    const display = document.querySelector(".display");

    if (display !== null) {
        display.textContent = contents;
    }
}

function reset(): void {
    result = 0;
    number = 0;
    number_string = "";
    operator = "+";
    setDisplay("0");
}

function truncateString(s: string): string {
    let ret: string = "";
    let i = 0;
    let counter = 0;
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

function calculate(): void {
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

function processOperator(buttonText: string): (event: MouseEvent) => void {
    return function (event: MouseEvent): void {
        hasPoint = false;
        const display = document.querySelector(".display");
        const ops = ['+', '-', '/', '*'];
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

function main(): void {
    const numberButtons = document.querySelectorAll<HTMLButtonElement>('button.blue');

    numberButtons.forEach((button) => {
        button.onclick = processDigit(button.innerText);
    });

    const operatotButtons = document.querySelectorAll<HTMLButtonElement>('button.green, button.orange');

    operatotButtons.forEach((button) => {
        button.onclick = processOperator(button.innerText);
    });
}

main();