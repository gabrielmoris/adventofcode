import fs from "fs";
import readline from "readline";
import util from "util";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = util.promisify(rl.question).bind(rl);

async function execute() {
  const dirs = fs
    .readdirSync("./src/days", { withFileTypes: true })
    .filter((item) => item.isDirectory())
    .map((item) => item.name);

  const getChallenge = async (): Promise<string | null> => {
    const input = await question("Which challenge are you doing? (Type 'CTRL + C' to quit) ");

    if (typeof input === "string" && dirs.includes(input)) {
      return input;
    } else {
      console.log("This folder still wasn't created.");
      return getChallenge();
    }
  };

  while (true) {
    const challenge = await getChallenge();
    if (!challenge) {
      rl.close();
      break;
    }

    let mainInput: any;
    let secondaryInput: any;

    const ChallengeFn = await import("./days/" + challenge + "/index.ts");
    try {
      mainInput = await import("./days/" + challenge + "/input.ts");
    } catch {
      console.log("no input.ts provided for Arg 1");
    }

    try {
      secondaryInput = await import("./days/" + challenge + "/input2.ts");
    } catch {
      console.log("no input2.ts provided for Arg 2");
    }

    Object.keys(ChallengeFn).forEach((key, index) => {
      if (typeof ChallengeFn[key] === "function") {
        const fn = ChallengeFn[key];
        const start = performance.now();
        const solution = secondaryInput ? fn(mainInput, secondaryInput) : fn(mainInput);
        const end = performance.now();
        console.log(`${index + 1}. Challenge ${challenge} - ${fn.name}: `, solution);
        console.log(`${index + 1}. Execution took ${(end - start).toPrecision(4)} milliseconds.`);
      }
    });
  }
}

execute();
