let DOWN = {};

onkeydown = e => {
  if (!DOWN[e.keyCode]) {
    DOWN[e.keyCode] = true;
    sendLog("info", `Key pressed: ${e.code} (${e.keyCode})`);
  }
};

onkeyup = e => {
  DOWN[e.keyCode] = false;
  sendLog("info", `Key released: ${e.code} (${e.keyCode})`);
};

// Reset inputs when window loses focus
onblur = onfocus = () => {
  DOWN = {};
  MOUSE_RIGHT_DOWN = MOUSE_DOWN = false;
};

async function sendLog(level, msg) {
    await fetch("http://localhost:3000/log", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ level: level, msg: msg }),
    });
};
