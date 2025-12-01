export const solutionFn = ({ arg }: { arg: string }) => {
  let sumOfMiddlePages = 0;
  const [orderingRules, updatesList] = arg.split("\n\n");

  const rules = new Map();
  orderingRules.split("\n").forEach((rule) => {
    const [before, after] = rule.split("|").map(Number);
    if (!rules.has(after)) rules.set(after, new Set());
    rules.get(after).add(before);
  });

  const updates = updatesList
    .split("\n")
    .map((update) => update.split(",").map(Number));

  updates.forEach((update) => {
    let isCorrect = true;
    for (let i = 0; i < update.length; i++) {
      for (let j = i + 1; j < update.length; j++) {
        if (!rules.get(update[j])?.has(update[i])) {
          isCorrect = false;
        }
      }
      if (!isCorrect) break;
    }

    if (isCorrect) {
      const middleIndex = Math.floor(update.length / 2);
      sumOfMiddlePages += update[middleIndex];
    }
  });

  return sumOfMiddlePages;
};

export const solutionFn2 = ({ test }: { test: string }) => {};
