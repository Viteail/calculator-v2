const numberButtons = document.querySelectorAll('.number-btn');
const operatorButtons = document.querySelectorAll('.operator-btn');
const equalButton = document.querySelector('.equal-btn');
const clearButton = document.querySelector('.clear-btn');
const deleteButton = document.querySelector('.delete-btn');
const mainDisplay = document.querySelector('.main-display');
const secondDisplay = document.querySelector('.second-display');

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
  firstNumber = [(+firstNumber.join('') + +secondNumber.join('')).toString()];
  displayMainOutput();
  clearOperator();
  clearSecondNumber();
};

const subtract = () => {
  displaySecondOutput();
  firstNumber = [(+secondNumber.join('') - +firstNumber.join('')).toString()];
  displayMainOutput();
  clearOperator();
  clearSecondNumber();
};

const multiply = () => {
  displaySecondOutput();
  firstNumber = [(+firstNumber.join('') * +secondNumber.join('')).toString()];
  displayMainOutput();
  clearOperator();
  clearSecondNumber();
};

const divide = () => {
  displaySecondOutput();
  firstNumber = [(+secondNumber.join('') / +firstNumber.join('')).toString()];
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
    button.addEventListener('click', () => {
      firstNumber.push(button.value);
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
      operator.push(button.value);
      switchFirstNumberToSecondNumber();
      displaySecondOutput();
    });
  });
};

equalButton.addEventListener('click', () => {
  equalCheck = true;
  operate();
});

deleteButton.addEventListener('click', () => {
  firstNumber.pop();
  displayMainOutput();
})

clearButton.addEventListener('click', () => {
  clearFirstNumber();
  clearSecondNumber();
  clearOperator();
  displayMainOutput();
  displaySecondOutput();
})

attachNumberButtonEventListeners();
attachOperatorButtonEventListeners();
