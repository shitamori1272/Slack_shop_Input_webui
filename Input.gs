function doGet() {  
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setSandboxMode(HtmlService.SandboxMode.IFRAME)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setTitle('ISDL電子マネーチャージ');
  
}

function registerSSByFormData(data) {

  Logger.log("data = %s", data);
  var sheet_id = PropertiesService.getScriptProperties().getProperty('SHEET_ID');
  var sheet = SpreadsheetApp.openById(sheet_id);
  var lastrow = sheet.getLastRow();
  var member = sheet.getSheetValues(1, 3, lastrow, 1);  //データ行のみを取得する
  var memberId = sheet.getSheetValues(1, 1, lastrow, 1);
　　　　var money = sheet.getSheetValues(1, 2, lastrow, 1); //データ行のみを取得する
  
  /*
  for(var i=0; i<lastrow; i++){
    if(member[i]==data[1]){
      Logger.log(i);
      var Address = "B"+(i+1);
      sheet.getRange(Address).setValue(parseInt(money[i])+parseInt(data[0]));
      var sub = parseInt(money[i])+parseInt(data[0]);
      postMessage("@"+memberId[i],"残高:"+sub+"[+"+data[0]+"]");
      postMessage("#money_log","[入金] "+member[i]+" 現金チャージ "+"[+"+data[0]+"]");
    }
  }
  */
  
  //入金した人のデータベースにおけるindex番号を確認
  Logger.log(member);
  var indexNum = arrayParse(member).indexOf(data[1]);
  
  //データベースを更新
  var Address = "B"+(indexNum+1);
  sheet.getRange(Address).setValue(parseInt(money[indexNum])+parseInt(data[0]));
  
  //入金処理をslackに通知
  var sub = parseInt(money[indexNum])+parseInt(data[0]);
  postMessage("@"+memberId[indexNum],"残高:"+sub+"[+"+data[0]+"]");
  postMessage("#money_log","[入金] "+member[indexNum]+" 現金チャージ "+"[+"+data[0]+"]");
  
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

function arrayParse(array){
  var parseArray = [];
  for(var i=0; i<array.length; i++){
    parseArray[i] = array[i][0]; 
  }
  
  return parseArray;
}