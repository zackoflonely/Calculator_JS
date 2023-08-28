const calculator = {
    displayNumber : "0",
    operator : null,
    firstNumber: null,
    isWaitForSecondNumber: false,
};

function updateDisplay(){
    document.querySelector("#displayNumber").innerText = calculator.displayNumber;
}

function clearCalculator(){
    calculator.displayNumber = "0";
    calculator.operator = null;
    calculator.firstNumber = null;
    calculator.isWaitForSecondNumber = false;
}

function resetOperator(){
    calculator.operator = null;
    updateDisplay();
}

function inputDigit(digit){
    if (calculator.displayNumber === "0"){
        calculator.displayNumber=digit;
    }else{
        calculator.displayNumber += digit;
    }
}

const buttons = document.querySelectorAll(".button");

function inverseNumber(){
    if (calculator.displayNumber === "0"){
        return;
    }
    calculator.displayNumber = calculator.displayNumber * -1;
}

function handleOperator(operator){
    if (!calculator.isWaitForSecondNumber){
        calculator.operator = operator;
        calculator.isWaitForSecondNumber = true;
        calculator.firstNumber = calculator.displayNumber;
    }
}

function performCalculation(){
    if (calculator.firstNumber == null || calculator.operator == null){
        alert("Anda belum menetapkan operator")
        return;
    }
    let hasil = 0;
    if (calculator.operator) {
        console.log(calculator.firstNumber);
        console.log(calculator.displayNumber);
        const result = calculator.displayNumber.split(/([+\-*/])/);
        let total = parseInt(result[0]);
        let operator = null;
    
        for (let i = 1; i < result.length; i++) {
            console.log("iterasi ke " + i);
            if (i % 2 !== 0) {
                console.log(result[i]);
                operator = result[i];
            } else {
                const number = parseInt(result[i]);
                switch (operator) {
                    case "+":
                        total += number;
                        break;
                        case "-":
                            total -= number;
                            break;
                            case "*":
                                total *= number;
                                break;
                                case "/":
                        if (number !== 0) {
                            total /= number;
                        } else {
                            alert("Division by zero!");
                        }
                        break;
                        default:
                            console.error("Unknown operator: " + operator);
                        }
                    }
                }
        hasil = total;
    }
    const history = {
        firstNumber : calculator.firstNumber,
        secondNumber : calculator.displayNumber,
        operator : calculator.operator,
        result : hasil
    }
    putHistory(history);
    calculator.displayNumber = hasil;
    renderHistory();
    calculator.isWaitForSecondNumber=false;
}

for (const button of buttons){
    button.addEventListener("click", function (event) {
        const target = event.target;
        if (target.classList.contains("clear")){
            clearCalculator();
            updateDisplay();
            return;
        }

        if (target.classList.contains("negative")){
            inverseNumber();
            updateDisplay();
            return;
        }

        if (target.classList.contains("equals")){
            performCalculation();
            updateDisplay();
            return;
        }

        if (target.classList.contains("operator")){
            inputDigit(target.innerText);
            updateDisplay();
            handleOperator(target.innerText);
            return;
        }

        inputDigit(target.innerText);
        updateDisplay();
    });
}