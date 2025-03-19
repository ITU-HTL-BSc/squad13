let DOWN = {};

// Original keyboard event handlers with simple console logging
onkeydown = e => {
    if (!DOWN[e.keyCode]) {
        console.log(`Key pressed: ${e.keyCode} (${e.key})`);
    }
    DOWN[e.keyCode] = true;
};

onkeyup = e => {
    console.log(`Key released: ${e.keyCode} (${e.key})`);
    DOWN[e.keyCode] = false;
};

// Reset inputs when window loses focus
onblur = onfocus = () => {
    DOWN = {};
    MOUSE_RIGHT_DOWN = MOUSE_DOWN = false;
};
