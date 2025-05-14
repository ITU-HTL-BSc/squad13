let fpsCounter = 0;
let fps = 0;

let testRunning = false;
let fpsTestSum = 0;
let fpsTestCount = 0;

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
    if (e.key === "b") {
      startMacro();
    }
  });
};

frame = async () => {
  const current = performance.now();
  const elapsed = (current - lastFrame) / 1000;
  lastFrame = current;

  fpsCounter++;

  await G.cycle(elapsed);

  // Optional: Display FPS on canvas
  ctx.fillStyle = "white";
  ctx.font = "16px Arial";
  ctx.fillText(`FPS: ${fps}`, 10, 20);

  requestAnimationFrame(frame);
};

setInterval(() => {
  fps = fpsCounter;
  if (testRunning){
    fpsTestSum += fps;
    fpsTestCount++;
  }
  fpsCounter = 0;
}, 1000);

function sendMetrics(fps) {
  fetch(`http://localhost:3000/metric?fps=${fps}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

function simulateKey(type, key, code, keyCode) {
  const event = new KeyboardEvent(type, {
    key,
    code,
    keyCode,
    bubbles: true,
  });
  document.dispatchEvent(event);
}

const runTime = 30 * 1000;
function startTest() {
  testRunning = true;
  const pressesPerSecond = 10;
  const delayBetweenPress = 1000 / pressesPerSecond;

  const macroIntervalId = setInterval(() => {
    simulateKey("keyup", " ", "Space", 32);
  }, delayBetweenPress);

  setTimeout(() => {
    clearInterval(macroIntervalId);
    testRunning = false;
    avgFps = fpsTestSum / fpsTestCount;
    fpsTestSum = 0;
    fpsTestCount = 0;
    sendMetrics(avgFps);
  }, runTime);
}

async function startMacro() {
  for (let i = 0; i < 3; i++) {
    startTest();
    await new Promise((resolve) => setTimeout(resolve, runTime + 4000));
  }
}