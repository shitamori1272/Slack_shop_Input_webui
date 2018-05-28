# input_money_with_gus
Google Spread SheetにwebUIから入金処理を行うサービスです

# 要求GASライブラリ
- isdlPay[(gitHub)](https://github.com/zensai3805/slack_shop_api): MyBnOwlA5O5e2Uvdl82H6R-aMJ5Q-zlzu
  - SpreadSheetで記述された残高リストを直接操作して入出金を行うライブラリです。このライブラリもリポジトリにて公開していますが、上記ライブラリIDにてそのまま利用することが可能です。
# 要求GASプロパティ
- SLACK_ACCESS_TOKEN
  - Slackにてincomming webhookを活用するためのトークンが必要です。本コードでは直接は利用していませんが、isdlPayのライブラリからslackへ通知を行う際に利用するため、受け渡しを行っています。
- sheet_id
  - SpreadSheetで記述された残高リストファイルのIDが必要です。こちらもSLACK_ACCES_TOKENと同様、isdlPayライブラリに受け渡しを行っています。


