/**
 * Answer to Day 2: https://adventofcode.com/2021/day/2
 */
import { open } from "node:fs/promises";

// Part 1
class Submarine {
  _x;
  _z;

  constructor(startingX, startingZ) {
    this._x = startingX;
    this._z = startingZ;
  }

  runCommand(command) {
    const [word, amount] = command.split(" ");
    const amountInt = parseInt(amount);
    switch (word) {
      case "down":
        this._doDown(amountInt);
        break;
      case "up":
        this._doUp(amountInt);
        break;
      case "forward":
        this._doForward(amountInt);
        break;
    }
  }

  get x() {
    return this._x;
  }

  get z() {
    return this._z;
  }

  _doDown(amount) {
    this._z += amount;
  }

  _doUp(amount) {
    this._z -= amount;
  }

  _doForward(amount) {
    this._x += amount;
  }
}

// Part 2
class BetterSubmarine extends Submarine {
  _aim;

  constructor(startingX, startingZ, startingAim) {
    super(startingX, startingZ);
    this._aim = startingAim;
  }

  // @Override
  _doDown(amount) {
    this._aim += amount;
  }

  // @Override
  _doUp(amount) {
    this._aim -= amount;
  }

  // @Override
  _doForward(amount) {
    this._x += amount;
    this._z += this._aim * amount;
  }
}

let file;
try {
  file = await open("./day02_input.txt");
  const contents = await file.readFile();
  const commands = contents.toString().split("\n");

  // Part 1
  console.log("Part 1");
  const submarine = new Submarine(0, 0);
  for (let command of commands) {
    submarine.runCommand(command);
  }

  console.log("Horizontal:", submarine.x, "Depth:", submarine.z);
  console.log(" - multiplied:", submarine.x * submarine.z);

  // Part 2
  console.log("Part 2");
  const betterSubmarine = new BetterSubmarine(0, 0, 0);
  for (let command of commands) {
    betterSubmarine.runCommand(command);
  }

  console.log("Horizontal:", betterSubmarine.x, "Depth:", betterSubmarine.z);
  console.log(" - multiplied:", betterSubmarine.x * betterSubmarine.z);
} finally {
  file?.close();
}