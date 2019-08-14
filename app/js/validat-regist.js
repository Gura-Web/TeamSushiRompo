$(function(){
  let btnConf = $(".btn-conf");

  // 新規登録のバリデーション
  let errorFlg = false;
  btnConf.on("click", function () {
    let name = $("input[name='regi-name']");
    let mail = $("input[name='regi-mail']");
    let pass01 = $("input[name='regi-pass01']");
    let pass02 = $("input[name='regi-pass02']");
    let gender = $("input[name='regi-gender']:checked");
    let birthY = $("input[name='regi-birthY']").val();
    let birthM = $("input[name='regi-birthM']").val();
    let birthD = $("input[name='regi-birthD']").val();
    let partner = $("input[name='regi-partner']:checked");

    // 名前：入力必須(優先), 16文字以下
    if (name.val().length >= 16) {
      errorFlg = true;
      name.attr("placeholder", "名前は16文字以内で入力してください。");
      name.addClass("er");
      $(".form-name").addClass("er");
    }

    if (!name.val()) {
      errorFlg = true;
      name.attr("placeholder", "名前を入力してください。");
      name.addClass("er");
      $(".form-name").addClass("er");
    }

    // メール：入力必須(優先) , 正規表現(https://qiita.com/sakuro/items/1eaa307609ceaaf51123) & 254文字以内
    if (!mail.val().match(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) || mail.val() >= 254) {
      errorFlg = true;
      mail.attr("placeholder", "不適切なメールアドレスです。");
      mail.addClass("er");
      $(".form-mail").addClass("er");
    }

    if (!mail.val()) {
      errorFlg = true;
      mail.attr("placeholder", "メールアドレスを入力してください。");
      mail.addClass("er");
      $(".form-mail").addClass("er");
    }

    // パスワード：入力必須 , 半角英数字を1文字以上含む、8文字以上12文字以内(https://qiita.com/mpyw/items/886218e7b418dfed254b) , ２回一致
    if (pass01.val() == pass02.val()) {
      // 一致しない
    }

    if (pass01.val().match(/^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,12}$/i)) {
      // 正規表現NG
    }
    if (pass02.val().match(/^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,12}$/i)) {
      // 正規表現NG
    }

    if (!pass01.val()) {
      errorFlg = true;
      mail.attr("placeholder", "パスワードを入力してください。");
      mail.addClass("er");
      $(".form-pass01").addClass("er");
    }
    if (!pass02.val()) {
      errorFlg = true;
      mail.attr("placeholder", "パスワードを入力してください。");
      mail.addClass("er");
      $(".box-form-txt").addClass("er");
    }

    // 性別：入力必須
    if (gender.val() == null){
      errorFlg = true;
      $(".form-gender").append("<p class='error-text'>性別を選択してください。</p>");
      $(".form-gender input").addClass("er");

    }

    // 生年月日：入力必須(優先) , ありえない数字を判定
    if (!birthY || !birthM || !birthD){
      console.log("あいう")
    }
    else{
      console.log("あいうそぢg")
    }


    if (birthY > new Date().getFullYear() || birthM > 12){

    }

    if (birthM == 2 ){
      if (birthD > 29){
        // エラー
      }
    }
    if (birthM == 4 || birthM == 6 || birthM == 9 || birthM == 11) {
      if (birthD > 30) {
        // エラー
      }
    }
    if (birthM == 1 || birthM == 3 || birthM == 5 || birthM == 6 || birthM == 7 || birthM == 8 || birthM == 10 || birthM == 12) {
      if (birthD > 31) {
        // エラー
      }
    }

    // パートナー：入力必須
    if (partner.val() == null) {
      errorFlg = true;
      $(".form-partner").append("<p class='error-text'>パートナーを選択してください。</p>");
      $(".form-partner input").addClass("er");

    }

    if (!errorFlg){
      // 確認画面へデータを入れる
    }
  })
})

