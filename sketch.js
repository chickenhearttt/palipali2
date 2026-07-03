//let color_palette = ["#DF3F23", "#9ADDDA", "#549389", "#953313", "#D2AA8C"];
//let basePalette = ["#9DADBE", "#2b3139"];
let padding = 600;

async function setup() {
  createCanvas(2000, 1400); // 畫布大小：width, height

  let color_rand = random();
  // features setting
  if (color_rand < 0.02) {
    // "rusty blue"
    color_palette = ["#DF3F23", "#9ADDDA", "#549389", "#953313", "#D2AA8C"];
    basePalette = ["#268979ff"];
  } else if (color_rand < 0.01) {
    // "blue"
    color_palette = ["#0a3562ff", "#5D759A", "#64f74aff", "#f7896aff"];
    basePalette = ["#78ade5", "#465365"];
  } else {
    // "light blue"
    color_palette = [
      "#fb9696ff",
      "#C3E2DD",
      "#f6eba2ff",
      "#6ECEDA",
      "#699BE5",
      "#a6ffc2ff",
    ];
    basePalette = ["#ffd3d3ff", "#fcdaf6ff"];
  }

  background(random(basePalette)); // 背景顏色
  colorMode(HSB);

  // 呼叫自己建立的函式
  // RJ_rect(100, 200, 10, 50, 10, 20, 5);

  let xsum = 0;
  // 使用迴圈繪製 - 底色層
  // for (let i = 0; i < 30; i++) {
  //     let x = xsum;
  //     let y = 0;
  //     let xCount = int(random(5, 20));
  //     let yCount = 350;
  //     let R = 4;
  //     let xSpan = R + random(2, 5);
  //     let ySpan = R + random(3);

  //     RJ_rect(x, y, xCount, yCount, xSpan, ySpan, R);
  //     xsum += xCount * xSpan;
  //     await sleep(10);

  // }

  // 使用迴圈重複繪製 - 中間層
  // for (let i = 0; i < 200; i++) {
  //     let x = random(-padding, width);
  //     let y = random(-padding, height);
  //     let xCount = int(random(5, 20));
  //     let yCount = int(random(20, 200));
  //     let R = 4;
  //     let xSpan = R + random(2, 5);
  //     let ySpan = R + random(3);
  //     RJ_rect(x, y, xCount, yCount, xSpan, ySpan, R);
  //     await sleep(10);

  // }

  let ysum = 0;
  let yCount = 70;

  for (let j = 0; j < 80; j++) {
    let xCount = random(10) * 5;

    let x = xsum;
    let y = ysum;
    let R = 4;
    let xSpan = R + 2;
    let ySpan = R + 2;

    RJ_rect(x, y, xCount, yCount, xSpan, ySpan, R);

    xsum += xCount * xSpan;
    if (xsum > width) {
      ysum += yCount * ySpan;
      yCount = yCount - 10;
      xsum = 0;
    }
  }

  // 只畫一次
  noLoop();
}

function draw() {}

// _x: 起始x座標, _y: 起始y座標, _xCount: x方向點點排數, _yCount: y方向點點排數, _xSpan: x方向間距, _ySpan: y方向間距, _R: 點點大小

// _x: 起始x座標, _y: 起始y座標, _xCount: x方向點點排數, _yCount: y方向點點排數, _xSpan: x方向間距, _ySpan: y方向間距, _R: 點點大小
function RJ_rect(_x, _y, _xCount, _yCount, _xSpan, _ySpan, _R) {
  let mainClr = random(color_palette); // 隨機選一個顏色
  let fade_scale = random(); // 0-1

  let mainHue = hue(mainClr);
  let mainSat = saturation(mainClr);
  let mainBri = brightness(mainClr);

  let lightClr = color(mainHue, mainSat - 10, mainBri + 50); // 將當前顏色調亮
  let waveScl = random();

  // 繪製點點矩陣
  for (let i = 0; i < _xCount; i++) {
    let px = i * _xSpan + _x; // 計算 x 座標
    for (let j = 0; j < _yCount; j++) {
      let py = j * _ySpan + _y; // 計算 y 座標

      let fade_rate = j / _yCount; // 0-1
      fade_rate = map(fade_rate, 0, 1, 0, fade_scale);

      if (random() > fade_rate) {
        push(); // 儲存畫布目前狀態
        translate(px, py); // 移動畫布原點

        fill(mainClr); // 填色

        // fill(lightClr);

        // 控制鐵皮摺痕方向與密度
        if (waveScl < 0.5) {
          fill(abs(sin(px / 10)) < 0.3 ? lightClr : mainClr); // 畫出亮色線條
        } else {
          fill(abs(sin(py / 10)) < 0.3 ? lightClr : mainClr); // 畫出亮色
        }

        noStroke(); // 不要外框線
        let r = _R * random(0.8, 1.5) + random(0.6, 0.8);
        circle(0, 0, r); //

        // 用線條繪製 XX 材質
        if (random() < 0.05) {
          noFill();
          stroke(mainClr);
          strokeWeight(2);
          line(-r, -r, r, r);
          line(-r, r, r, -r);
        }

        // 用弧線繪製毛茸茸材質
        if (random() < 0.01) {
          noFill();
          stroke(random(color_palette)); // 隨機跳色
          strokeWeight(2);
          push();
          rotate(random(TWO_PI));
          let arcW = r * 2 * random(0.8, 2);
          let arcH = r * 2 * random(0.8, 2);
          arc(-random(r), random(r), arcW, arcH, 0, PI * 1.5);
          pop();
        }

        if (random() < 0.02) {
          print(1);
          // stroke(255)
          noStroke();
          fill(random(color_palette));
          rotate(random(TWO_PI));
          textSize(random(30, 70));
          text("＊", 0, 0);
        }
        pop(); // 回復至畫布先前狀態
      }
    }
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
