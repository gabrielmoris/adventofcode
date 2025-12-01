import fs from "fs";
import readline from "readline";
import util from "util";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = util.promisify(rl.question).bind(rl);

async function selectYear(): Promise<string> {
  const years = fs
    .readdirSync("./src/challenges", { withFileTypes: true })
    .filter((item) => item.isDirectory())
    .map((item) => item.name);

  return new Promise(async (resolve) => {
    let selectedIndex = 0;

    function render() {
      console.clear();
      console.log("Use arrow keys to select the year, then press Enter:\n");
      years.forEach((year, i) => {
        if (i === selectedIndex) {
          console.log(`> \x1b[32m${year}\x1b[0m`);
        } else {
          console.log(`  ${year}`);
        }
      });
    }

    function onKeyPress(chunk: Buffer) {
      const key = chunk.toString();
      if (key === "\u001B\u005B\u0041") {
        // up arrow
        selectedIndex = (selectedIndex - 1 + years.length) % years.length;
        render();
      } else if (key === "\u001B\u005B\u0042") {
        // down arrow
        selectedIndex = (selectedIndex + 1) % years.length;
        render();
      } else if (key === "\r") {
        // Enter key
        process.stdin.setRawMode(false);
        process.stdin.off("data", onKeyPress);
        console.clear();
        resolve(years[selectedIndex]);
      } else if (key === "\u0003") {
        process.exit(); // Ctrl + C
      }
    }

    if (process.stdin.isTTY && typeof process.stdin.setRawMode === "function") {
      process.stdin.setRawMode(true);
      process.stdin.resume();
      process.stdin.on("data", onKeyPress);
    } else {
      console.log("\x1b[33m\x1b[4mAvailable years:\x1b[0m");
      years.forEach((year, i) => console.log(`$  ${year}`));

      while (true) {
        // Loop instead of recursion
        const input = await question("Enter year: ");
        if (typeof input === "string" && years.includes(input)) {
          resolve(input);
          return;
        }
        console.log("\x1b[31m Invalid input. Try again.\x1b[0m");
      }
    }

    render();
  });
}

async function execute() {
  const year = await selectYear();
  const challengeList = fs
    .readdirSync(`./src/challenges/${year}`, { withFileTypes: true })
    .filter((item) => item.isDirectory())
    .map((item) => item.name);

  const getChallenge = async (): Promise<string | null> => {
    const input = await question(
      `\x1b[33m\x1b[4mWhich challenge are you doing (${
        challengeList[0] + " - " + challengeList[challengeList.length - 1]
      })? (Type 'CTRL + C' to quit) \x1b[0m \n\n`
    );

    if (typeof input === "string" && challengeList.includes(input)) {
      return input;
    } else {
      console.log("\x1b[31m This folder still wasn't created.");

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
    console.clear();

    let ChallengeFn: any;
    try {
      ChallengeFn = await import(`./challenges/${year}/${challenge}/index.ts`);
    } catch {
      console.clear();
      console.log("\x1b[31m", "no index.ts provided", "\x1b[0m");
      continue;
    }

    try {
      mainInput = await import(`./challenges/${year}/${challenge}/input.ts`);
    } catch {
      console.log("\x1b[31m", "no input.ts provided for Arg 1", "\x1b[0m");
    }

    try {
      secondaryInput = await import(`./challenges/${year}/${challenge}/input2.ts`);
    } catch {
      console.log("\x1b[2m", "no input2.ts provided for Arg 2", "\x1b[0m");
    }

    Object.keys(ChallengeFn).forEach((key, index) => {
      if (typeof ChallengeFn[key] === "function") {
        const fn = ChallengeFn[key];
        const start = performance.now();
        const solution = secondaryInput ? fn(mainInput, secondaryInput) : fn(mainInput);
        const end = performance.now();
        console.log(`\x1b[44m\x1b[33mDay ${challenge}. Challenge ${index + 1}\x1b[0m\x1b[33m`, solution + "\x1b[0m");
        console.log(`\x1b[2mExecution took ${(end - start).toPrecision(4)} milliseconds.\x1b[0m`);
      }
    });
  }
}

execute();
