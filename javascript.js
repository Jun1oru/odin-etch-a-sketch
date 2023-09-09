const gridContainer = document.querySelector('.container');
const gridButton = document.querySelector('#grid-button');
const modeButton = document.querySelector('#mode-button');

const DEFAULT_COLOR = '000000';
const DEFAULT_MODE = 'normal';
const DEFAULT_SIZE = 16;


let gridDivArr = [];
let gridSize = DEFAULT_SIZE;

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;

gridSetup();

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

modeButton.addEventListener('click', function() {
    if(currentMode === 'normal') {
        modeButton.textContent = 'Random';
        return currentMode = 'random';
    } else if(currentMode === 'random') {
        modeButton.textContent = 'Normal';
        currentColor = DEFAULT_COLOR;
        return currentMode = 'normal';
    }
})

gridButton.addEventListener('click', function() {
    gridSize = prompt('Please enter grid size(ex: 16 for 16x16): ', '16');
    if(gridSize === '') {
        return alert('You must insert a value!');
    } else if(gridSize) {
        while(isNaN(gridSize)) {
            gridSize = prompt('Please enter grid size(only numbers): ', '16');
            if(gridSize === '') {
                return alert('You must insert a value!');
            }
        }
        if(gridSize > 64) {
            return alert("You can't set grid size over 64!");
        }
        return gridSetup();
    }
})

function gridSetup() {
    if(gridContainer.innerHTML != '') {
        gridContainer.innerHTML = '';
    }
    for(let i = 0; i < gridSize; i++) {
        gridDivArr[i] = [];
        for(let j = 0; j < gridSize; j++) {
            const gridDiv = document.createElement('div');
            gridDiv.style.width = `${gridContainer.clientWidth/gridSize}px`;
            gridDiv.style.minHeight = `${gridContainer.clientHeight/gridSize}px`;
            gridDiv.style.border = 'solid 1px black';
            gridDivArr[i][j] = gridDiv;
            gridDivArr[i][j].addEventListener('mouseover', function(e) {
                if(e.button == 0) {
                    hoverGrid(this, e);
                }
            });
            gridDivArr[i][j].addEventListener('mousedown', function(e) {
                if(e.button == 0) {
                    hoverGrid(this, e);
                }
            });
            gridContainer.appendChild(gridDiv);
        }
    }
}

function randomColor() {
    let randomColor = '';
    let randomNumber = Math.floor(Math.random() * 16);
    while(randomColor.length != 6) {
        switch(randomNumber) {
            case 10:
                randomColor += 'A';
                break;
            case 11:
                randomColor += 'B';
                break;
            case 12:
                randomColor += 'C';
                break;
            case 13:
                randomColor += 'D';
                break;
            case 14:
                randomColor += 'E';
                break;
            case 15:
                randomColor += 'F';
                break;
            default:
                randomColor += randomNumber;
                break;
        }
        randomNumber = Math.floor(Math.random() * 16);
    }
    return randomColor;
}

function hoverGrid(id, e) {
    if(e.type === 'mouseover' && !mouseDown) return;
    if(currentMode === 'normal') {
        return id.style.backgroundColor = `#${currentColor}`;
    } else if(currentMode === 'random') {
        currentColor = randomColor();
        return id.style.backgroundColor = `#${currentColor}`;
    }
}