auto();
setScreenMetrics(1080, 2160);

if (!images.requestScreenCapture()) {
  toastLog("请求截图失败,程序退出");
  exit();
}
test_search();

function test_search() {
  let region = [25, 310, 200, 200];
  let shrinkWidth = device.width / 1080; //1080 and 2400 is the data from the device which get "fudai_picture.jpg"
  let shrinkHeight = device.height / 2400;
  let target_img = images.read(files.path("./images/fudai_picture.jpg"));
  target_img = images.scale(target_img,shrinkWidth,shrinkHeight)
  let pic = captureScreen();
  let result = images.findImage(pic, target_img, {
    threshold: 0.8,
    region: region,
  });
  toastLog(result);
  click(result.x,result.y)
}
