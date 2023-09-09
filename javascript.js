const gridContainer = document.querySelector('.container');
const gridButton = document.querySelector('#grid-button');

let gridDivArr = [];
let gridSize = 16;

gridSetup();

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

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
                hoverGrid(this, e);
            });
            gridDivArr[i][j].addEventListener('mousedown', function(e) {
                hoverGrid(this, e);
            })
            gridContainer.appendChild(gridDiv);
        }
    }
}

function hoverGrid(id, e) {
    if(e.type === 'mouseover' && !mouseDown) return;
    id.style.backgroundColor = 'black';
}