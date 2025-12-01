export const solutionFn = ({ arg }: { arg: string }) => {
  const inputArray = arg.split("\n");
  let score = 0;

  const scoreMap: Record<string, Record<string, number>> = {
    X: { A: 3, B: 0, C: 6, score: 1 }, // Rock 1 point + Draw A (3 points), Looses B (0points), wins C (6points)
    Y: { A: 6, B: 3, C: 0, score: 2 }, // Paper
    Z: { A: 0, B: 6, C: 3, score: 3 }, // Scissors
  };

  inputArray.forEach((game) => {
    const [opponentPlay, yourPlay] = game.split(" ");

    if (yourPlay in scoreMap && opponentPlay in scoreMap[yourPlay]) {
      score += scoreMap[yourPlay].score;
      score += scoreMap[yourPlay][opponentPlay];
    }
  });

  return score;
};

export const solutionFn2 = ({ arg }: { arg: string }) => {
  const inputArray = arg.split("\n");
  let score = 0;

  const scoreMap: Record<string, Record<string, number>> = {
    X: {
      // I need to Loose
      A: 3, // I need to choose scissors
      B: 1, // I choose rock
      C: 2, // I choose Paper
      score: 0,
    },
    Y: { A: 1, B: 2, C: 3, score: 3 },
    Z: { A: 2, B: 3, C: 1, score: 6 },
  };

  inputArray.forEach((game) => {
    const [opponentPlay, yourPlay] = game.split(" ");

    if (yourPlay in scoreMap && opponentPlay in scoreMap[yourPlay]) {
      score += scoreMap[yourPlay].score;
      score += scoreMap[yourPlay][opponentPlay];
    }
  });

  return score;
};
