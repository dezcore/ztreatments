const fs = require('fs');
const sharp = require('sharp');
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');

function matchProb(diff, width, height, callBack) {
  let res = 0, pixels = 0
  if(diff !== undefined) {
    pixels = width * height
    res = 100 - ((diff* 100)/pixels)
    if(callBack)
      callBack(res)
    //console.log("pixels : ", pixels, diff, res)
  }
}

function resizeImg(input, output, width, height, callBack) {
  if(input && output) {
    sharp(input)
    .resize(width, height)
    .toFile(output, (err, info) => {
      if(callBack)
        callBack()
    });
  }
}

function readImage(name) {
  return PNG.sync.read(fs.readFileSync(path.join(__dirname, `fixtures/${name}.png`)));
}

function writeImage(name, image) {
  fs.writeFileSync(path.join(__dirname, `fixtures/${name}.png`), PNG.sync.write(image));
}

function compareImages(input1, input2, callBack) {
  const img1 = PNG.sync.read(fs.readFileSync(input1));
  const img2 = PNG.sync.read(fs.readFileSync(input2));
  const {width, height} = img1;
  const diff = new PNG({width, height});
  const res = pixelmatch(img1.data, img2.data, diff.data, width, height, {threshold: 0.1});
  fs.writeFileSync('data/pixelmatch/diffs/diff.png', PNG.sync.write(diff));
  matchProb(res, width, height, (prob)=>{
    console.log("Prob : ", prob)
  })
}

function imgRedimension() {
  let width1, height1, width2, height2
  const input1 = 'data/pixelmatch/img3.png'
  const input2 = 'data/pixelmatch/img2-same.png'
  const resizeOutput = 'data/pixelmatch/resize/img1.png'
  const img1 = PNG.sync.read(fs.readFileSync(input1));
  const img2 = PNG.sync.read(fs.readFileSync(input2));

  if(img1 && img2) {
    width1 = img1.width
    height1 = img1.height
    width2 = img2.width
    height2 = img2.height

    if(height2 < height1) {
      resizeImg(input1, resizeOutput, width2, height2, ()=>{
        compareImages(resizeOutput, input2);
      })
    } else {
      resizeImg(input2, resizeOutput, width1, height1, ()=>{
        compareImages(resizeOutput, input1);
      })
    }
    //console.log("Images size : ", width1, height1, width2, height2)
  }
}

module.exports = {
  imgRedimension
}