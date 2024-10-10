let a = null;
let currentOperator = null;

let prevA = null;
let prevOperator = null;

let waitingForSecond = false;
let newInput = false;
let usedDecimal = false;

const view = document.querySelector(".view");

const numberButtons = document.querySelectorAll(".number");
const operationButtons = document.querySelectorAll(".operation");

const ACButton = document.querySelector("#ACButton");
const signButton = document.querySelector("#signButton");
const percentButton = document.querySelector("#percentButton");

const operations = {
    "/": (a, b) => {
        return a / b;
    },
    "X": (a, b) => {
        return a * b;
    },
    "-": (a, b) => {
        return a - b;
    },
    "+": (a, b) => {
        return a + b;
    },
}

numberButtons.forEach((number) => {
    number.addEventListener("click", (e) => {
        waitingForSecond = false;
        if (number.textContent == ".") {
            if (usedDecimal) {
                return;
            }

            if (newInput) {
                newInput = false;
                updateView("0.");
                usedDecimal = true;
            } else {
                updateView(view.textContent + ".");
            }
            return;
        }

        if (newInput) {
            newInput = false;
            updateView("");
        }

        if (view.textContent == "0") {
            if (number.textContent == "0") {
                return;
            }
            updateView(number.textContent);
        } else {
            updateView(view.textContent + number.textContent);
        }
    });
});

operationButtons.forEach((operation) => {
    operation.addEventListener("click", (e) => {
        if (waitingForSecond) {
            return;
        }

        if (a != null && currentOperator != null) {
            if (operation.textContent == "=") {
                prevA = +view.textContent;
                prevOperator = currentOperator;
            }

            result = operations[currentOperator](a, +view.textContent);
            updateView(result);
            a = result
            usedDecimal = false;
        } else {
            if (operation.textContent == "=" && prevA) {
                result = operations[prevOperator](+view.textContent, prevA);
                updateView(result);
                a = result
                usedDecimal = false;               
            } else {
                a = +view.textContent;
                waitingForSecond = true;
            }
        }

        newInput = true;
        currentOperator = operation.textContent == "=" ? null : operation.textContent;
    });
})

ACButton.addEventListener("click", (e) => {
    a = null;
    currentOperator = null;
    usedDecimal = false;
    updateView(view.textContent = "0");
});

percentButton.addEventListener("click", (e) => {
    updateView(+view.textContent / 100);
});

signButton.addEventListener("click", (e) => {
    if (+view.textContent == 0) {
        return;
    }

    if (view.textContent[0] == "-") {
        updateView(view.textContent.slice(1));
    } else {
        updateView("-" + view.textContent);
    }
});

function updateView(newText) {
    view.textContent = newText;
    // console.log()
    // if (newText.length < 20) {
    //     view.style.fontSize = "30px";
    // } else {
    //     console.log(view.width / (view.textContent.length * (1/3)));
    //     // newSize = calc(16px + 6 * ((100vw - 320px) / 680));
    //     // view.style.fontSize = "calc(16px + 6 * ((100vw - 320px) / 680))";
    // }
}

