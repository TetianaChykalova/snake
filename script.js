//create field
let field = document.createElement('div');
field.classList.add('field');
document.body.appendChild(field);

//create excels
let excel;
for (let i = 0; i < 100; i++) {
    excel = document.createElement('span');
    excel.classList.add('excel');
    field.appendChild(excel);
}

//assign coordinates to each excel
let excels = document.querySelectorAll('.excel');
let x = 1;
let y = 10;

for (let i = 0; i < excels.length; i++) {
    excels[i].setAttribute('posX', x);
    excels[i].setAttribute('posY', y);
    if (x == 10) {
        x = 1;
        y--;
    } else {
        x++;
    }
}

//create food
let food;
let foodCoordination;

function createFood() {
    function generateFood() {
        let posX = Math.round(Math.random() * 9 + 1);
        let posY = Math.round(Math.random() * 9 + 1);
        return [posX, posY];
    }

    foodCoordination = generateFood();
    food = document.querySelector('[posX = "' + foodCoordination[0] + '"][posY = "' + foodCoordination[1] + '"]');
    food.classList.add('food');

    while(food.classList.contains('snakeBody') || food.classList.contains('snakeHead')) {
        foodCoordination = generateFood();
        food = document.querySelector('[posX = "' + foodCoordination[0] + '"][posY = "' + foodCoordination[1] + '"]');
        food.classList.add('food');
    }
}
createFood();

//generate snake
function generateSnake() {
    /*
        9 = 10-1 (max - min)
        if 10 (not 9) I can get 11
        +1 then don't get 0
     */
    let posX = Math.round(Math.random() * 7 + 3);
    let posY = Math.round(Math.random() * 9 + 1);
    return [posX, posY]
}

let generate = generateSnake();

let snake = [
    document.querySelector('[posX = "' + generate[0] + '"][posY = "' + generate[1] + '"]'),
    document.querySelector('[posX = "' + (generate[0]-1) + '"][posY = "' + generate[1] + '"]'),
    document.querySelector('[posX = "' + (generate[0]-2) + '"][posY = "' + generate[1] + '"]'),
]

for (let i = 1; i < snake.length; i++) {
    snake[i].classList.add('snakeBody');
}
snake[0].classList.add('snakeHead');

//move snake
let direction = 'right';
let steps = false;

let par = document.createElement('p');
let count = 0;
document.body.appendChild(par);
par.style.cssText = `
text-align: center;
font-size: 30px;
font-weight: 600;
background: white;
color: black;
padding: 5px;
margin: 30px 0 0 0;
`;
par.textContent = `Your count - ${count}`;

function move() {
    let snakeCoordinate = [snake[0].getAttribute('posX'), snake[0].getAttribute('posY')];
    snake[0].classList.remove('snakeHead');
    snake[snake.length-1].classList.remove('snakeBody');
    snake.pop();

    if(direction == 'right') {
        if(snakeCoordinate[0] < 10) {
            snake.unshift(document.querySelector('[posX = "' + (+snakeCoordinate[0]+1) + '"][posY = "' + snakeCoordinate[1] + '"]'));
        } else {
            snake.unshift(document.querySelector('[posX = "' + 1 + '"][posY = "' + snakeCoordinate[1] + '"]'));
        }
    }
    else if (direction == 'left') {
        if(snakeCoordinate[0] > 1) {
            snake.unshift(document.querySelector('[posX = "' + (+snakeCoordinate[0]-1) + '"][posY = "' + snakeCoordinate[1] + '"]'));
        } else {
            snake.unshift(document.querySelector('[posX = "' + 10 + '"][posY = "' + snakeCoordinate[1] + '"]'));
        }
    }
    else if (direction == 'up') {
        if(snakeCoordinate[1] < 10) {
            snake.unshift(document.querySelector('[posY = "' + (+snakeCoordinate[1]+1) + '"][posX = "' + snakeCoordinate[0] + '"]'));
        } else {
            snake.unshift(document.querySelector('[posY = "' + 1 + '"][posX = "' + snakeCoordinate[0] + '"]'));
        }
    }
    else if (direction == 'down') {
        if(snakeCoordinate[1] > 1) {
            snake.unshift(document.querySelector('[posY = "' + (+snakeCoordinate[1]-1) + '"][posX = "' + snakeCoordinate[0] + '"]'));
        } else {
            snake.unshift(document.querySelector('[posY = "' + 10 + '"][posX = "' + snakeCoordinate[0] + '"]'));
        }
    }

    if (snake[0].getAttribute('posX') == food.getAttribute('posX')
        && snake[0].getAttribute('posY') == food.getAttribute('posY')) {
        food.classList.remove('food');
        let x = snake[snake.length-1].getAttribute('posX');
        let y = snake[snake.length-1].getAttribute('posY');
        snake.push(document.querySelector('[posX = "' + x + '"][posY = "' + y + '"]'));

        createFood();

        count++;
        par.textContent = `Your count - ${count}`;
    }

    if (snake[0].classList.contains('snakeBody')) {
        setTimeout(() => {
            alert('Game is over')
        }, 200);
        clearInterval(moveSnake);
        snake[0].style.background = 'red';
    }

    for (let i = 1; i < snake.length; i++) {
        snake[i].classList.add('snakeBody');
    }
    snake[0].classList.add('snakeHead')

    steps = true;
}

let moveSnake = setInterval(move, 400);

window.addEventListener('keydown', function (e) {
    if (steps == true) {
        if (e.keyCode == 37 && direction != 'right') {
            direction = 'left';
            steps = false;
        }
        else if (e.keyCode == 38 && direction != 'down') {
            direction = 'up';
            steps = false;
        }
        else if (e.keyCode == 39 && direction != 'left') {
            direction = 'right';
            steps = false;
        }
        else if (e.keyCode == 40 && direction != 'up') {
            direction = 'down';
            steps = false;
        }
    }
})