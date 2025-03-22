"use strict";

const body = document.querySelector("body");
const color = document.querySelector("#color");
const canvas = document.getElementById("container");
const range = document.getElementById("range");
const reset = document.getElementById("reset");
const pencil = document.getElementById("pencil");
const rubber = document.getElementById("rubber");
const ctx = canvas.getContext("2d");
const form = document.querySelectorAll("form");

let COLOR = "#000000";
let SIZE = 5;
let STATE = false;
let lastX = 0;
let lastY = 0;
let FOCUS = "pencil";
let x, y;

form.forEach((d) => {
  d.addEventListener("change", (c) => {
    COLOR = c.target.value;
  });
});

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
  if (SIZE <= 5) SIZE += 2;
});

reset.addEventListener("click", (e) => {
  e.preventDefault();
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
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
  if (canvas.getContext) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, 2 * Math.PI);
    ctx.fillStyle = FOCUS === "pencil" ? color : "#FFFFFF";
    ctx.fill();
  }
}

canvas.addEventListener("mousedown", (e) => {
  STATE = true;
  lastX = e.offsetX;
  lastY = e.offsetY;
  drawPixel(lastX, lastY, COLOR, SIZE);
});

canvas.addEventListener("mouseup", () => {
  STATE = false;
});

canvas.addEventListener("mousemove", (e) => {
  if (STATE) {
    let deltaX = e.offsetX - lastX;
    let deltaY = e.offsetY - lastY;
    let distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    let steps = Math.ceil(distance / (SIZE * 0.5));

    for (let i = 0; i < steps; i++) {
      let stepX = lastX + (deltaX / steps) * i;
      let stepY = lastY + (deltaY / steps) * i;
      drawPixel(stepX, stepY, COLOR, SIZE);
    }
    lastX = e.offsetX;
    lastY = e.offsetY;
  }
});
