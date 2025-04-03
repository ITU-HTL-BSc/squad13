let DOWN = {};
let keyLogQueue = [];

function pushLogToQueue(msg) {
  keyLogQueue.push({
    level: "info",
    msg: msg
  });
}

onkeydown = e => {
  if (!DOWN[e.keyCode]) {
    DOWN[e.keyCode] = true;
    pushLogToQueue(`Key pressed: ${e.code} (${e.keyCode})`);
    console.log(`Key pressed: ${e.code} (${e.keyCode})`);
  }
};

onkeyup = e => {
  DOWN[e.keyCode] = false;
  pushLogToQueue(`Key released: ${e.code} (${e.keyCode})`);
  console.log(`Key released: ${e.code} (${e.keyCode})`);
};

// Reset inputs when window loses focus
onblur = onfocus = () => {
  DOWN = {};
  MOUSE_RIGHT_DOWN = MOUSE_DOWN = false;
};
