var c = document.getElementById("Canvas");
var ctx = c.getContext("2d");

var cwidth, cheight;
var shells = [];
var pass = [];

var colors = [
  "#FF5252",
  "#FF4081",
  "#E040FB",
  "#7C4DFF",
  "#536DFE",
  "#448AFF",
  "#40C4FF",
  "#18FFFF",
  "#64FFDA",
  "#69F0AE",
  "#B2FF59",
  "#EEFF41",
  "#FFFF00",
  "#FFD740",
  "#FFAB40",
  "#FF6E40",
  "#FF0000",
  "#FF8000",
  "#FFA500",
  "#FFFF00",
  "#808000",
  "#00FF00",
  "#008000",
  "#00FFFF",
  "#0000FF",
  "#4B0082",
  "#9400D3",
  "#800080",
  "#FF00FF",
  "#800000",
  "#008080",
  "#000080",
  "#000000",
  "#808080",
  "#FFFFFF",
];

window.onresize = function () {
  reset();
};
reset();
function reset() {
  cwidth = window.innerWidth;
  cheight = window.innerHeight;
  c.width = cwidth;
  c.height = cheight;
}

function newShell() {


  let maVar = Math.random();
  console.log(maVar);

  var left = maVar > 0.5;
  var shell = {};
  shell.x = 1 * left;
  shell.y = 1;
  shell.xoff = (0.01 + Math.random() * 0.007) * (left ? 1 : -1);
  shell.yoff = 0.01 + Math.random() * 0.007;
  shell.size = Math.random() * 8 + 4;
  shell.color = colors[Math.floor(Math.random() * colors.length)];

  shells.push(shell);
}

function newPass(shell) {
  var pasCount = Math.ceil(Math.pow(shell.size, 4) * Math.PI);

  for (i = 0; i < pasCount; i++) {
    var pas = {};
    pas.x = shell.x * cwidth;
    pas.y = shell.y * cheight;

    var a = Math.random() * 4;
    var s = Math.random() * 10;

    pas.xoff = s * Math.sin((5 - a) * (Math.PI / 2));
    pas.yoff = s * Math.sin(a * (Math.PI / 2));

    pas.color = shell.color;
    pas.size = Math.sqrt(shell.size);

    if (pass.length < 1000) {
      pass.push(pas);
    }
  }
}

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 15) + 1]; 
  }
  return color;
}

var lastRun = 0;
Run();
function Run() {
  var dt = 1;
  if (lastRun != 0) {
    dt = Math.min(50, performance.now() - lastRun);
  }
  lastRun = performance.now();

  ctx.fillStyle = "rgba(0,0,0,0.25)";
  ctx.fillRect(0, 0, cwidth, cheight);

  if (shells.length < 10 && Math.random() > 0.96) {
    newShell();
  }

  for (let ix in shells) {
    var shell = shells[ix];

    ctx.beginPath();
    ctx.arc(shell.x * cwidth, shell.y * cheight, shell.size, 0, 2 * Math.PI);
    ctx.fillStyle = shell.color;
    ctx.fill();

    shell.x -= shell.xoff;
    shell.y -= shell.yoff;
    shell.xoff -= shell.xoff * dt * 0.001;
    shell.yoff -= (shell.yoff + 0.2) * dt * 0.00005;

    if (shell.yoff < -0.005) {
      newPass(shell);
      shells.splice(ix, 1);
    }
  }

  for (let ix in pass) {
    var pas = pass[ix];

    ctx.beginPath();
    ctx.arc(pas.x, pas.y, pas.size, 0, 2 * Math.PI);
    ctx.fillStyle = pas.color;
    ctx.fill();

    pas.x -= pas.xoff;
    pas.y -= pas.yoff;
    pas.xoff -= pas.xoff * dt * 0.001;
    pas.yoff -= (pas.yoff + 5) * dt * 0.0005;
    pas.size -= dt * 0.002 * Math.random();

    if (pas.y > cheight || pas.y < -50 || pas.size <= 0) {
      pass.splice(ix, 1);
    }
  }

  ctx.fillStyle = "white";

  ctx.beginPath();
  ctx.arc(c.width / 2 + 50, c.height / 2 - 200, 40, 0, 2 * Math.PI);
  ctx.fill();

  setInterval(function () {
    var fontSize = Math.min(window.innerWidth / 17, 60);
    ctx.font = fontSize + "px serif";
    ctx.fillStyle = getRandomColor();
    ctx.fillText("HAPPY NEW YEAR 2026, lady Rose", c.width / 7, c.height / 2);
    ctx.fillText("Best Wishes for this new year. Health, Peace and God Grace in your life. ", c.width / 5.5, c.height / 1.5);
  }, 1500);

  requestAnimationFrame(Run);
}


