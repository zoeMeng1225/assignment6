const BALLS_COUNT = 25;
const BALL_SIZE_MIN = 10;
const BALL_SIZE_MAX = 20;
const BALL_SPEED_MAX = 7;



// 设定画布
const canvas = document.querySelector('canvas');

const ctx = canvas.getContext('2d');


// 设定画布长宽
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// 生成随机数的函数
function random(min, max) {
  return Math.floor(Math.random() * (max-min)) + min;
}

// 生成随机颜色的函数
function randomColor() {
  return 'rgb(' +
         random(0, 255) + ', ' +
         random(0, 255) + ', ' +
         random(0, 255) + ')';
}

function Shape(x, y, velX, velY, exists)
{
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.exists = exists;
}


function Ball(x, y, velX, velY, exists, color, size){
    Shape.call(this,x, y, velX, velY, exists);

    this.color = color;
    this.size = size;
}

Ball.prototype = Object.create(Shape.prototype);
Ball.prototype.constructor = Ball;

// let newBall = new Ball(100,100,20,100,true,'blue',40)


function evilCircle(x, y, velX, velY, exists, color, size){
    Shape.call(this, x, y, velX, velY, exists);
        
        this.color = 'white';
        this.size =  10;
}

evilCircle.prototype = Object.create(Shape.prototype);
evilCircle.prototype.constructor = evilCircle;

// let testEvil = new evilCircle(100,100,20,20,true,'white',10)

evilCircle.prototype.draw = function(){
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.strokeStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.stroke();
     
}

 evilCircle.prototype.update = function() {
  if((this.x + this.size) >= width) {
    this.x -= this.size
  }

  if((this.x - this.size) <= 0) {
    this.x += this.size
  }

  if((this.y + this.size) >= height) {
    this.y -= this.size
  }

  if((this.y - this.size) <= 0) {
    this.x += this.size
  }


  };

evilCircle.prototype.setControls = function(){
    window.onkeydown = e => {
        if (e.key === 'a'|| e.key === 'A'||e.key === 'ArrowLeft') {
          this.x -= this.velX;
        } else if (e.key === 'd'|| e.key === 'D'||e.key === 'ArrowRight') {
          this.x += this.velX;
        } else if (e.key === 'w'|| e.key === 'W'|| e.key === 'ArrowUp') {
          this.y -= this.velY;
        } else if (e.key === 's'|| e.key === 'S'||e.key === 'ArrowDown') {
          this.y += this.velY;
        }
      };
}



// 定义绘制球的函数
Ball.prototype.draw = function() {
    if(this.exists){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }
  
};

// 定义更新球的函数
Ball.prototype.update = function() {
  if((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }

  if((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }

  if((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }

  if((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;
};


evilCircle.prototype.collisionDetect = function() {
    for(let j = 0; j < balls.length; j++) {
      if(this !== balls[j]) {
        const dx = this.x - balls[j].x;
        const dy = this.y - balls[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
  
        if (distance < this.size + balls[j].size) {
            balls[j].exists = false;  
        }
      }
    }
  };

// 定义碰撞检测函数
Ball.prototype.collisionDetect = function() {
  for(let j = 0; j < balls.length; j++) {
    if(this !== balls[j]) {
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].color = this.color = randomColor();        
      }
    }
  }
}

// 定义一个数组来保存所有的球
const balls = [];
const evil = new evilCircle(
    100,
    100,
    20,
    20,
    true,
    'white',
    10
)


function leftCount(){
    let total = 0;
    for(let t = 0; t < balls.length;t++)
    {
        if(balls[t].exists)
        {
            total ++;
        }

    }
    return total;
}



// // 定义一个循环来不停地播放
function loop() {
  ctx.fillStyle = 'rgb(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);
  while(balls.length < BALLS_COUNT) {
    const size = random(BALL_SIZE_MIN, BALL_SIZE_MAX);    
    const ball = new Ball(
      // 为避免绘制错误，球至少离画布边缘球本身一倍宽度的距离
      random(0 + size, width - size),
      random(0 + size, height - size),
      random(-BALL_SPEED_MAX, BALL_SPEED_MAX),
      random(-BALL_SPEED_MAX, BALL_SPEED_MAX),
      true,
      randomColor(),
      size
      
    );
    
    balls.push(ball);
    
  }
  const ballsLeft = document.querySelector('p')
  ballsLeft.textContent = leftCount() + ' left'
 
  for(let i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();
    balls[i].collisionDetect();
  }
  

  evil.draw();
  evil.setControls();
  evil.update();
  evil.collisionDetect();
  
  requestAnimationFrame(loop);
}

loop();



// show.textContent = balls.length
















