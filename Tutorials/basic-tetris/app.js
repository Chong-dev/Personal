document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const scoreDisplay = document.querySelector('#score');
    const startBtn = document.querySelector('#start-btn');
    const width = 10;
    let nextRandom = 0;

    //  The Tetrominoes
    const lTetromino = [
        [1, width + 1, width * 2 + 1, 2],
        [width, width + 1, width + 2, width * 2 + 2],
        [1, width + 1, width * 2 + 1, width * 2],
        [width, width * 2, width * 2 + 1, width * 2 + 2]
    ]

    const zTetromino = [
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2 , width * 2, width * 2 + 1],
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2 , width * 2, width * 2 + 1]
    ]

    const tTetromino = [
        [1, width, width + 1, width + 2],
        [1, width + 1, width + 2, width * 2 + 1],
        [width, width + 1, width + 2, width * 2 + 1],
        [1, width, width + 1, width * 2 + 1]
    ]

    const oTetromino = [
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1]
    ]

    const iTetromino = [
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3],
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3]
    ]

    const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];

    let currentPos = 4;
    let currentRot = 0;

    //  Select Random Tetromino and Rotation
    let random = Math.floor(Math.random() * theTetrominoes.length);
    let current = theTetrominoes[random][currentRot];

    // Draw the Tetromino
    function draw() {
        current.forEach(index => {
            squares[currentPos + index].classList.add('tetromino');
        })
    }

    //  Undraw the Tetromino
    function undraw() {
        current.forEach(index => {
            squares[currentPos + index].classList.remove('tetromino');
        })
    }

    //  Tetromino Movement Timer
    timerId = setInterval(moveDown, 500);

    //Asign Functions to KeyCodes
    function control(e) {
        if(e.keyCode === 37) {
            moveLeft();
        }
        else if(e.keyCode === 38) {
            rotate();
        }
        else if(e.keyCode === 39) {
            moveRight();
        }
        else if(e.keyCode === 40) {
            //moveDown();
        }
    }

    document.addEventListener('keyup', control);

    // Move Down Function
    function moveDown() {
        undraw();
        currentPos += width;
        draw();
        freeze();
    }

    //  Freeze Function
    function freeze() {
        if(current.some(index => squares[currentPos + index + width].classList.contains('taken'))) {
            current.forEach(index => squares[currentPos + index].classList.add('taken'));

            // Spawn New Tetromino
            random = nextRandom;
            nextRandom = Math.floor(Math.random() * theTetrominoes.length);
            current = theTetrominoes[random][currentRot];
            currentPos = 4;
            draw();
            displayShape();
        }
    }

    //  Movement Left + Edge Collision
    function moveLeft() {
        undraw();
        const leftEdge = current.some(index => (currentPos + index) % width === 0);

        if(!leftEdge) currentPos -= 1;

        if(current.some(index => squares[currentPos + index].classList.contains('taken'))) {
            currentPos += 1;
        }

        draw();
    }

    //  Movement Right + Edge Collision
    function moveRight() {
        undraw();
        const rightEdge = current.some(index => (currentPos + index) % width === width - 1);

        if(!rightEdge) currentPos +=1;

        if(current.some(index => squares[currentPos + index].classList.contains('taken'))) {
            currentPos -= 1;
        }
        draw();
    }

    //  Rotate Tetromino
    function rotate() {
        undraw();
        currentRot ++;
        if(currentRot === current.length) {
            currentRot = 0;
        }
        current = theTetrominoes[random][currentRot];
        draw();
    }

    //  Display Next Up - Grid
    const displaySquares = document.querySelectorAll('.mini-grid div');
    const displayWidth = 4;
    let displayIndex = 0;

    // Static Tetrimino
    const upNextTet = [
        //  lTetromino
        [1, displayWidth + 1, displayWidth * 2 + 1, 2],
        //  zTetromino
        [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1],
        // tTetromino
        [1, displayWidth, displayWidth + 1, displayWidth + 2],
        //  oTetromino
        [0, 1, displayWidth, displayWidth + 1],
        //  iTetromino
        [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1]
    ]

    // Display Next Up - Shape
    function displayShape() {
        //  Remove Tetromino From Grid
        displaySquares.forEach(square => {
            square.classList.remove('tetromino');
        })
        upNextTet[nextRandom].forEach(index => {
            displaySquares[displayIndex + index].classList.add('tetromino');
        });
    }
})
