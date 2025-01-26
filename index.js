const canvasHeader = document.getElementById('headerCanvas');
const ctxHeader = canvasHeader.getContext('2d');


canvasHeader.width = window.innerWidth;
canvasHeader.height = 100;


const links = [
    { text: 'Home', x: 200, y: 40, width: 50, height: 30, url: 'index.html' },
    { text: 'TicTackToe', x: 270, y: 40, width: 60, height: 30, url: 'tic-tack-toe.html' },
    { text: 'Contact', x: 380, y: 40, width: 80, height: 30, url: 'contact.html' },
];


const logo = { text: 'MyLogo', x: 20, y: 50 };


const phoneInput = {
    x: window.innerWidth - 250,
    y: 40,
    width: 200,
    height: 30,
    text: 'Enter phone...',
    value: '',
    active: false,
};


let isInputActive = false;


function drawHeader() {
    ctxHeader.clearRect(0, 0, canvasHeader.width, canvasHeader.height);
    ctxHeader.fillStyle = '#333';
    ctxHeader.fillRect(0, 0, canvasHeader.width, canvasHeader.height);


    ctxHeader.fillStyle = '#fff';
    ctxHeader.font = '24px Arial';
    ctxHeader.fillText(logo.text, logo.x, logo.y);


    links.forEach(link => {
        ctxHeader.fillStyle = '#fff';
        ctxHeader.font = '18px Arial';
        ctxHeader.fillText(link.text, link.x, link.y);
    });


    ctxHeader.fillStyle = '#fff';
    ctxHeader.strokeStyle = phoneInput.active ? '#00f' : '#fff';
    ctxHeader.strokeRect(phoneInput.x, phoneInput.y, phoneInput.width, phoneInput.height);

    ctxHeader.font = '16px Arial';
    ctxHeader.fillStyle = '#000';
    ctxHeader.fillRect(phoneInput.x, phoneInput.y, phoneInput.width, phoneInput.height);
    ctxHeader.fillStyle = '#555';
    ctxHeader.fillText(
        phoneInput.value || phoneInput.text,
        phoneInput.x + 10,
        phoneInput.y + 20
    );
}

function checkLinkClick(x, y) {
    for (const link of links) {
        if (
            x >= link.x &&
            x <= link.x + link.width &&
            y >= link.y - 20 &&
            y <= link.y + 10
        ) {
            window.location.href = link.url;
        }
    }
}

function checkInputClick(x, y) {
    if (
        x >= phoneInput.x &&
        x <= phoneInput.x + phoneInput.width &&
        y >= phoneInput.y &&
        y <= phoneInput.y + phoneInput.height
    ) {
        phoneInput.active = true;
        isInputActive = true;
    } else {
        phoneInput.active = false;
        isInputActive = false;
    }
    drawHeader();
}

canvasHeader.addEventListener('click', (e) => {
    const rect = canvasHeader.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    checkLinkClick(x, y);
    checkInputClick(x, y);
});

window.addEventListener('keydown', (e) => {
    if (isInputActive) {
        if (e.key === 'Backspace') {
            phoneInput.value = phoneInput.value.slice(0, -1);
        } else if (e.key.length === 1) {
            phoneInput.value += e.key;
        }
        drawHeader();
    }
});


drawHeader();

// =================================================================

const drawingCanvas = document.getElementById('drawingCanvas');
const ctxDrawing = drawingCanvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const brushSize = document.getElementById('brushSize');

let drawing = false;
let currentColor = colorPicker.value;
let currentBrushSize = brushSize.value;


    colorPicker.addEventListener('input', () => {
        currentColor = colorPicker.value;
    });

    brushSize.addEventListener('input', () => {
        currentBrushSize = brushSize.value;
    });


drawingCanvas.addEventListener('mousedown', (e) => {
        drawing = true;
        ctxDrawing.beginPath();
        ctxDrawing.moveTo(e.offsetX, e.offsetY);
    });


drawingCanvas.addEventListener('mousemove', (e) => {
        if (drawing) {
            ctxDrawing.lineTo(e.offsetX, e.offsetY);
            ctxDrawing.strokeStyle = currentColor;
            ctxDrawing.lineWidth = currentBrushSize;
            ctxDrawing.lineCap = 'round';
            ctxDrawing.stroke();
        }

    });

drawingCanvas.addEventListener('mouseup', () => {
        drawing = false;
        ctxDrawing.closePath();
    });

drawingCanvas.addEventListener('mouseleave', () => {
        drawing = false;
        ctxDrawing.closePath();
    });


