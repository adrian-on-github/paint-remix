"use strict";

/* Functions:


Radiergummi
hold and draw
exact color switcher
share function/ take ss
ui
exact pixels

*/

console.log("Hello world");

const body = document.querySelector("body");
const color = document.querySelector("#color");
const canvas = document.getElementById("container");
const ctx = canvas.getContext("2d");

let RED, GREEN, BLUE, YELLOW, BLACK;
let COLOR = "#000000";
let SIZE = 5;
const targets = [];
let STATE = false;

function drawPixel(x, y) {
  if (canvas.getContext) {
    ctx.beginPath();
    ctx.arc(x, y, SIZE, 0, 2 * Math.PI);
    ctx.fillStyle = `${COLOR}`;
    ctx.fill();
  }
}

console.log(color);

color.addEventListener("change", (e) => {
  COLOR = e.target.value;
  console.log(COLOR);
});

canvas.addEventListener("mousedown", () => {
  STATE = true;
  canvas.addEventListener("mousemove", (e) => {
    if (STATE === true) {
      targets.push(e);

      targets.forEach((t) => {
        if (COLOR && SIZE) {
          drawPixel(Math.round(t.offsetX), Math.round(t.offsetY));
        }
      });
    }
  });
});

canvas.addEventListener("mouseup", () => {
  STATE = false;
});
