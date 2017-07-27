var canvas = document.getElementById('canvas'),
    bgm = document.getElementById('bgm'),
    canvasHeight = canvas.height,
    canvasWidth = canvas.width,
    ctx = canvas.getContext('2d'),
    mapOriginX = canvasWidth/2,
    mapOriginY = canvasHeight/2 + 100,
    segment = 16,
    keys = ['',''],
    jumpKey = false,
    // rotateOffset = -4544,
    rotateOffset = 0,
    deadlineOffset = -270,
    step = 2,
    isStart = false,
    startTime = 0,
    score = 0;


var map = [
'10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '11100000000', '00100000000', '00100000000', '00100000000', '00100000000', '00111000000', '00001000000', '00001000000', '00001000000', '00001000000', '00000000000', '00000000000', '00000000000', '00000000000', '00001000000', '00001000000', '00001000000', '00111000000', '00100000000', '11100000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000011000', '10000010000', '11100010000', '00100000000', '00100000000', '00110000000', '00000000100', '00000000100', '00000000100', '00000000100', '00000000100', '00000000100', '00000000100', '00000000100', '00000111100', '00000100000', '00000100000', '00111100000', '00120000000', '00120000000', '00120000000', '00120010000', '00120010000', '00121111100', '00121010100', '00121111100', '00121010100', '00121111100', '00120000000', '00120000000', '00120000100', '00120000000', '00120000000', '00121111100', '00121010100', '00121111100', '00121010100', '00121111100', '00120000000', '00120000000', '00111100000', '00000100000', '00000100000', '00000100000', '00000100000', '00000100000', '00001100000', '00011000000', '00110000000', '01100000000', '11000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10001111111', '10001000000', '10000000000', '10000000000', '12000000000', '11000001000', '11111111200', '12000000000', '12000000000', '12000000000', '12000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '11120000000', '10000000000', '10000000000', '10000000000', '11120000000', '10000000000', '10000000000', '10000000000', '11120000000', '10000000000', '10000000000', '10000000000', '11120000000', '10000000000', '10000000000', '10000000000', '11120000000', '10000000000', '10000000000', '10000000000', '11120000000', '10000000000', '10000001100', '10000011000', '11000110000', '01100000000', '00110000000', '00011000100', '00000000100', '00000000100', '00000000100', '00000001100', '00000011000', '00000110000', '00001100000', '00011000000', '00110000000', '00100000000', '00100000000', '00110000000', '00011000000', '00001100000', '00000110000', '00000010000', '00000010000', '00000000000', '00000000000', '00000000000', '00000000000', '10000000000', '11000000000', '01100000000', '00110000000', '00011000000', '00001100000', '00000110000', '00000010000', '00000000000', '00000000000', '00000000000', '00000000000', '00000000000', '10000000000', '10000000000', '10000000000', '11100000000', '11100000000', '00000000000', '00000000000', '00000000000', '00000000000', '00110000000', '00110000000', '00000000000', '00000000000', '00000000000', '00000000000', '00001100000', '00001100000', '00000000000', '00000000000', '00000000000', '00000000000', '11000000000', '11000000000', '00000000000', '00000000000', '00000000000', '00000000000', '00110000000', '00110000000', '00000000000', '00000000000', '00000000000', '00000000000', '01100000000', '01100000000', '00000000000', '00000000000', '00000000000', '00000000000', '12000000000', '10000000000', '10000000000', '10000000000', '12000000000', '12000000000', '12000000000', '10000000000', '10000000000', '12000000000', '12000000000', '12000000000', '10000000000', '12000000000', '12000000000', '12000000000', '10000000000', '10000000000', '10000000000', '11110000000', '00011110000', '00000010000', '00000010000', '00000110000', '00000100000', '00000100000', '00001100000', '00001000000', '00001000000', '01111000000', '11000000000', '10000000000', '10000000000', '10000000000', '11100000000', '00111000000', '00001110000', '00000010000', '00000010000', '00000010000', '00011111120', '00010000000', '00010000000', '01111120000', '01000000000', '01000000000', '11112000000', '10000000000', '10000000000', '11200000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000'
];



function Player() {
  this.x = -90;
  this._y = 500;
  this.r = 20;
  this.left = this.x - rad2deg(this.r / this._y); //此处有近似
  this.top = this._y + this.r;
  this.right = this.x + rad2deg(this.r / this._y);  //此处有近似
  this.bottom = this._y - this.r;
  this.jumping = false;
  this.moving = false;
  this.color = "white";
  this.pos = 21;
  this.str = '01000000000';
}


var p = new Player();


Object.defineProperty(p, "y", {
  get: function () {
    return this._y;
  },
  set: function (newValue) {
    this._y = newValue;
    this.bottom = newValue - this.r;
    this.top = newValue + this.r;
    setPlayerEdge();
    this.str = '00000000000';
    var bottomIndex = Math.floor((this.bottom - 30) / 60);
    this.str = this.str.substring(0, bottomIndex) + '1' + this.str.substring(bottomIndex + 1);
    var topIndex = Math.floor((this.top - 30) / 60);
    this.str = this.str.substring(0, topIndex) + '1' + this.str.substring(topIndex + 1);
  }
});



function deg2rad(deg) {
  return deg*Math.PI/180;
}

function rad2deg(rad) {
  return rad*180/Math.PI;
}





function bindKeys() {
  function keydown(e) {
    if (e.keyCode == 37 && keys[0] != 'l') {
      keys.pop();
      keys.unshift('l');
    }else if (e.keyCode == 39 && keys[0] != 'r') {
      keys.pop();
      keys.unshift('r');
    }else if (e.keyCode == 32) {
      jumpKey = true;
    }
  }
  function keyup(e) {
    if (e.keyCode == 37 && keys[1] == 'l') {
      keys[1] = '';
    }else if (e.keyCode == 39 && keys[1] == 'r') {
      keys[1] = '';
    }else if (e.keyCode == 37 || e.keyCode == 39) {
      keys.shift();
      keys.push('');
    }else if (e.keyCode == 32) {
      jumpKey = false;
    }
  }

  return function (flag) {
    if (flag) {
      window.addEventListener('keydown', keydown);
      window.addEventListener('keyup', keyup);
    }else {
      window.removeEventListener('keydown', keydown);
      window.removeEventListener('keyup', keyup);
    }
  };
}


var bindKeys = bindKeys();



function getLeft(index) {
  return ((index * segment - 426) + rotateOffset) % 360;
}



function drawPlayer() {
  ctx.save();
  ctx.fillStyle = p.color;
  ctx.beginPath();
  ctx.arc(mapOriginX, mapOriginY - p.y, p.r, 0, Math.PI * 2, false);
  ctx.fill();
  ctx.restore();
}


function drawMap() {
  var index = Math.floor(rotateOffset / -segment) + 10;  //从第10个方块开始
  p.pos = (index + 11) % 315;
  for (var i = index; i < index + 22; i++) {
    var str = map[i % 315];
    if (str === '00000000000') {
      continue;
    }
    var left = getLeft(i); //当前方块的左边缘角度
    var color = 255 - ~~(Math.abs(-90 - left) / 170 * 255); //根据左边缘与角色的距离来设置颜色
    color = color < 0 ? 0 : color;
    ctx.strokeStyle = ctx.fillStyle = 'rgb(' + color + ',' + color + ',' + color + ')';
    for (var j = 0; j < 11; j++) {
      if (str[j] === '0') {
        continue;
      }else if (str[j] === '1') {
        ctx.beginPath();
        ctx.arc(mapOriginX, mapOriginY, 30 + j*60, deg2rad(left), deg2rad(left + segment), false);
        ctx.arc(mapOriginX, mapOriginY, 30 + (j+1)*60, deg2rad(left + segment), deg2rad(left), true);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }else if (str[j] === '2') {
        ctx.save();
        ctx.strokeStyle = ctx.fillStyle = 'rgba(255, 30, 30,' + (color/255) + ')';
        ctx.beginPath();
        ctx.arc(mapOriginX, mapOriginY, 30 + j*60, deg2rad(left), deg2rad(left + segment), false);
        ctx.arc(mapOriginX, mapOriginY, 30 + (j+1)*60, deg2rad(left + segment / 2), deg2rad(left + segment / 2), true);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    }
  }
}

function drawDeadline() {
  if (deadlineOffset < -270 || deadlineOffset > 90) {
    return;
  }
  ctx.save();
  var a = Math.abs(270 + deadlineOffset) / 180; //根据左边缘与角色的距离来设置颜色
  ctx.fillStyle = 'rgba(' + 255 + ', 0, 0, ' + a + ')';
  ctx.beginPath();
  ctx.moveTo(mapOriginX,mapOriginY);
  ctx.arc(mapOriginX,mapOriginY,1200,deg2rad(deadlineOffset),deg2rad(deadlineOffset + 20),false);
  ctx.fill();
  ctx.restore();
}

function drawInfo() {
  ctx.save();
  ctx.fillStyle = "#fff";
  ctx.strokeStyle = "#000";
  ctx.font = "bold 60px Helvetica";
  ctx.lineWidth = 3;
  var time = calcTime();
  var textWidth = ~~(ctx.measureText(time).width);
  ctx.fillText(time, mapOriginX - textWidth/2, mapOriginY);
  ctx.strokeText(time, mapOriginX - textWidth/2, mapOriginY);
  ctx.font = "40px Helvetica";
  var toTheWall = "距离死亡：" + ((-90 - deadlineOffset - 20) / 18).toFixed(1) + "米！";
  var textWidth = ~~(ctx.measureText(toTheWall).width);
  ctx.fillText(toTheWall, mapOriginX - textWidth/2, mapOriginY + 60);
  // ctx.strokeText(toTheWall, mapOriginX - textWidth/2, mapOriginY + 60);
  toTheWall =
  ctx.restore();
  return time;
}


function calcTime() {
  var diff = (new Date()) - startTime;
  var milliseconds = diff % 1000;
  if (milliseconds < 10) {
    milliseconds = '00' + milliseconds;
  }else if (milliseconds < 100) {
    milliseconds = '0' + milliseconds;
  }
  var seconds = ~~(diff / 1000);
  return seconds + ":" + milliseconds;
}

function pMove() {
  switch (keys[0]) {
    case 'l':
      if (( map[p.pos - 1][p.str.indexOf('1')] === '1' || map[p.pos - 1][p.str.lastIndexOf('1')] === '1' ) && (p.left <= getLeft(p.pos))) {
        p.moving = false;
        return;
      }
      rotateOffset += step;
      p.moving = true;
      break;
    case 'r':
      if (( map[(p.pos + 1) % 315][p.str.indexOf('1')] === '1' || map[(p.pos + 1) % 315][p.str.lastIndexOf('1')] === '1') && (p.right >= getLeft(p.pos + 1))) {
        p.moving = false;
        return;
      }
      rotateOffset -= step;
      p.moving = true;
      break;
    default:

  }
}


function pJump() {
  p.jumping = true;
  var vy = 20;
  var gravity = 0.8;
  vy -= gravity;
  p.y += vy;
  console.log("jumping");
  !function loop() {
    if (onGround()) {
      p.y = findGround() + p.r;
      p.jumping = false;
      return;
    }else {
      if ( map[p.pos][p.str.lastIndexOf('1')] === '1' ) {   //判断是否到顶部墙壁
        p.y = p.str.lastIndexOf('1') * 60 + 30 - p.r;
        vy = -vy;
      }
      vy -= gravity;
      p.y += vy;
      if (p.y < 30) {
        return;
      }
    }
    requestAnimationFrame(loop);
  }();
}

function dMove() {
  if (p.moving) {
    switch (keys[0]) {
      case 'l':
        deadlineOffset += step + 1;
        break;
      case 'r':
        deadlineOffset -= 0.65;
        break;
      default:
        deadlineOffset += step;
    }
  }else {
    deadlineOffset += step;
  }
}

function setPlayerEdge() {
  var temp = ~~(rad2deg(p.r / p.y));
  p.left = (temp % 2 === 0) ? (p.x - temp) : (p.x - (temp + 1));   //此处有近似
  p.right = p.x * 2 - p.left;    //此处有近似
}


function onGround() {
  var ground = findGround();
  if (ground === 30) {
    return false;
  }else {
    return p.bottom <= ground;
  }
}

function findGround() {
  var currentBlock = map[p.pos];
  return (currentBlock.lastIndexOf('1', p.str.indexOf('1'))) * 60 + 90;
}


function init() {
  rotateOffset = 0;
  deadlineOffset = -270;
  step = 2;
  keys = ['',''];
  jumpKey = false;
  p.y = 500;
  p.jumping = false;
  var img = new Image();
  img.src = "img/title.png";
  img.onload = function () {
    ctx.drawImage(img, mapOriginX - 400, mapOriginY - 400, 800, 800);
    ctx.fillStyle = "#fff";
    ctx.font = "bold 80px Arial";
    var textWidth = ctx.measureText("点击屏幕或按回车键开始游戏！").width;
    ctx.fillText("点击屏幕或按回车键开始游戏！", mapOriginX - textWidth/2, mapOriginY - 600);
    if (startTime !== 0) {
      score = "你的分数是：" + score.replace(/\:/,'.') + " s!!!";
      textWidth = ctx.measureText(score).width;
      ctx.fillText(score, mapOriginX - textWidth/2, mapOriginY - 500);
    }
    !function loop() {
      if (isStart === true) {
        bindKeys(true);
        startTime = new Date();
        render();
        bgm.play();
        return;
      }
      ctx.clearRect(mapOriginX - 400, mapOriginY - 400, mapOriginX + 400, mapOriginY + 400);
      mapOriginX = ~~(Math.random()*10 + 795);
      mapOriginY = ~~(Math.random()*10 + 895);
      ctx.drawImage(img, mapOriginX - 400, mapOriginY - 400, 800, 800);
      requestAnimationFrame(loop);
    }();
  };
  window.addEventListener("keydown", function start(e) {
    if (e.keyCode === 13) {
      isStart = true;
      window.removeEventListener("keydown", start);
    }
  });
}

init();


function isOver() {
  if (map[p.pos][p.str.lastIndexOf('1')] === '2' && getLeft(p.pos) <= -92 && getLeft(p.pos) >= -104) {
    return true;
  }else if (p.bottom <= 30) {
    return true;
  }else if (deadlineOffset + 20 >= p.left) {
    return true;
  }

}


function render() {
  if (isOver()) {
    var a = 0;
    !function loop() {
      if (a >= 0.2) {
        isStart = false;
        init();
        return;
      }
      a += 0.004;
      ctx.fillStyle = 'rgba(0, 0, 0, ' + a + ')';
      ctx.fillRect(0,0,canvasWidth,canvasHeight);
      requestAnimationFrame(loop);
    }();
    bindKeys(false);
    return;
  }
  if ((new Date - startTime) % 10000 <= 15) {
    console.log((new Date - startTime) % 15000);
    step += 0.1;
  }
  ctx.clearRect(0,0,canvasWidth,canvasHeight);
  mapOriginX = ~~(Math.random()*10 + 795);
  mapOriginY = ~~(Math.random()*10 + 895);
  if (!p.jumping && !onGround()) {
    p.jumping = true;
    var vy = 0;
    var gravity = 1.2;
    !function loop() {
      if (onGround()) {
        p.y = findGround() + p.r;
        p.jumping = false;
        return;
      }else {
        vy -= gravity;
        p.y += vy;
        if (p.y < 30) {
          return;
        }
      }
      requestAnimationFrame(loop);
    }();
  }
  if (jumpKey && !p.jumping) {
    pJump();
  }
  pMove();
  dMove();
  drawPlayer();
  drawMap();
  drawDeadline();
  score = drawInfo();
  requestAnimationFrame(render);
}
