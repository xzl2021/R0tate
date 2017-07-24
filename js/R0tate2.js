var canvas = document.getElementById('canvas'),
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
    startTime = new Date();


var map = [
'10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '11100000000', '00100000000', '00100000000', '00100000000', '00100000000', '00111000000', '00001000000', '00001000000', '00001000000', '00001000000', '00000000000', '00000000000', '00000000000', '00000000000', '00001000000', '00001000000', '00001000000', '00111000000', '00100000000', '11100000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000011000', '10000010000', '11100010000', '00100000000', '00100000000', '00110000000', '00000000100', '00000000100', '00000000100', '00000000100', '00000000100', '00000000100', '00000000100', '00000000100', '00000111100', '00000100000', '00000100000', '00111100000', '00100000000', '00100000000', '00100000000', '00100010000', '00100010000', '00101111100', '00101010100', '00101111100', '00101010100', '00101111100', '00100000000', '00100000000', '00100000100', '00100000000', '00100000000', '00101111100', '00101010100', '00101111100', '00101010100', '00101111100', '00100000000', '00100000000', '00111100000', '00000100000', '00000100000', '00000100000', '00000100000', '00000100000', '00001100000', '00011000000', '00110000000', '01100000000', '11000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10001111111', '10001000000', '10000000000', '10000000000', '10000000000', '11000001000', '11111111000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '11100000000', '10000000000', '10000000000', '10000000000', '11100000000', '10000000000', '10000000000', '10000000000', '11100000000', '10000000000', '10000000000', '10000000000', '11100000000', '10000000000', '10000000000', '10000000000', '11100000000', '10000000000', '10000000000', '10000000000', '11100000000', '10000000000', '10000001100', '10000011000', '11000110000', '01100000000', '00110000000', '00011000100', '00000000100', '00000000100', '00000000100', '00000001100', '00000011000', '00000110000', '00001100000', '00011000000', '00110000000', '00100000000', '00100000000', '00110000000', '00011000000', '00001100000', '00000110000', '00000010000', '00000010000', '00000000000', '00000000000', '00000000000', '00000000000', '10000000000', '11000000000', '01100000000', '00110000000', '00011000000', '00001100000', '00000110000', '00000010000', '00000000000', '00000000000', '00000000000', '00000000000', '00000000000', '10000000000', '10000000000', '10000000000', '11100000000', '11100000000', '00000000000', '00000000000', '00000000000', '00000000000', '00110000000', '00110000000', '00000000000', '00000000000', '00000000000', '00000000000', '00001100000', '00001100000', '00000000000', '00000000000', '00000000000', '00000000000', '11000000000', '11000000000', '00000000000', '00000000000', '00000000000', '00000000000', '00110000000', '00110000000', '00000000000', '00000000000', '00000000000', '00000000000', '01100000000', '01100000000', '00000000000', '00000000000', '00000000000', '00000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '11110000000', '00011110000', '00000010000', '00000010000', '00000110000', '00000100000', '00000100000', '00001100000', '00001000000', '00001000000', '01111000000', '11000000000', '10000000000', '10000000000', '10000000000', '11100000000', '00111000000', '00001110000', '00000010000', '00000010000', '00000010000', '00011111100', '00010000000', '00010000000', '01111100000', '01000000000', '01000000000', '11110000000', '10000000000', '10000000000', '11000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000', '10000000000'
];





function Player() {
  this.x = -90;
  this._y = 110;
  this.r = 20;
  this.left = this.x - rad2deg(this.r / this._y); //此处有近似
  this.top = this._y + this.r;
  this.right = this.x + rad2deg(this.r / this._y);  //此处有近似
  this.bottom = this._y - this.r;
  this.jumping = false;
  this.moving = false;
  this.color = "white";
  this.pos = 21;
  this.str = '01000000000'
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


window.addEventListener('keydown', function (e) {
  // e.preventDefault();
  if (e.keyCode == 37 && keys[0] != 'l') {
    keys.pop();
    keys.unshift('l');
  }else if (e.keyCode == 39 && keys[0] != 'r') {
    keys.pop();
    keys.unshift('r');
  }else if (e.keyCode == 32) {
    jumpKey = true;
  }
});


window.addEventListener('keyup', function (e) {
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
});



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
    var color = 255 - ~~(Math.abs(-90 - left) / 160 * 255); //根据左边缘与角色的距离来设置颜色
    color = color < 0 ? 0 : color;
    ctx.strokeStyle = ctx.fillStyle = 'rgb(' + color + ',' + color + ',' + color + ')';
    for (var j = 0; j < 11; j++) {
      if (str[j] === '0') {
        continue;
      }
      ctx.beginPath();
      ctx.arc(800, 900, 30 + j*60, deg2rad(left), deg2rad(left + segment), false);
      ctx.arc(800, 900, 30 + (j+1)*60, deg2rad(left + segment), deg2rad(left), true);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
  }
}

function drawDeadline() {
  if (deadlineOffset < -270) {
    return;
  }
  ctx.fillStyle = "red";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(mapOriginX,mapOriginY);
  ctx.arc(mapOriginX,mapOriginY,800,deg2rad(deadlineOffset),deg2rad(deadlineOffset + 10),false);
  ctx.fill();
}

function pMove() {
  switch (keys[0]) {
    case 'l':
      if ((parseInt(p.str, 2) & parseInt(map[p.pos - 1], 2)) && (p.left <= getLeft(p.pos))) {
        p.moving = false;
        return;
      }
      rotateOffset += step;
      p.moving = true;
      break;
    case 'r':
      if ((parseInt(p.str, 2) & parseInt(map[p.pos + 1], 2)) && (p.right >= getLeft(p.pos + 1))) {
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
      if ((parseInt(map[p.pos], 2) & parseInt(p.str, 2)) !== 0) {   //判断是否到顶部墙壁
        vy = -vy;
      }
      vy -= gravity;
      p.y += vy;
    }
    requestAnimationFrame(loop);
  }()
}

function dMove() {
  if (p.moving) {
    switch (keys[0]) {
      case 'l':
        deadlineOffset += step + 1;
        break;
      case 'r':
        deadlineOffset -= 0.6;
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


// function render() {
//   if (p.y < 30) {
//     return;
//   }
//   ctx.clearRect(0,0,canvasWidth,canvasHeight);
//   if (!p.jumping && !onGround()) {
//     p.jumping = true;
//     var vy = 0;
//     var gravity = 1.2;
//     !function loop() {
//       if (onGround()) {
//         p.y = findGround() + p.r;
//         p.jumping = false;
//         return;
//       }else {
//         vy -= gravity;
//         p.y += vy;
//       }
//       requestAnimationFrame(loop);
//     }();
//   }
//   if (jumpKey && !p.jumping) {
//     pJump();
//   }
//   pMove();
//   drawPlayer();
//   drawMap();
//   // requestAnimationFrame(render);
//   // setTimeout(render, 100);
// }
!function render() {
  if (p.y < 30) {
    return;
  }
  if ((new Date - startTime) % 10000 >= 9980) {
    console.log(deadlineOffset);
    // step += 0.1;
  }
  ctx.clearRect(0,0,canvasWidth,canvasHeight);
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
      }
      requestAnimationFrame(loop);
    }();
  }
  if (jumpKey && !p.jumping) {
    pJump();
  }
  pMove();
  // dMove();
  drawPlayer();
  drawMap();
  // drawDeadline();
  requestAnimationFrame(render);
}();
