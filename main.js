auto();
setScreenMetrics(1080, 2160);
const {
  MAX_COUNTDOWN_SECONDS,
  MAX_AUDIENCE_COUNT,
  TEXT_CLASSNAME,
  MAX_AUDIENCE_RATIO,
  CLILCKABLE_EMPTY_Y,
  CLICKABLE_EMPTY_X,
} = require("./contants");

console.setGlobalLogConfig({
  file: files.path("./log/log.txt"),
});

if (!images.requestScreenCapture()) {
  toastLog("请求截图失败,程序退出");
  exit();
}
let find_luckbag_result = findLuckBag();
if (find_luckbag_result == null) {
  console.log("not foundluckbag");
  //todo
}
let audience_widget = id("omh").descContains("在线观众").findOne(2000);
if (audience_widget == null) {
  toastLog("cannot find audience widget,will todo ");
  //todo : how to solve
}
const audienceCountText = audience_widget.getText();
click(find_luckbag_result.x, find_luckbag_result.y);
let timeWidget = className(TEXT_CLASSNAME)
  .textContains(":")
  .depth(14)
  .findOne(2000);
if (timeWidget == null) {
  toastLog("cannot get countdown, will exit...");
  exit();
}
//300 500 ~ 550 600
let luckyBag_count_text = className(TEXT_CLASSNAME)
  .textStartsWith("限量")
  .findOne(2000)
  .text();

let luckybag_count = parseInt(
  luckyBag_count_text.substring(2, luckyBag_count_text.length - 1)
); //todo
let countdownText = timeWidget.text();
const array_countdownText = countdownText.split(":");
const countdownTime =
  parseInt(array_countdownText[0]) * 60 + parseInt(array_countdownText[1]);
const audienceCount = parseInt(audienceCountText);
if (
  countdownTime > MAX_COUNTDOWN_SECONDS ||
  (audienceCount > MAX_AUDIENCE_COUNT &&
    audienceCount / luckybag_count > MAX_AUDIENCE_RATIO)
) {
  // Todo: skip this live room
  let click_x = Math.floor(
    Math.random() * CLICKABLE_EMPTY_X.OFFSET + CLICKABLE_EMPTY_X.INITIAL
  );
  let click_y = Math.floor(
    Math.random() * CLILCKABLE_EMPTY_Y.OFFSET + CLILCKABLE_EMPTY_Y.INITIAL
  );
  click(click_x,click_y)
}

function findLuckBag() {
  let region = [25, 310, 200, 200];
  let shrinkWidth = device.width / 1080; //1080 and 2400 is the data from the device which get "fudai_picture.jpg"
  let shrinkHeight = device.height / 2400;
  let target_img = images.read(files.path("./images/fudai_picture.jpg"));
  target_img = images.scale(target_img, shrinkWidth, shrinkHeight);
  let pic = captureScreen();
  let result = images.findImage(pic, target_img, {
    threshold: 0.8,
    region: region,
  });
  return result;
}
