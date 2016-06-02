// setups
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
// constants
var LEFT = 37
var UP = 38
var RIGHT = 39
var DOWN = 40
// game variables
var dot_size = 10;
var initial_pos = {x:5, y:5}
// game state variables
// var food = {x:}
var snake_direction = RIGHT;
var snake = [
  {x:initial_pos.x, y:initial_pos.y},
  {x:initial_pos.x, y:initial_pos.y},
  {x:initial_pos.x, y:initial_pos.y},
  {x:initial_pos.x, y:initial_pos.y},
  {x:initial_pos.x, y:initial_pos.y}
];
context.fillStyle = '#223311';
context.fillRect(0, 0, 50, 50);
context.clearRect(0, 0, 300, 300);

document.addEventListener('keydown',function(e){
  console.log(e.keyIdentifier, e.keyCode)
  switch(e.keyCode){
    case LEFT: snake_direction = (snake_direction == RIGHT) ? snake_direction : LEFT; break;
    case UP: snake_direction = (snake_direction == DOWN) ? snake_direction : UP; break;
    case RIGHT: snake_direction = (snake_direction == LEFT) ? snake_direction : RIGHT; break;
    case DOWN: snake_direction = (snake_direction == UP) ? snake_direction : DOWN; break;
  }
});

function sMoveUpdate(){
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
  snake.push(new_head);
  // console.log(new_head);
  snake.reverse().pop();
}

function draw(){
  context.clearRect(0, 0, 300, 300);
  for(var i = snake.length; i > 0 ; i--){
    var x_pos = snake[i-1].x * dot_size;
    var y_pos = snake[i-1].y * dot_size;
    context.fillRect(x_pos, y_pos, dot_size, dot_size);
  }
}
function gameUpdate(){

}

var last_loop = 0;
function gameLoop(time){
  if((time - last_loop) >= 16.666666667){
    last_loop = time
    sMoveUpdate();
    draw();
  }
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
