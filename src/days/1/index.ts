const mergePackageAndORder = (arg: string) => {
  const arrOfCalories = arg.split("\n");
  const packages: number[] = [];
  const eachPackage: number[] = [];

  for (let i = 0; i < arrOfCalories.length; i++) {
    if (arrOfCalories[i] === "") {
      packages.push(eachPackage.reduce((a, b) => a + b));
      eachPackage.length = 0;
    } else {
      eachPackage.push(Number(arrOfCalories[i]));
    }
  }

  if (eachPackage.length > 0) {
    packages.push(eachPackage.reduce((a, b) => a + b, 0));
  }

  return packages.sort((a, b) => b - a);
};

export const solutionFn = ({ arg }: { arg: string }) => {
  console.log("\x1b[44m", "\x1b[33m", `Day 1 A`, "\x1b[0m");

  return mergePackageAndORder(arg)[0];
};

export const solutionFn2 = ({ arg }: { arg: string }) => {
  console.log("\x1b[44m", "\x1b[33m", `Day 1 B`, "\x1b[0m");

  return mergePackageAndORder(arg)[0] + mergePackageAndORder(arg)[1] + mergePackageAndORder(arg)[2];
};
