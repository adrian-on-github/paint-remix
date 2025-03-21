"use strict";

console.log("Hello world");

const body = document.querySelector("body");
const color = document.querySelector("#color");
const container = document.querySelector(".container");
let RED, GREEN, BLUE, YELLOW, BLACK;
let COLOR = "#000000";

console.log(color);

color.addEventListener("change", (e) => {
  COLOR = e.target.value;
  console.log(COLOR);
});

container.addEventListener("mousedown", (e) => {
  console.log(e);
});
