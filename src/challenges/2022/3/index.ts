export const solutionFn = ({ arg }: { arg: string }) => {
  //each rucksack is a string, each half string is a compartment
  //check which item is repeated on both and sum all the priorities number

  const inputArray = arg.split("\n");
  let arrOfLetters: string[] = [];
  let result = 0;

  inputArray.forEach((input) => {
    const compartment1 = input.substring(0, input.length / 2);
    const compartment2 = input.substring(input.length / 2, input.length);
    const repeatedLetter = compartment1.split("").filter((a_) => compartment2.includes(a_));

    arrOfLetters.push(repeatedLetter[0]);
  });
  arrOfLetters.forEach((letter) => {
    result += priorities(letter);
  });
  return result;
};

function priorities(letter: string): number {
  if (letter === letter.toLocaleLowerCase()) {
    return letter.charCodeAt(0) - 96; //  ASCII code
  } else {
    return letter.charCodeAt(0) - 38;
  }
}

export const solutionFn2 = ({ arg }: { arg: string }) => {
  const inputArray = arg.split("\n");
  let result = 0;
  let arrOfLetters: string[] = [];

  for (let i = 0; i < inputArray.length; i += 3) {
    const repeatedLetter1_2 = inputArray[i].split("").filter((a_) => inputArray[i + 1].includes(a_)); // Copare groups 1 with 2
    const repeatedGroup1_2_3 = repeatedLetter1_2.filter((a_) => inputArray[i + 2].includes(a_)); // compares group 1&2 with 3
    arrOfLetters.push(repeatedGroup1_2_3[0]);
  }

  arrOfLetters.forEach((letter) => {
    result += priorities(letter);
  });

  return result;
};
