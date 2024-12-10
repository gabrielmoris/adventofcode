export const solutionFn = ({ test }: { test: string }) => {
  let sumOfMiddlePages = 0;
  const pageOrdering = test
    .split("\n\n")[0]
    .split("\n")
    .map((strpage) => strpage.split("|").map((str) => Number(str)));

  const pages = test
    .split("\n\n")[1]
    .split("\n")
    .map((page) => page.split(",").map((item) => Number(item)));

  for (let i = 0; i < pages.length; i++) {
    let isCorrect = true;
    pages[i].forEach((page) => {});

    if (isCorrect) sumOfMiddlePages += pages[i][(pages[i].length - 1) / 2];
  }

  return sumOfMiddlePages;
};

export const solutionFn2 = ({ arg }: { arg: string }) => {};
