"use strict";

/* Functions:


Radiergummi
exact color switcher
share function/ take ss
ui
size, color stay
reset button

*/

const body = document.querySelector("body");
const color = document.querySelector("#color");
const canvas = document.getElementById("container");
const range = document.getElementById("range");
const reset = document.getElementById("reset");
const ctx = canvas.getContext("2d");

let RED, GREEN, BLUE, YELLOW, BLACK;
const targets = [];
let COLOR = "#000000";
let SIZE = 10;
let STATE = false;
let lastX = 0;
let lastY = 0;
let LEFT, RIGHT, UP, DOWN;

function drawPixel(x, y, color, size) {
  if (canvas.getContext) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();

    if (RIGHT) {
      ctx.beginPath();
      ctx.arc(x + 2, y, size, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x + 3, y, size, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x + 4, y, size, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();
    }
    if (LEFT) {
      ctx.beginPath();
      ctx.arc(x - 2, y, size, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x - 3, y, size, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x - 4, y, size, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();
    }
    if (DOWN) {
      ctx.beginPath();
      ctx.arc(x, y - 2, size, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x, y - 3, size, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x, y - 4, size, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();
    }
    if (UP) {
      ctx.beginPath();
      ctx.arc(x, y + 2, size, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x, y + 3, size, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x, y + 4, size, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();
    }
  }
}

canvas.addEventListener("mouseup", () => {
  STATE = false;
});

color.addEventListener("change", (e) => {
  COLOR = e.target.value;
  console.log(COLOR);
});

canvas.addEventListener("mousedown", (t) => {
  const newColor = COLOR;
  const newSize = SIZE;

  if (newColor && newSize) {
    drawPixel(Math.round(t.offsetX), Math.round(t.offsetY), newColor, newSize);
  }
  STATE = true;
  canvas.addEventListener("mousemove", (e) => {
    const timestamp = new Date();
    const newColor = COLOR;
    const newSize = SIZE;

    if (STATE === true) {
      targets.push(e, newColor, newSize, timestamp);
      if (targets.length >= 200) {
        targets.splice(0, 199);
      }

      targets.forEach((t) => {
        if (newColor && newSize) {
          drawPixel(
            Math.round(t.offsetX),
            Math.round(t.offsetY),
            newColor,
            newSize
          );
        }
      });
    }
  });
});

range.addEventListener("change", (e) => {
  SIZE = e.target.valueAsNumber / 2;
  if (SIZE <= 5) {
    SIZE += 2;
  }
  console.log(SIZE);
});

canvas.addEventListener("mousemove", (e) => {
  const deltaX = e.clientX - lastX;
  const deltaY = e.clientY - lastY;

  if (deltaX > 0) {
    RIGHT = true;
  } else if (deltaX < 0) {
    LEFT = true;
  }

  if (deltaY > 0) {
    UP = true;
  } else if (deltaY < 0) {
    DOWN = true;
  }

  lastX = e.clientX;
  lastY = e.clientY;
});

reset.addEventListener("click", (e) => {
  e.preventDefault();
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  targets.splice(0, targets.length);
});
