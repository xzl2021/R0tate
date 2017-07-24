var canvas = document.getElementById('canvas'),
    canvasHeight = canvas.height,
    canvasWidth = canvas.width,
    ctx = canvas.getContext('2d'),
    mapOriginX = canvasWidth/2;
    mapOriginY = canvasHeight/2 + 100;
    segment = 16,
    keys = ['',''],
    rotateOffset = 0,
    deadlineOffset = -135,
    ground = 110,
    map = (function () {
      var arr = [];
      var left = -426;
      for (var i = 0; i < 30; i++) {
        arr.push([30,90,left]);
        left += 16;
      }
      return arr;
    }());


var Tween = {
  Cubic: {
      easeIn: function(t,b,c,d){
          return c*(t/=d)*t*t + b;
      },
      easeOut: function(t,b,c,d){
          return c*((t=t/d-1)*t*t + 1) + b;
      },
  },
}



function Player() {
  this.x = -90;
  this._y = 110;
  this.r = 20;
  this.left = this.x - rad2deg(this.r / this._y); //此处有近似
  this.top = this._y + this.r;
  this.right = this.x + rad2deg(this.r / this._y);  //此处有近似
  this.bottom = this._y - this.r;
  this.jumping = false;
  this.color = "white";
  this.pos = 21;
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
    this.left = this.x - rad2deg(this.r / this._y); //此处有近似
    this.right = this.x + rad2deg(this.r / this._y);  //此处有近似
  }
});


function drawPlayer() {
  ctx.save();
  ctx.fillStyle = p.color;
  ctx.beginPath();
  ctx.arc(mapOriginX, mapOriginY - p.y, p.r, 0, Math.PI * 2, false);
  ctx.fill();
  ctx.restore();
}


function addMap(arr) {
  var lastArr = map[map.length - 1]
  var left = lastArr[lastArr.length - 1];
  for (var i = 0; i < arr.length; i++) {
    left += 16;
    arr[i].push(left);
    map.push(arr[i]);
  }
}

//var height = [30,90,150,210,270,330,390,450,510,570,630,690];
addMap(
  [
    // [30, 630],
    [30,210],
    [150,210],[150,210],[150,210],[150,210],
    [150,330],
    [270,330],[270,330],[270,330],[270,330],
    [],[],[],[],
    [270,330],[270,330],[270,330],
    [150,330],[150,210],[30,210],
    [30,90],[30,90],[30,90],[30,90],[30,90],[30,90],[30,90],[30,90],[30,90],[30,90],[30,90],[30,90],[30,90],[30,90],[30,90],[30,90],[30,90,390,510],[30,90,390,450],
    [30,210,390,450],[150,210],[150,210],[150,270],
    [510,570],[510,570],[510,570],[510,570],[510,570],[510,570],[510,570],[510,570],
    [330,570],[330,390],[330,390],[150,390],
    [150,210],[150,210],[150,210],[150,210,390,450],[150,210,390,450],[150,210,270,570],[150,210,270,330,390,450,510,570],[150,210,270,570],[150,210,270,330,390,450,510,570],[150,210,270,570],
    [150,210],[150,210],[150,210,510,570],[150,210],[150,210],[150,210,270,570],[150,210,270,330,390,450,510,570],[150,210,270,570],[150,210,270,330,390,450,510,570],[150,210,270,570],[150,210],[150,210],
    [150,390],[330,390],[330,390],[330,390],[330,390],[330,390],
    [270,390],[210,330],[150,270],[90,210],[30,150],
    [30,90],[30,90],[30,90],[30,90],[30,90],[30,90],[30,90],[30,90],[30,90],[30,90],[30,90],[30,90],[30,90],[30,90],[30,90,270,690],[30,90,270,330],[30,90],[30,90],[30,90],
    [30,150,450,510],[30,510],
    [30,90],[30,90],[30,90],[30,90],[30,90],[30,90],[30,90],[30,90],[30,90],[30,90],[30,90],[30,90],
    [30,210],[30,90],[30,90],[30,90],[30,210],[30,90],[30,90],[30,90],[30,210],[30,90],[30,90],[30,90],[30,210],[30,90],[30,90],[30,90],[30,210],[30,90],[30,90],[30,90],[30,210],
    [30,90],[30,90,450,570],[30,90,390,510],[30,150,330,450],[90,210],[150,270],[210,330,510,570],[510,570],[510,570],[510,570],
    [450,570],[390,510],[330,450],[270,390],[210,330],[150,270],
    [150,210],[150,210],
    [150,270],[210,330],[270,390],[330,450],
    [390,450],[390,450],
    [],[],[],[],
    [30,90],[30,150],[90,210],[150,270],[210,330],[270,390],[330,450],[390,450],
    [],[],[],[],[],
    [30,90],[30,90],[30,90],[30,210],[30,210],
    [],[],[],[],
    [150,270],[150,270],
    [],[],[],[],
    [270,390],[270,390],
    [],[],[],[],
    [30,150],[30,150],
    [],[],[],[],
    [150,270],[150,270],
    [],[],[],[],
    [90,210],[90,210],
    [],[],[],[],
    [30,90],[30,90],[30,90],[30,90],[30,90],[30,90],[30,90],[30,90],[30,90],[30,90],[30,90],[30,90],[30,90],[30,90],[30,90],[30,90],[30,90],[30,90],[30,90],
    [30,270],[210,450],
    [390,450],[390,450],[330,450],[330,390],[330,390],[270,390],[270,330],[270,330],
    [90,330],[30,150],
    [30,90],[30,90],[30,90],
    [30,210],[150,330],[270,450],[390,450],[390,450],[390,450],
    [210,570]
  ]
);






function deg2rad(deg) {
  return deg*Math.PI/180;
}

function rad2deg(rad) {
  return rad*180/Math.PI;
}






window.addEventListener('keydown', function (e) {
  e.preventDefault();
  if (e.keyCode == 37 && keys[0] != 'l') {
    keys.pop();
    keys.unshift('l');
  }else if (e.keyCode == 39 && keys[0] != 'r') {
    keys.pop();
    keys.unshift('r');
  }else if (!p.jumping && e.keyCode == 32) {
    p.jumping = true;
    pJump();
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
  }
});


// function drawMap() {
//   var index = ~~((-90 - rotateOffset) / segment); //角色所在方块的数组索引
//   // var left = -90 - segment;
//   for (var i = index; i < index + 11; i++) {
//     var arr = map[i];
//     console.log(i);
//     switch (arr.length) {
//       case 0:
//         break;
//       case 3:
//         var left = arr[2];
//         color = 242 - ~~((left + 16 - -90) / 180 * 242);
//         ctx.fillStyle = 'rgb(' + color + ',' + color + ',' + color + ')';
//         ctx.beginPath();
//         ctx.arc(600, 700, 400, deg2rad(left - 2), deg2rad(left + segment), false);
//         ctx.arc(600, 700, 30, deg2rad(left + segment), deg2rad(left - 2), true);
//         ctx.closePath();
//         ctx.fill();
//         break;
//       case 5:
//         var left = arr[4];
//         color = 242 - ~~((left + 16 - -90) / 180 * 242);
//         ctx.fillStyle = 'rgb(' + color + ',' + color + ',' + color + ')';
//         ctx.beginPath();
//         ctx.arc(600, 700, arr[3], deg2rad(left - 2), deg2rad(left + segment), false);
//         ctx.arc(600, 700, arr[2], deg2rad(left + segment), deg2rad(left - 2), true);
//         ctx.closePath();
//         ctx.fill();
//         ctx.beginPath();
//         ctx.arc(600, 700, arr[1], deg2rad(left - 2), deg2rad(left + segment), false);
//         ctx.arc(600, 700, arr[0], deg2rad(left + segment), deg2rad(left - 2), true);
//         ctx.closePath();
//         ctx.fill();
//         break;
//       default:
//
//     }
//     left += segment;
//   }
//   for (var i = index - 1; i > index - 12; i--) {
//     var arr = map[i];
//     console.log(i);
//     switch (arr.length) {
//       case 0:
//         break;
//       case 3:
//         var left = arr[2];
//         color = 220 - ~~((-90 - left - 16) / 180 * 242);
//         console.log(color);
//         ctx.fillStyle = 'rgb(' + color + ',' + color + ',' + color + ')';
//         ctx.beginPath();
//         ctx.arc(600, 700, 400, deg2rad(left - 2), deg2rad(left + segment), false);
//         ctx.arc(600, 700, 30, deg2rad(left + segment), deg2rad(left - 2), true);
//         ctx.closePath();
//         ctx.fill();
//         break;
//       case 5:
//         var left = arr[2];
//         color = 220 - ~~((-90 - left - 16) / 180 * 242);
//         ctx.fillStyle = 'rgb(' + color + ',' + color + ',' + color + ')';
//         ctx.beginPath();
//         ctx.arc(600, 700, arr[3], deg2rad(left - 2), deg2rad(left + segment), false);
//         ctx.arc(600, 700, arr[2], deg2rad(left + segment), deg2rad(left - 2), true);
//         ctx.closePath();
//         ctx.fill();
//         ctx.beginPath();
//         ctx.arc(600, 700, arr[1], deg2rad(left - 2), deg2rad(left + segment), false);
//         ctx.arc(600, 700, arr[0], deg2rad(left + segment), deg2rad(left - 2), true);
//         ctx.closePath();
//         ctx.fill();
//         break;
//       default:
//
//     }
//     left -= segment;
//   }
// }

function drawMap() {
  var index = Math.floor(rotateOffset / -16) + 10;  //从第10个方块开始
  p.pos = index + 11;
  for (var i = index; i < index + 22; i++) {  //可视范围内只显示22个方块
    var arr = map[i]; //当前方块
    if (arr[1] === undefined) { //判断方块是否为空
      continue; //方块为空继续跳到下一循环
    }
    var left = arr[arr.length-1] + rotateOffset; //当前方块的左边缘角度
    var color = 242 - ~~(Math.abs(-90 - left) / 170 * 242); //根据左边缘与角色的距离来设置颜色
    ctx.fillStyle = 'rgb(' + color + ',' + color + ',' + color + ')';
    // ctx.strokeStyle = '#fff';
    for (var j = arr.length - 2; j > 0; j -= 2) {
      ctx.beginPath();
      ctx.arc(800, 900, arr[j], deg2rad(left - 0.5), deg2rad(left + segment), false);
      ctx.arc(800, 900, arr[j-1], deg2rad(left + segment), deg2rad(left - 0.5), true);
      ctx.closePath();
      ctx.fill();
      // ctx.stroke();
    }
  }
}


function pMove() {
  switch (keys[0]) {
    case 'l':
      var leftBlock = map[p.pos - 1];
      var length = leftBlock.length;
      switch (length) {
        case 1:
          break;
        case 3:
          if ((leftBlock[0] <= p.bottom && p.bottom < leftBlock[1]) && p.left <= leftBlock[2] + rotateOffset + segment) {
            rotateOffset = p.left - leftBlock[2] - segment;
            return;
          }
          break;
        case 5:
          if ((leftBlock[0] <= p.bottom && p.bottom < leftBlock[1] ||
                leftBlock[2] <= p.bottom && p.bottom < leftBlock[3])
                && p.left <= leftBlock[4] + rotateOffset + segment) {
            rotateOffset = p.left - leftBlock[4] - segment;
            return;
          }
          break;
        case 7:
          break;
        case 9:
          if ((leftBlock[0] <= p.bottom && p.bottom < leftBlock[1] ||
                leftBlock[2] <= p.bottom && p.bottom < leftBlock[3] ||
                leftBlock[4] <= p.bottom && p.bottom < leftBlock[5])
                && p.left <= leftBlock[8] + rotateOffset + segment) {
            rotateOffset = p.left - leftBlock[8] - segment;
            return;
          }
          break;
        default:

      }
      if (!onGround() && !p.jumping) {
        var vy = 0;
        var gravity = 0.8;
        !function loop() {
          if (onGround()) {
            p.y = onGround() + p.r;
            return;
          }
          vy -= gravity;
          p.y += vy;
          requestAnimationFrame(loop);
        }();
      }
      rotateOffset += 2;
      break;
    case 'r':
      var rightBlock = map[p.pos + 1];
      if (isWall(rightBlock)) {
        rotateOffset = p.right - rightBlock[rightBlock.length - 1];
        return;
      }
      if (!onGround() && !p.jumping) {
        var vy = 0;
        var gravity = 0.4;
        !function loop() {
          if (onGround()) {
            p.y = onGround() + p.r;
            return;
          }
          vy -= gravity;
          p.y += vy;
          requestAnimationFrame(loop);
        }();
      }
      rotateOffset -= 2;
      break;
    default:

  }
}


// function pJump() {
//   var t = 0,
//       b = mapOriginY - p.y,
//       c = -200,
//       d = 400,
//       dir = true;
//   !function loop() {
//     if (dir) {
//       if (t > d) {
//         t = 0;
//         b = b + c;
//         c = mapOriginY - map[p.pos][1] - b;
//         dir = !dir;
//       }else {
//         p.y = mapOriginY - Tween.Cubic.easeOut(t, b, c, d);
//         t += 1000/60;
//       }
//     }else {
//       if (isGround()) {
//         p.y = map[p.pos][1] + p.r;
//         p.jump = false;
//         return;
//       }else {
//         p.y = mapOriginY - Tween.Cubic.easeIn(t, b, (mapOriginY - map[p.pos][1] - b), d);
//         t += 1000/60;
//       }
//     }
//     window.requestAnimationFrame(loop);
//   }();
// }


function pJump() {
  var vy = 20;
  var gravity = 0.8;
  vy -= gravity;
  p.y += vy;
  !function loop() {
    if (onGround()) {
      p.y = onGround() + p.r;
      p.jumping = false;
      return;
    }else {
      vy -= gravity;
      p.y += vy;
    }
    requestAnimationFrame(loop);
  }()

}


// function gDetect() {
//   var currentBlock = map[p.pos];
//   switch (currentBlock.length) {
//     case 1:
//       return 0;
//       break;
//     case 3:
//       return currentBlock[1];
//       break;
//     case 5:
//       return p.bottom > currentBlock[3] ? currentBlock[3] : currentBlock[1];
//       break;
//     case 7:
//       // return y.bottom > currentBlock[3] ? currentBlock[3] : currentBlock[1];
//       break;
//     case 9:
//       if (p.bottom > currentBlock[7]) {
//         return currentBlock[7];
//       }else if (p.bottom > currentBlock[5]) {
//         return currentBlock[5];
//       }else if (p.bottom > currentBlock[3]) {
//         return currentBlock[3];
//       }
//       break;
//     default:
//
//   }
// }


function onGround() {
  var currentBlock = map[p.pos];
  switch (currentBlock.length) {
    case 1:
      return false;
      break;
    case 3:
      if (p.bottom <= currentBlock[1]) {
        return currentBlock[1];
      }
      return false;
      break;
    case 5:
      if (p.bottom > currentBlock[2] && p.bottom <= currentBlock[3]) {
        if (p.bottom <= currentBlock[1]) {
          return currentBlock[1];
        }
        return currentBlock[3];
      }
      return false;
      break;
    case 7:
      break;
    case 9:
      if (p.bottom <= currentBlock[1] || p.bottom > currentBlock[2] && p.bottom <= currentBlock[3] || p.bottom > currentBlock[6] && p.bottom <= currentBlock[7]) {
        return true;
      }
      return false;
      break;
    default:

  }
}


function isWall(block) {
  var temp = block.filter(function (item, index, array) {
    if (index === array.length - 1) {
      return false;
    }
    return item <= p.bottom;
  });
  switch (temp.length) {
    case 1:
    case 3:
    case 5:
    case 7:
      return true;
      break;
    default:
    return false;

  }
  // var length = rightBlock.length;
  // switch (length) {
  //   case 1:
  //     break;
  //   case 3:
  //     if ((rightBlock[0] <= p.bottom && p.bottom < rightBlock[1]) && p.right + 2 >= rightBlock[2] + rotateOffset) {
  //       rotateOffset = p.right - rightBlock[2];
  //       return;
  //     }
  //     break;
  //   case 5:
  //     if ((rightBlock[0] <= p.bottom && p.bottom < rightBlock[1] ||
  //           rightBlock[2] <= p.bottom && p.bottom < rightBlock[3])
  //           && p.right >= rightBlock[4] + rotateOffset) {
  //       rotateOffset = p.right - rightBlock[4];
  //       return;
  //     }
  //     break;
  //   case 7:
  //     break;
  //   case 9:
  //     if ((rightBlock[0] <= p.bottom && p.bottom < rightBlock[1] ||
  //           rightBlock[2] <= p.bottom && p.bottom < rightBlock[3] ||
  //           rightBlock[4] <= p.bottom && p.bottom < rightBlock[5])
  //           && p.right >= rightBlock[8] + rotateOffset) {
  //       rotateOffset = p.right - rightBlock[8];
  //       return;
  //     }
  //     break;
  //   default:
  //
  // }
}



function render() {
  ctx.clearRect(0,0,1600,1600);
  pMove();
  drawPlayer();
  drawMap();
  window.requestAnimationFrame(render);
  // window.setTimeout(render, 500);
}

window.requestAnimationFrame(render);
