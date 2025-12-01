export const solutionFn = ({ arg }: { arg: string }) => {
  for (let i = 4; i < arg.length; i++) {
    const repeats = hasRepeats(arg.slice(i - 4, i));
    if (!repeats) {
      return i;
    }
  }
  return 0;
};
const hasRepeats = (str: string) => /(.).*\1/.test(str);

export const solutionFn2 = ({ arg }: { arg: string }) => {
  for (let i = 14; i < arg.length; i++) {
    const repeats = hasRepeats(arg.slice(i - 14, i));
    if (!repeats) {
      return i;
    }
  }
  return 0;
};
