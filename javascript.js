// Variables

const gridContainer = document.querySelector('.container');
const gridSlider = document.querySelector('#grid-slider');
const gridSliderValue = document.querySelector('#grid-size');
const gridResetButton = document.querySelector('#reset-button');

const modeButton = document.querySelector('#mode-button');
const infiniteButton = document.querySelector('#infinite-ink');
const refillButton = document.querySelector('#refill-ink');

const colorPicker = document.querySelector('#color-picker');
const colour = document.querySelector('#colour');

const DEFAULT_COLOR = '0, 0, 0';
const DEFAULT_MODE = 'normal';
const DEFAULT_SIZE = 16;

let infiniteInk = true;
let colorCount = 100;

let gridSize = DEFAULT_SIZE;

let currentColor = `rgb(${DEFAULT_COLOR})`;
colorPicker.style.backgroundColor = `rgb(${DEFAULT_COLOR})`;
let currentMode = DEFAULT_MODE;

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

// Variables

modeButton.addEventListener('click', function() {
    if(currentMode === 'normal') {
        modeButton.textContent = 'Random';
        return currentMode = 'random';
    } else if(currentMode === 'random') {
        modeButton.textContent = 'Normal';
        currentColor = `${colorPicker.style.backgroundColor}`;
        return currentMode = 'normal';
    }
});

colour.addEventListener('change', function() {
    currentColor = `${this.value}`;
    colorCount = 100;
    return colorPicker.style.backgroundColor = `${this.value}`;
});

colorPicker.addEventListener('click', function() {
    return colour.click();
});

gridSlider.addEventListener('input', function() {
    gridSliderValue.textContent = `${this.value} X ${this.value}`;
    gridSize = this.value;
    return gridSetup(gridSize);
});

gridResetButton.addEventListener('click', function() {
    gridSetup(gridSize);
});

infiniteButton.addEventListener('click', function() {
    infiniteMode();
});

refillButton.addEventListener('click', function() {
    if(!infiniteInk)
        return colorCount = 100;
});

function gridReset() {
    gridContainer.innerHTML = '';
}

function gridSetup(gridSize) {
    gridReset();

    gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, ${gridContainer.clientWidth/gridSize}px)`;
    gridContainer.style.gridTemplateRows = `repeat(${gridSize}, ${gridContainer.clientHeight/gridSize}px)`;

    colorCount = 100;

    for(let i = 0; i < gridSize * gridSize; i++) {
        const gridElement = document.createElement('div');
        gridElement.classList.add('grid');
        gridElement.addEventListener('mouseover', hoverGrid);
        gridElement.addEventListener('mousedown', hoverGrid);
        gridContainer.appendChild(gridElement);
    }
};

function randomColor() {
    let randomColor = '';

    let r = Math.floor(Math.random() * 256);

    let g = Math.floor(Math.random() * 256);

    let b = Math.floor(Math.random() * 256);

    return randomColor = `${r}, ${g}, ${b}`;
}

function infiniteMode(e) {
    if(infiniteInk) {
        infiniteButton.textContent = 'Not Infinite';
        refillButton.style.display = 'block';
        infiniteInk = false;
        colorCount = 100;
    } else {
        infiniteButton.textContent = 'Infinite';
        refillButton.style.display = 'none';
        infiniteInk = true;
    }
}

function hoverGrid(e) {
    if(e.type === 'mouseover' && !mouseDown) return;
    if(e.button !== 0) return;
    if(currentMode === 'normal') {
        if(infiniteInk) {
            e.target.style.backgroundColor = `${currentColor}`;
            e.target.style.filter = 'brightness(100%)';
        } else {
            e.target.style.backgroundColor = `${currentColor}`;
            if(colorCount >= 10) {
                e.target.style.filter = `brightness(${colorCount}%)`;
                return colorCount -= 10;
            }
            e.target.style.filter = 'brightness(0%)';
        }
    } else if(currentMode === 'random') {
        currentColor = randomColor();
        e.target.style.filter = 'brightness(100%)';
        return e.target.style.backgroundColor = `rgb(${currentColor})`;
    }
}

gridSetup(gridSize);