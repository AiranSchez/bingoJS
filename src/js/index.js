const playerRows = document.querySelectorAll(".player-row");
const cpuRows = document.querySelectorAll(".cpu-row");
const playerNumbers = document.querySelector(".player");
const cpuNumbers = document.querySelector(".cpu");
const dice = document.querySelector(".dice");
const player = [];
const cpu = [];

const generateRandomNumber = () => {
  const number = Math.floor(Math.random() * 100);
  return number;
};

const createBingoNumbersFor = (bingoNumbers) => {
  while (bingoNumbers.length < 15) {
    let randomNumber = generateRandomNumber();
    if (!bingoNumbers.includes(randomNumber)) {
      bingoNumbers.push(randomNumber);
    }
  }
};

const generateFourNonRepeatedRandomNumbers = () => {
  const result = [];
  while (result.length < 4) {
    let randomNumber = Math.floor(Math.random() * 9);
    if (!result.includes(randomNumber)) {
      result.push(randomNumber);
    }
  }
  return result;
};

const createBoxesFor = (rows, bingoNumbers) => {
  let copyOfBingoNumbers = [...bingoNumbers];
  rows.forEach((e) => {
    const blankSpaces = generateFourNonRepeatedRandomNumbers();
    const aabbcc = copyOfBingoNumbers.slice(0, 5).sort((a, b) => {
      return a - b;
    });
    for (let i = 0; i < 9; i++) {
      if (blankSpaces.includes(i)) {
        const box = document.createElement("div");
        box.className = "blank";
        box.innerHTML = "";
        e.appendChild(box);
      } else {
        const box = document.createElement("div");
        box.className = "number";
        box.innerHTML = aabbcc.shift();
        e.appendChild(box);
      }
    }
    copyOfBingoNumbers.splice(0, 5);
  });
};

const appearedNumbers = [];
const throwDice = () => {
  let numberThrown = generateRandomNumber();
  if (!appearedNumbers.includes(numberThrown) && appearedNumbers.length < 99) {
    appearedNumbers.push(numberThrown);
    return numberThrown;
  } else {
    return throwDice();
  }
};

const button = document.querySelector("button");
button.addEventListener("click", () => {
  const result = throwDice();
  dice.innerHTML = result;
  checkNumber();
});

createBingoNumbersFor(player);
createBingoNumbersFor(cpu);
createBoxesFor(playerRows, player);
createBoxesFor(cpuRows, cpu);

const checkNumber = () => {
  let drawnNumber = document.querySelector(".dice").innerHTML;
  let numbers = document.querySelectorAll(".number");
  numbers.forEach((e) => {
    if (e.innerHTML === drawnNumber) {
      e.className = "bingo";
    }
  });
};
