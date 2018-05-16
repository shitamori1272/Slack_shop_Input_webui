function doGet() {  
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setSandboxMode(HtmlService.SandboxMode.IFRAME)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setTitle('ISDL電子マネーチャージ');
}

function registerSSByFormData(data) {
  var userId = isdlPay.getIdByName(data[1])
  isdlPay.addMoney(userId, parseInt(data[0]));
  
  setLogSheet(data[1],data[0]);
  setMoneyLog(data[1],data[0]);
  
  result = true;
  return {data: true};
}

function postMessage(id,message){
  var token = PropertiesService.getScriptProperties().getProperty('SLACK_ACCESS_TOKEN');
  var bot_name = "ウィーゴ";
  var bot_icon = "http://www.hasegawa-model.co.jp/hsite/wp-content/uploads/2016/04/cw12p5.jpg";
  var app = SlackApp.create(token);   
  
  return app.postMessage(id, message, {
    username: bot_name,
    icon_url: bot_icon,
    link_names: 1
  });
}

function getSelectListFromMasterSS() {
  var selectList = [];

  // マスタデータシートを取得
  var sheet_id = PropertiesService.getScriptProperties().getProperty('SHEET_ID');
  var sheet = SpreadsheetApp.openById(sheet_id);
  var lastrow = sheet.getLastRow();
　　　　var member = sheet.getSheetValues(1, 3, lastrow, 1);  //データ行のみを取得する
　　　　var money = sheet.getSheetValues(1, 2, lastrow, 1); //データ行のみを取得する

  return {data: member};
}
