auto.waitFor();

app.launchApp("南京大学");

//等待app启动完全
className("android.widget.TextView").text("每日健康打卡").waitFor();

click("每日健康打卡");

//等待打卡页面启动完全
className("android.view.View").textStartsWith("填报时间").waitFor();

//判断今日是否已填
if (className("android.widget.TextView").textContains("可修改").exists()) {
    toast("今日已填，美美退出");
    log("之前已填");
    exit();
}

var today = className("android.view.View").textStartsWith("填报时间").findOne();
log("待填报的日期为：", today.text());
today.parent().click();

//等待承诺页面
className("android.view.View").textStartsWith("我承诺").waitFor();

click("确定");

//体温正常、其他健康情况正常
className("android.view.View").descContains("正常").clickable().find().forEach(function (i) {
    i.clickCenter();
});

//本人绿码、同居绿码
className("android.view.View").descContains("绿").clickable().find().forEach(function (i) {
    i.clickCenter();
});

click("提交");
text("确定").waitFor();
click("确定");

//确认是否已填
className("android.view.View").textStartsWith("填报时间").waitFor();
if (className("android.widget.TextView").textContains("可修改").exists()) {
    toast("今日填完，美美退出");
    log("填完");
}
else {
    log("填报异常！");
}