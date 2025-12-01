export const solutionFn = ({ arg }: { arg: string }) => {
  const arOfCommands = arg.split("\n");
  let password = 0;
  let currentPosition = 50;

  for (let command of arOfCommands) {
    const direction = command[0];
    const value = Number(command.substring(1));
    if (direction === "L") {
      for (let i = 0; i < value; i++) {
        if (currentPosition === 0) {
          currentPosition = 99;
        } else {
          currentPosition--;
        }
      }
    } else if (direction === "R") {
      for (let i = 0; i < value; i++) {
        if (currentPosition === 99) {
          currentPosition = 0;
        } else {
          currentPosition++;
        }
      }
    }

    if (currentPosition === 0) {
      password++;
    }
  }
  return password;
};

export const solutionFn2 = ({ arg }: { arg: string }) => {
  const arOfCommands = arg.split("\n");
  let password = 0;
  let currentPosition = 50;

  for (let command of arOfCommands) {
    const direction = command[0];
    const value = Number(command.substring(1));
    if (direction === "L") {
      for (let i = 0; i < value; i++) {
        if (currentPosition === 0) {
          password++;
        }
        if (currentPosition === 0) {
          currentPosition = 99;
        } else {
          currentPosition--;
        }
      }
    } else if (direction === "R") {
      for (let i = 0; i < value; i++) {
        if (currentPosition === 0) {
          password++;
        }
        if (currentPosition === 99) {
          currentPosition = 0;
        } else {
          currentPosition++;
        }
      }
    }
  }
  return password;
};
