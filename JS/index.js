// Game constants
let inputDir = {x: 0,y: 0};
const foodSound = new Audio('../music/Snake_burp1.mp3')
const gameOverSound = new Audio('../music/error.wav');
const moveSound = new Audio('../music/move.ogg');
const musicSound = new Audio('../music/music.mp3');
let speed = 19;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13, y:15}
]
food = {x: 2, y: 5};



// Game functions
function main(ctime){
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    };
    lastPaintTime = ctime;
    gameEngine();
}



function isCollide(snake) {
    // If you bump into yourself
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        };

    };    
        
    if ((snake[0].x >= 18 || snake[0].x <= 0 ) || (snake[0].y <= 0 || snake[0].y >= 18)) {
            return true;
    };
    

    return false;
}



function gameEngine() {
    // Function for Game Over
    // Part 1: Updating the snake array & Food
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x: 0, y: 0}
        alert("Game Over. Press any key to play again.");
        snakeArr = [ {x: 13, y: 15} ];
        musicSound.play();
        score = 0;

        
    }

    // If you've eaten the food, increament the score and regenerate the food
    if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
        score+=1;
        if (score > highscoreVal)
        {
            highscoreVal = score;
            localStorage.setItem("highscore", JSON.stringify(highscoreVal));
            highscoreBox.innerHTML = "High Score: " + highscoreVal;

        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x , y: snakeArr[0].y + inputDir.y})
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)*Math.random()), y: Math.round(a + (b-a)*Math.random())}
        foodSound.play()
        // To generate an random number n, between a & b : n = Math.round(a + (b - a)* Math.random())
    }

    // Moving the snake
    for (let i = snakeArr.length -2; i>=0; i--){
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x; 
    snakeArr[0].y += inputDir.y; 
    musicSound.play();                    // It will play the background music

    // Part 2:
    // Display the snake 
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0){
        snakeElement.classList.add('head');
        }
        else{
             snakeElement.classList.add('snake');
            }
        board.appendChild(snakeElement);
    })

    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);
}


// Main logic starts here
// Displaying High Score
let highscore = localStorage.getItem("highscore");
if (highscore === null)
{
    highscoreVal = 0;
    localStorage.setItem("highscore",JSON.stringify(highscoreVal));
}
else{
    highscoreVal = JSON.parse(highscore);
    highscoreBox.innerHTML = "High Score: " + highscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = {x: 0, y: 1}  // Start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp")
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1 ;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
     
        default:
            break;
    }
});

