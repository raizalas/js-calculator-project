class Calculator {
  constructor(previousOperationElement, currentOperationElement) {
    this.previousOperationElement = previousOperationElement;
    this.currentOperationElement = currentOperationElement;
    this.clear();
  }

  clear() {
    this.currentOperation = "";
    this.previousOperation = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperation = this.currentOperation.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentOperation.includes(".")) return;
    this.currentOperation =
      this.currentOperation.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperation === "") return;
    if (this.previousOperation !== "") {
      this.calculate();
    }
    this.operation = operation;
    this.previousOperation = this.currentOperation;
    this.currentOperation = "";
  }

  calculate() {
    let calculation;
    const previous = parseFloat(this.previousOperation);
    const current = parseFloat(this.currentOperation);
    if (isNaN(previous) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        calculation = previous + current;
        break;
      case "-":
        calculation = previous - current;
        break;
      case "*":
        calculation = previous * current;
        break;
      case "/":
        calculation = previous / current;
        break;
      default:
        return;
    }
    this.currentOperation = calculation;
    this.operation = undefined;
    this.previousOperation = "";
  }

  updateDisplay() {
    this.currentOperationElement.innerText = this.currentOperation;
    if (this.operation != null) {
      this.previousOperationElement.innerText = `${this.previousOperation} ${this.operation}`;
    } else {
      this.previousOperationElement.innerText = "";
    }
  }
}

const numberButton = document.querySelectorAll("[data-number]");
const operationButton = document.querySelectorAll("[data-operation]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const equalsButton = document.querySelector("[data-equals]");
const previousOperationElement = document.querySelector("[data-previous]");
const currentOperationElement = document.querySelector("[data-current]");

const calculator = new Calculator(
  previousOperationElement,
  currentOperationElement
);

numberButton.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButton.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", (button) => {
  calculator.calculate();
  calculator.updateDisplay();
});

allClearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});
