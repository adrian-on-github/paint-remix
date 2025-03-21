"use strict";

console.log("Hello world");

const body = document.querySelector("body");
const color = document.querySelector("#color");
const canvas = document.getElementById("container");
const ctx = canvas.getContext("2d");

let RED, GREEN, BLUE, YELLOW, BLACK;
let COLOR = "#000000";

function drawPixel(x, y, color, width, height) {
  if (canvas.getContext) {
    ctx.fillRect(x, y, width, height);
    ctx.fillStyle = `${color}`;
    ctx.fill();
  }
}

console.log(color);

color.addEventListener("change", (e) => {
  COLOR = e.target.value;
  console.log(COLOR);
});

canvas.addEventListener("mousedown", (e) => {
  if (COLOR) {
    drawPixel(e.offsetX, e.offsetY, COLOR, 10, 10);
  }

  console.log(e);
});
