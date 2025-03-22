"use strict";

/* Functions to add:

exact color switcher
share function/ take ss

*/

const body = document.querySelector("body");
const color = document.querySelector("#color");
const canvas = document.getElementById("container");
const range = document.getElementById("range");
const reset = document.getElementById("reset");
const pencil = document.getElementById("pencil");
const rubber = document.getElementById("rubber");
const ctx = canvas.getContext("2d");

const form = document.querySelectorAll("form");

let RED, GREEN, BLUE, YELLOW, BLACK;
const targets = [];
let COLOR = "#000000";
let SIZE = 5;
let STATE = false;
let lastX = 0;
let lastY = 0;
let FOCUS = "pencil";
let LEFT = false,
  RIGHT = false,
  UP = false,
  DOWN = false;
let x, y;

canvas.addEventListener("mousemove", (e) => {
  x = e.offsetX;
  y = e.offsetY;
});

color.addEventListener("change", (e) => {
  COLOR = e.target.value;
  console.log(COLOR);
});

range.addEventListener("change", (e) => {
  SIZE = e.target.valueAsNumber / 2;
  if (SIZE <= 5) {
    SIZE += 2;
  }
  console.log(SIZE);
});

form.forEach((i) => {
  i.addEventListener("change", (v) => {
    v.preventDefault();
    COLOR = v.target.value;
  });
});

reset.addEventListener("click", (e) => {
  e.preventDefault();
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  targets.splice(0, targets.length);
  color.value = "#000000";
  range.value = 5;
  SIZE = 5;
  COLOR = "#000000";
  FOCUS = "pencil";
});

pencil.addEventListener("focus", (e) => {
  e.preventDefault();
  FOCUS = "pencil";
});

rubber.addEventListener("focus", (e) => {
  e.preventDefault();
  FOCUS = "rubber";
});

function drawPixel(x, y, color, size) {
  if (FOCUS === "pencil") {
    if (canvas.getContext) {
      ctx.beginPath();
      ctx.arc(x, y, size, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();
    }
  } else if (FOCUS === "rubber") {
    if (canvas.getContext) {
      ctx.beginPath();
      ctx.arc(x, y, 50, 0, 2 * Math.PI);
      ctx.fillStyle = "#FFFFFF";
      ctx.fill();
    }
  }
}

canvas.addEventListener("mouseup", () => {
  STATE = false;
});

canvas.addEventListener("mousedown", (t) => {
  const newColor = COLOR;
  const newSize = SIZE;

  if (newColor && newSize) {
    drawPixel(Math.round(x), Math.round(y), newColor, newSize);
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

      targets.forEach(() => {
        if (newColor && newSize) {
          drawPixel(Math.round(x), Math.round(y), newColor, newSize);
        }
      });
    }
  });
});

canvas.addEventListener("mousedown", (t) => {
  const newColor = COLOR;
  const newSize = SIZE;
  STATE = true;

  drawPixel(Math.round(t.offsetX), Math.round(t.offsetY), newColor, newSize);

  canvas.addEventListener("mousemove", onMouseMove);
});

canvas.addEventListener("mouseup", () => {
  STATE = false;
  canvas.removeEventListener("mousemove", onMouseMove);
});

function onMouseMove(e) {
  if (STATE) {
    const newColor = COLOR;
    const newSize = SIZE;

    if (newColor && newSize) {
      drawPixel(
        Math.round(e.offsetX),
        Math.round(e.offsetY),
        newColor,
        newSize
      );
    }
  }
}

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
