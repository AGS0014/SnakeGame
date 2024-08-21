//canvas ko target krenge 
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const messageElement = document.getElementById('message');

// Game box ka size set karna
const box = 20;
let snake = [];
snake[0] = { x: 9 * box, y: 10 * box };

//Randomly food ko place krenge
let food = {
    x: Math.floor(Math.random() * 19 + 1) * box,
    y: Math.floor(Math.random() * 19 + 1) * box
};

// Direction aur score variables
let direction;
let score = 0;


document.addEventListener('keydown', setDirection);


function setDirection(event) {
    if (event.keyCode === 37 && direction !== 'RIGHT') direction = 'LEFT';
    else if (event.keyCode === 38 && direction !== 'DOWN') direction = 'UP';
    else if (event.keyCode === 39 && direction !== 'LEFT') direction = 'RIGHT';
    else if (event.keyCode === 40 && direction !== 'UP') direction = 'DOWN';
}


// hr ek frame pr snake aur game ki current state ko draw krega
function draw()
  {
    // phle hum canvas ko clear krenge 
       ctx.clearRect(0, 0, canvas.width, canvas.height);

     // hum snake ke hr part ko draw kr rhe hai 
     for (let i = 0; i < snake.length; i++) {
    // Snake ka head green color mein hota hai, aur body white color mein.
        ctx.fillStyle = (i === 0) ? 'green' : 'white';
        ctx.fillRect(snake[i].x, snake[i].y, box, box); // Snake ke ek part ko rectangle ke form mein draw karte hain.
        ctx.strokeStyle = 'red';
        ctx.strokeRect(snake[i].x, snake[i].y, box, box); // Snake ke part ke upar red border draw karte hain.

        // Snake ke head pe eyes aur mouth draw karne ke liye.
           if (i === 0) {
               ctx.fillStyle = 'black';
               ctx.fillRect(snake[i].x + 5, snake[i].y + 5, 5, 5); // Left eye
               ctx.fillRect(snake[i].x + 15, snake[i].y + 5, 5, 5); // Right eye
               ctx.fillStyle = 'red';
               ctx.fillRect(snake[i].x + 10, snake[i].y + 15, 10, 5); // Mouth
           }
        }


       // food ko color mein draw krenge 
        ctx.fillStyle = 'red';
        ctx.fillRect(food.x, food.y, box, box);
        
        let snakeX = snake[0].x; // snake ke head ka current x-coordinate movement
        let snakeY = snake[0].y; // snake ke head ka current y-coordinate movement
        
        //snake ke direction ke according , uska x ya y position change krna
        
        if (direction === 'LEFT') snakeX -= box;
            if (direction === 'UP') snakeY -= box;
            if (direction === 'RIGHT') snakeX += box;
            if (direction === 'DOWN') snakeY += box;
        
        //agr snake food kha rha rha hai to score add krna 
        if (snakeX === food.x && snakeY === food.y) {
            score++;
            scoreElement.innerText = score; // Score update karte hain.
            food = {
                x: Math.floor(Math.random() * 19 + 1) * box,
                y: Math.floor(Math.random() * 19 + 1) * box
            };}
        else {
            snake.pop();  // remove last part if snake not eat the food 
        }
        
        let newHead = { x: snakeX, y: snakeY };  // new head porotion of snake 
        
        // if snake hit the wall
        if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height) {
            messageElement.innerText = 'Snake head broken!';
            messageElement.style.display = 'block';
            clearInterval(game); // Game ko stop karte hain.
        } else if (collision(newHead, snake)) {
            messageElement.innerText = 'Snake cut himself!';
            messageElement.style.display = 'block';
            clearInterval(game);
        }

snake.unshift(newHead);
}

function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
	
        if (head.x === array[i].x && head.y === array[i].y) {
            return true;
        }
    }
    return false;
}

let game = setInterval(draw, 100);



