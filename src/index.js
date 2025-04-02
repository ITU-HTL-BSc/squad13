let fpsCounter = 0;
let fps = 0;

onload = () => {
    can = document.querySelector('canvas');
    can.width = CANVAS_WIDTH;
    can.height = CANVAS_HEIGHT;

    ctx = can.getContext('2d');

    onresize();

    G = new Game();

    lastFrame = performance.now();
    frame();
}

frame = () => {
    const current = performance.now();
    const elapsed = (current - lastFrame) / 1000;
    lastFrame = current;

    fpsCounter++;

    G.cycle(elapsed);

    // Optional: Display FPS on canvas
    ctx.fillStyle = 'white';
    ctx.font = '16px Arial';
    ctx.fillText(`FPS: ${fps}`, 10, 20);

    requestAnimationFrame(frame);
}

setInterval(() => {
    fps = fpsCounter;
    fpsCounter = 0;
    console.log(fps)
  }, 1000)