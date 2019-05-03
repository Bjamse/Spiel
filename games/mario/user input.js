KEY_CODES = {
    32: 'space',
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
};

KEY_STATUS = {};
for (code in KEY_CODES) {
    KEY_STATUS[ KEY_CODES[ code ]] = false;
}

document.onkeydown = function(e) {
    let keyCode = (e.keyCode) ? e.keyCode : e.charCode;
    if (KEY_CODES[keyCode]) {
        e.preventDefault();
        KEY_STATUS[KEY_CODES[keyCode]] = true;
    }
};

document.onkeyup = function(e) {
    let keyCode = (e.keyCode) ? e.keyCode : e.charCode;
    if (KEY_CODES[keyCode]) {
        e.preventDefault();
        KEY_STATUS[KEY_CODES[keyCode]] = false;
    }
};