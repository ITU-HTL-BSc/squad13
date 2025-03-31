let DOWN = {};
const id = Math.random().toString(36).substring(2, 15);

const sendLog = async (level, msg) => {
  const response = await fetch("http://localhost:3000/log", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ level: level, id: id, msg: msg }),
  });
  return response;
};

// Original keyboard event handlers with simple console logging
onkeydown = async (e) => {
  if (!DOWN[e.keyCode]) {
    console.log(`Key pressed: ${e.code} (${e.keyCode})`);
    await sendLog("info", `Key pressed: ${e.code} (${e.keyCode})`);
  }
  DOWN[e.keyCode] = true;
};

onkeyup = async (e) => {
  console.log(`Key released: ${e.code} (${e.keyCode})`);
  await sendLog("info", `Key released: ${e.code} (${e.keyCode})`);
  DOWN[e.keyCode] = false;
};

// Reset inputs when window loses focus
onblur = onfocus = () => {
  DOWN = {};
  MOUSE_RIGHT_DOWN = MOUSE_DOWN = false;
};

// while (true) {
//     sendLog("info", "test");
// }
