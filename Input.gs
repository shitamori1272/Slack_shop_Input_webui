//Requirement Library
//slackApp M3W5Ut3Q39AaIwLquryEPMwV62A3znfOO
//isdlPay  MF69OVvcBvkymVokVsE1aHeaMJ5Q-zlzu

//Project properties
//SLACK_ACCESS_TOKEN: Slack API access-token
//sheet_id          : Google SpreadSheet ID for 残高リスト

function doGet() {  
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setSandboxMode(HtmlService.SandboxMode.IFRAME)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setTitle('ISDL電子マネーチャージ');
}

function registerSSByFormData(data) {
  var slack_access_token = PropertiesService.getScriptProperties().getProperty('SLACK_ACCESS_TOKEN');
  var sheet_id = PropertiesService.getScriptProperties().getProperty('SHEET_ID');
  
  var userId = isdlPay.getIdByName(data[1], sheet_id)
  isdlPay.addMoney(userId, parseInt(data[0]), slack_access_token, sheet_id);
  
  result = true;
  return {data: true};
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
