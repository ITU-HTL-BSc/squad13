let fpsCounter = 0;
let fps = 0;
let keyPress = 0;

onload = () => {
  can = document.querySelector("canvas");
  can.width = CANVAS_WIDTH;
  can.height = CANVAS_HEIGHT;

  ctx = can.getContext("2d");

  onresize();

  G = new Game();

  lastFrame = performance.now();
  frame();

  window.addEventListener("keydown", (e) => {
    keyPress++;
  });

  window.addEventListener("keyup", (e) => {
    keyPress++;
  });
};

frame = () => {
  const current = performance.now();
  const elapsed = (current - lastFrame) / 1000;
  lastFrame = current;

  fpsCounter++;

  G.cycle(elapsed);

  // Optional: Display FPS on canvas
  ctx.fillStyle = "white";
  ctx.font = "16px Arial";
  ctx.fillText(`FPS: ${fps}`, 10, 20);

  requestAnimationFrame(frame);
};

setInterval(() => {
  sendMetrics(fps, keyPress);
  keyPress = 0;
  fps = fpsCounter;
  fpsCounter = 0;
}, 1000);

function sendMetrics(fps, keyPress) {
  fetch(`http://localhost:3000/metric?fps=${fps}&keyPress=${keyPress}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
