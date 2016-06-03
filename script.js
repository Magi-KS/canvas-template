// setups
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var points_element = document.getElementById('points');
// constants
var LEFT = 37;
var UP = 38;
var RIGHT = 39;
var DOWN = 40;
// game variables
var dot_size = 10;
var initial_pos = {x:5, y:5};
var map_size = {x: canvas.width/dot_size, y: canvas.height/dot_size};
// game state variables
var food = randomPos();
var snake_direction = RIGHT;
var snake = [
  {x:initial_pos.x, y:initial_pos.y},
  {x:initial_pos.x, y:initial_pos.y},
  {x:initial_pos.x, y:initial_pos.y},
  {x:initial_pos.x, y:initial_pos.y},
  {x:initial_pos.x, y:initial_pos.y}
];
var food_eaten = 0;
var dead = false;
context.fillStyle = '#223311';

document.addEventListener('keydown',function(e){
  console.log(e.keyIdentifier, e.keyCode)
  switch(e.keyCode){
    case LEFT: snake_direction = (snake_direction == RIGHT) ? snake_direction : LEFT; break;
    case UP: snake_direction = (snake_direction == DOWN) ? snake_direction : UP; break;
    case RIGHT: snake_direction = (snake_direction == LEFT) ? snake_direction : RIGHT; break;
    case DOWN: snake_direction = (snake_direction == UP) ? snake_direction : DOWN; break;
  }
});

function randomPos(){
  return{
    x: Math.floor((Math.random() * map_size.x)),
    y: Math.floor((Math.random() * map_size.y))
  }

}

function snakeUpdate(){
  var new_head = {
    x: snake[0].x,
    y: snake[0].y
  };
  switch(snake_direction){
    case LEFT: new_head.x -= 1; break;
    case UP: new_head.y -= 1; break;
    case RIGHT: new_head.x += 1; break;
    case DOWN: new_head.y += 1; break;
  }

  if (new_head.x >= map_size.x){
    new_head.x = 0;
  }
  else if (new_head.x < 0) {
    new_head.x = map_size.x;
  }

  if (new_head.y >= map_size.y){
    new_head.y = 0;
  }
  else if (new_head.y < 0) {
    new_head.y = map_size.y;
  }

  snake.reverse().push(new_head);
  snake.reverse().pop();
}

function draw(){
  context.clearRect(0, 0, 300, 300);
  for(var i = 0; i < snake.length ; i++){
    var x_pos = snake[i].x * dot_size;
    var y_pos = snake[i].y * dot_size;
    context.fillRect(x_pos, y_pos, dot_size, dot_size);
  }
  context.fillRect(food.x * dot_size, food.y * dot_size, dot_size, dot_size);
}
function foodUpdate(){
  if((snake[0].x == food.x) && (snake[0].y == food.y)){
    snake.push({
      x: snake[snake.length-1].x,
      y: snake[snake.length-1].y
    });
    ++food_eaten;
    food = randomPos();
  }
  points_element.textContent = food_eaten;
}

var last_loop = 0;
function gameLoop(time){
  if((time - last_loop) >= 16.666666667*4){
    last_loop = time
    snakeUpdate();
    foodUpdate();
    draw();
  }
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
