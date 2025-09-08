let founded = launchApp("抖音")
if(!founded){
    toastLog("未找到抖音")
}
let btnObject = desc("团购，按钮").findOne(10000)
toastLog(btnObject)
if(btnObject==null){
    toastLog("无法找到 团购 按钮，请联系管理员")
}
btnObject.click()








