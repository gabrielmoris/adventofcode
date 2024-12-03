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
    const input = await question("\n\n\x1b[33m\x1b[4mWhich challenge are you doing? (Type 'CTRL + C' to quit) \x1b[0m \n\n");

    if (typeof input === "string" && dirs.includes(input)) {
      return input;
    } else {
      console.log("\x1b[31m This folder still wasn't created.");

      return getChallenge();
    }
  };

  while (true) {;
    const challenge = await getChallenge();
    if (!challenge) {
      rl.close();
      break;
    }

    let mainInput: any;
    let secondaryInput: any;
    console.clear();

    const ChallengeFn = await import("./days/" + challenge + "/index.ts");
    try {
      mainInput = await import("./days/" + challenge + "/input.ts");
    } catch {
      console.log("\x1b[31m","no input.ts provided for Arg 1","\x1b[0m");
    }

    try {
      secondaryInput = await import("./days/" + challenge + "/input2.ts");
    } catch {
      console.log("\x1b[2m","no input2.ts provided for Arg 2","\x1b[0m");
    }

    Object.keys(ChallengeFn).forEach((key, index) => {
      if (typeof ChallengeFn[key] === "function") {
        const fn = ChallengeFn[key];
        const start = performance.now();
        const solution = secondaryInput ? fn(mainInput, secondaryInput) : fn(mainInput);
        const end = performance.now();
        console.log(`\x1b[44m\x1b[33mDay ${challenge}. Challenge ${index + 1}\x1b[0m\x1b[33m`, solution+"\x1b[0m");
        console.log(`\x1b[2mExecution took ${(end - start).toPrecision(4)} milliseconds.\x1b[0m`);
      }
    });
  }
}

execute();
