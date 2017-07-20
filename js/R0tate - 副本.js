var ctx = document.getElementById('canvas').getContext('2d'),
    segment = 16,
    keys = ['',''],
    rotateOffset = 0,
    deadlineOffset = -135,
    // map = [
    //   [30,90,300,360],[30,90,300,360],[30,90,300,360],[30,90,300,360],[30,90,300,360],[30,90,300,360],[30,90,300,360],[30,90,300,360],[30,90,300,360],[30,90,300,360],
    //   [30,90,300,360],[30,90,300,360],[30,90,300,360],[30,90,300,360],[30,90,300,360],[30,90,300,360],[30,90,300,360],[30,90,300,360],[30,90,300,360],[30,90,300,360],
    //   [30,90,300,360],[30,90,300,360],[30,90,300,360],[30,90,300,360],[30,90,300,360],[30,90,300,360],[30,90,300,360],[30,90,300,360],[30,90,300,360],[30,90,300,360],
    // ];
    // map = [
    //   [30,90,-270],[30,90,-254],[30,90,-238],[30,90,-222],[30,90,-206],[30,90,-190],[30,90,-174],[30,90,-158],[30,90,-142],[30,90,-126],
    //   [30,90,-110],[30,90,-94],[30,90,-78],[30,90,-62],[30,90,-46],[30,90,-30],[30,90,-14],[30,90,2],[30,90,18],[30,90,34],
    //   [30,90,50],[30,90,66],[30,90,82],[30,90,98],[30,90,114],[30,90,130],[30,90,146],[30,90,162],[30,90,178],[30,90,194]
    // ];

    map = (function () {
  var arr = [];
  var left = -430;
  for (var i = 0; i < 50; i++) {
    arr.push([30,90,left]);
    left += 16;
  }
  return arr;
}());


function addMap(arr) {
  var lastArr = map[map.length - 1]
  var left = lastArr[lastArr.length - 1];
  for (var i = 0; i < arr.length; i++) {
    left += 16;
    arr[i].push(left);
    map.push(arr[i]);
  }
}

var height = [30,90,150,210,270,330,390,450,510,570,630,690];
addMap(
  [
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

// map.push([30,210,1]);





function deg2rad(deg) {
  return deg*Math.PI/180;
}






window.addEventListener('keydown', function (e) {
  if (e.keyCode == 37 && keys[0] != 'l') {
    keys.pop();
    keys.unshift('l');
  }else if (e.keyCode == 39 && keys[0] != 'r') {
    keys.pop();
    keys.unshift('r');
  // }else if (!p.jump && e.keyCode == 32) {
  //   p.jump = true;
  //   pJump();
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
var b;

function drawMap() {
  var index = ~~(rotateOffset / -16) + 10;  //从第10个方块开始
  b = index;
  for (var i = index; i < index + 22; i++) {  //可视范围内只显示22个方块
    var arr = map[i]; //当前方块
    if (arr[1] === undefined) { //判断方块是否为空
      continue; //方块为空继续跳到下一循环
    }
    var left = arr[arr.length-1] + rotateOffset; //当前方块的左边缘角度
    var color = 242 - ~~(Math.abs(-94 - left) / 170 * 242); //根据左边缘与角色的距离来设置颜色
    ctx.fillStyle = 'rgb(' + color + ',' + color + ',' + color + ')';
    for (var j = arr.length - 2; j > 0; j -= 2) {
      ctx.beginPath();
      ctx.arc(800, 900, arr[j], deg2rad(left - 0.5), deg2rad(left + segment), false);
      ctx.arc(800, 900, arr[j-1], deg2rad(left + segment), deg2rad(left - 0.5), true);
      ctx.closePath();
      ctx.fill();
    }
  }
}

//
function pMove() {
  switch (keys[0]) {
    case 'l':
      rotateOffset += 2;
      break;
    case 'r':
      rotateOffset -= 2;
      break;
    default:

  }
}


function render() {
  ctx.clearRect(0,0,1600,1600);
  pMove();
  drawMap();
  window.requestAnimationFrame(render);
  // window.setTimeout(render, 500);
}

window.requestAnimationFrame(render);
