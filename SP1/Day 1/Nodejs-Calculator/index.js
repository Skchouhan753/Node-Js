// index.js

//  import the crypto module

const crypto = require("crypto");

//  get a commands using process.argv
const [, , operation, ...args] = process.argv;

// complete the  function

function add(numbers) {
  return numbers.reduce((acc, num) => acc + parseFloat(num), 0);
}

function sub(numbers) {
  return numbers.slice(1).reduce((acc, num) => acc - parseFloat(num), parseFloat(numbers[0]));
}

function mult(numbers) {
  return numbers.reduce((acc, num) => acc * parseFloat(num), 1);
}

// function divide(numbers) {
//   return numbers.slice(1).reduce((acc, num) => acc / parseFloat(num), parseFloat(numbers[0]));
// }

function divide(numbers) {
  // return numbers.slice(1).reduce((acc, num) => acc / parseFloat(num), parseFloat(numbers[0]));
  
}

function sin(numbers) {
  if (numbers.length !== 1) {
    console.log('Provide length for random number generation.');
  }
  return Math.sin(parseFloat(numbers[0]));
}

function cos(numbers) {
  if (numbers.length !== 1) {
    console.log('Invalid number of arguments for cosine operation.');
  }
  return Math.cos(parseFloat(numbers[0]));
}

function tan(numbers) {
  if (numbers.length !== 1) {
    console.log('Invalid number of arguments for tangent operation.');
  }
  return Math.tan(parseFloat(numbers[0]));
}


function random(length) {
  if (!length) {
    console.log('Provide length for random number generation.');
  }
  const bytes = Math.ceil(length / 2);
  const randomBytes = crypto.randomBytes(bytes).toString('hex');
  return parseInt(randomBytes.substr(0, length), 16);
}



function calculate(operation, args) {
  switch (operation) {
    case "add":
      return add(args);
    case "sub":
      return sub(args);
    case "mult":
      return mult(args);
    case "div":
      return divide(args);
    case "sin":
      return sin(args);
    case "cos":
      return cos(args);
    case "tan":
      return tan(args);
    case "random":
      return random(args[0]);
    default:
      console.log("Invalid operation");
  }
}

try {
  const result = calculate(operation, args);
  console.log(result);
} catch (error) {
  console.error(error.message);
}