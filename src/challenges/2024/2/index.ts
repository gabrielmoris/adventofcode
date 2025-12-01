export const solutionFn = ({ arg }: { arg: string }) => {
  const arrOfStrings = arg.split("\n");
  let safeReports = 0;

  for (let string of arrOfStrings) {
    const report = string.split(" ").map(Number);
    if (isSafe(report)) {
      safeReports++;
    }
  }

  return safeReports;
};

function isSafe(report: string | any[]) {
  const isIncreasing = report[0] < report[1];
  for (let i = 1; i < report.length; i++) {
    const diff = isIncreasing
      ? report[i] - report[i - 1]
      : report[i - 1] - report[i];
    if (diff < 1 || diff > 3) return false;
  }
  return true;
}

export const solutionFn2 = ({ arg }: { arg: string }) => {
  const arrOfStrings = arg.split("\n");
  let safeReports = 0;

  for (let string of arrOfStrings) {
    const report = string.split(" ").map(Number);
    if (isSafeWithDampener(report)) {
      safeReports++;
    }
  }

  return safeReports;
};

function isSafeWithDampener(report: string | any[]) {
  if (isSafe(report)) return true;

  for (let i = 0; i < report.length; i++) {
    const modifiedReport = [...report.slice(0, i), ...report.slice(i + 1)];
    if (isSafe(modifiedReport)) return true;
  }
  return false;
}
