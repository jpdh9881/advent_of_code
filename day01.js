import { open } from "node:fs/promises";

let file;
try {
  file = await open("./day01_input.txt");
  const contents = await file.readFile();
  const depthStrings = contents.toString().split("\n");
  const depths = depthStrings.map(d => parseInt(d));

  // Part 1
  let increases = 0;
  for (let i = 1; i < depths.length; i++) {
    if (depths[i] > depths[i - 1]) increases++;
  }

  console.log("# of increases:", increases);

  // Part 2
  const windowSize = 3;
  let windowIncreases = 0;
  for (let i = 0; i < depths.length - windowSize; i++) {
    const window1 = depths.slice(i, i + windowSize);
    const window2 = depths.slice(i + 1, i + 1 + windowSize);

    let window1Sum = sum(window1);
    let window2Sum = sum(window2);

    if (window2Sum > window1Sum) windowIncreases++;
  }

  console.log("# of window increases:", windowIncreases);
} finally {
  file?.close();
}

function sum(arr) {
  let sum = 0;
  for (let num of arr) {
    sum += num;
  }
  return sum;
};