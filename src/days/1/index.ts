export const solutionFn = ({ arg1 }: { arg1: string }) => {
  console.log(
    "\x1b[44m",
    "\x1b[33m",
    "Enter the challenge statement here.",
    "\x1b[0m"
  );

  return "Enter the answer here. About the args: " + arg1;
};
