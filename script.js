const numberButtons = document.querySelectorAll('.number-btn');
const operatorButtons = document.querySelectorAll('.operator-btn');

const equalButton = document.querySelector('.equal-btn');
const clearButton = document.querySelector('.clear-btn');
const deleteButton = document.querySelector('.delete-btn');
const decimalPointButton = document.querySelector('.point-btn');

const mainDisplay = document.querySelector('.main-display');
const secondDisplay = document.querySelector('.second-display');

const NUMBERS = {
  zero: '0',
};

const DOT = {
  dot: '.',
};

const OPERATORS = {
  addition: '+',
  subtraction: '-',
  division: '÷',
  multiplication: 'x',
  equal: '=',
};

let equalCheck = false;

let firstNumber = [];
let operator = [];
let secondNumber = [];

const sum = () => {
  displaySecondOutput();
  firstNumber = (+firstNumber.join('') + +secondNumber.join(''))
    .toString()
    .split('');
  displayMainOutput();
  clearOperator();
  clearSecondNumber();
};

const subtract = () => {
  displaySecondOutput();
  firstNumber = (+secondNumber.join('') - +firstNumber.join(''))
    .toString()
    .split('');
  displayMainOutput();
  clearOperator();
  clearSecondNumber();
};

const multiply = () => {
  displaySecondOutput();
  firstNumber = (+firstNumber.join('') * +secondNumber.join(''))
    .toString()
    .split('');
  displayMainOutput();
  clearOperator();
  clearSecondNumber();
};

const divide = () => {
  displaySecondOutput();
  firstNumber = (+secondNumber.join('') / +firstNumber.join(''))
    .toString()
    .split('');
  displayMainOutput();
  clearOperator();
  clearSecondNumber();
};

const operate = () => {
  if (operator[0] === OPERATORS.addition) {
    sum();
  } else if (operator[0] === OPERATORS.subtraction) {
    subtract();
  } else if (operator[0] === OPERATORS.division) {
    divide();
  } else if (operator[0] === OPERATORS.multiplication) {
    multiply();
  }
};

const displayMainOutput = () => {
  mainDisplay.textContent = firstNumber.join('');
};

const displaySecondOutput = () => {
  if (equalCheck === false) {
    secondDisplay.textContent = `${secondNumber.join('')} ${operator}`;
  } else
    secondDisplay.textContent = `${secondNumber.join(
      ''
    )} ${operator} ${firstNumber.join('')} ${OPERATORS.equal}`;
  equalCheck = false;
};

const attachNumberButtonEventListeners = () => {
  numberButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      if (e.target.value === NUMBERS.zero && firstNumber[1] === NUMBERS.zero) {
        return;
      } else if (firstNumber[0] === NUMBERS.zero && firstNumber.length === 1) {
        firstNumber[0] = button.value;
      } else firstNumber.push(button.value);
      displayMainOutput();
    });
  });
};

const switchFirstNumberToSecondNumber = () => {
  secondNumber = firstNumber;
  clearFirstNumber();
};

const clearFirstNumber = () => {
  firstNumber = [];
};

const clearOperator = () => {
  operator = [];
};

const clearSecondNumber = () => {
  secondNumber = [];
};

const attachOperatorButtonEventListeners = () => {
  operatorButtons.forEach((button) => {
    button.addEventListener('click', () => {
      checkDecimalPointWithoutDecimals();
      displayMainOutput();

      if (!firstNumber.length) return;

      if (operator.length && checkDivideByZero()) return;
      if (operator.length) operate();
      operator.push(button.value);
      switchFirstNumberToSecondNumber();
      displaySecondOutput();
    });
  });
};

equalButton.addEventListener('click', () => {
  checkDecimalPointWithoutDecimals();
  if (!operator.length || !firstNumber.length) return;
  if (checkDivideByZero()) return;
  equalCheck = true;
  operate();
});

deleteButton.addEventListener('click', () => {
  if (firstNumber[0] === '-' && firstNumber.length === 2) firstNumber.pop();
  firstNumber.pop();
  displayMainOutput();
});

clearButton.addEventListener('click', () => {
  clearFirstNumber();
  clearSecondNumber();
  clearOperator();
  displayMainOutput();
  displaySecondOutput();
});

decimalPointButton.addEventListener('click', (e) => {
  if (firstNumber.includes(e.target.value) || !firstNumber.length) return;
  firstNumber.push(e.target.value);
  displayMainOutput();
});

const checkDecimalPointWithoutDecimals = () => {
  if (firstNumber[firstNumber.length - 1] === DOT.dot) {
    firstNumber.pop();
    displayMainOutput();
  } else if (
    firstNumber[firstNumber.length - 2] === DOT.dot &&
    firstNumber[firstNumber.length - 1] === NUMBERS.zero
  ) {
    firstNumber = firstNumber.slice(0, -2);
    displayMainOutput();
  }
};

const checkDivideByZero = () => {
  if (operator[0] === OPERATORS.division && firstNumber[0] === NUMBERS.zero) {
    alert('cant divide by 0');
    return true;
  }
};

attachNumberButtonEventListeners();
attachOperatorButtonEventListeners();
