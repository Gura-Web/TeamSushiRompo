$(function(){
  // 確認画面
  let btnConf = $(".btn-conf");
  let btnRegi = $(".btn-regi");
  let scConf = $(".sc-conf");
  let confName = $(".conf-name");
  let confMail = $(".conf-mail");
  let confPass01 = $(".conf-pass01");
  let confPass02 = $(".conf-pass02");
  let confGender = $(".conf-gender");
  let confBirth = $(".conf-birth");
  let confPartnerImg = $(".partner-img");
  let confPartnerName = $(".partner-name");
  let btnReturnRegi = $(".sc-regi .btn-return");

  // 新規登録のバリデーション
  let errorFlg = false;
  let errorBirthFlg = false;
  let name = $("input[name='regi-name']");
  let mail = $("input[name='regi-mail']");
  let pass01 = $("input[name='regi-pass01']");
  let pass02 = $("input[name='regi-pass02']");

  btnConf.on("click", function () {    
    let gender = $("input[name='regi-gender']:checked");
    let birthY = $("input[name='regi-birthY']").val();
    let birthM = $("input[name='regi-birthM']").val();
    let birthD = $("input[name='regi-birthD']").val();
    let partner = $("input[name='regi-partner']:checked");

    // *********************************************************
    //  ↓↓↓　入力エラー処理ここから ↓↓↓
    // *********************************************************
    // エラー初期化
    $(".form-parts").removeClass("er");
    $(".box-form-txt").removeClass("er");
    name.removeClass("er");
    mail.removeClass("er");
    pass01.removeClass("er");
    pass02.removeClass("er");

    errorFlg = false;
    errorBirthFlg = false;
    // 名前：入力必須(優先), 16文字以下
    if (!name.val()) {
      errorFlg = true;
      name.attr("placeholder", "名前を入力してください。");
      name.addClass("er");
      $(".form-name").addClass("er");
    }
    else if (name.val().length >= 16) {
      errorFlg = true;
      name.val("");
      name.attr("placeholder", "名前は16文字以内で入力してください。");
      name.addClass("er");
      $(".form-name").addClass("er");
    }
    // メール：入力必須(優先) , 正規表現(https://qiita.com/sakuro/items/1eaa307609ceaaf51123) & 254文字以内
    if (!mail.val()) {
      errorFlg = true;
      mail.attr("placeholder", "メールアドレスを入力してください。");
      mail.addClass("er");
      $(".form-mail").addClass("er");
    }
    else if (!mail.val().match(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) || mail.val().length >= 254) {
      errorFlg = true;
      mail.val("");
      mail.attr("placeholder", "不適切なメールアドレスです。");
      mail.addClass("er");
      $(".form-mail").addClass("er");
    }
    // パスワード：入力必須 , 半角英数字を1文字以上含む、8文字以上12文字以内(https://qiita.com/mpyw/items/886218e7b418dfed254b) , ２回一致
    if (!pass01.val() || !pass02.val()) {
      errorFlg = true;
      pass01.val("");
      pass02.val("");
      pass01.attr("placeholder", "パスワードを入力してください。");
      pass02.attr("placeholder", "もう一度パスワードを入力してください。");
      pass01.addClass("er");
      pass02.addClass("er");
      $(".form-pass01").addClass("er");
      $(".form-pass02").addClass("er");
    }
    else if (pass01.val().match(/^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,12}$/i) == null || pass02.val().match(/^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,12}$/i) == null) {
      errorFlg = true;
      pass01.val("");
      pass02.val("");
      pass01.attr("placeholder", "パスワードは半角英数字8〜12文字で入力してください。");
      pass02.attr("placeholder", "パスワードは半角英数字8〜12文字で入力してください。");
      pass01.addClass("er");
      pass02.addClass("er");
      $(".form-pass01").addClass("er");
      $(".form-pass02").addClass("er");
    }
    else if ( pass01.val() !== pass02.val()) {
      errorFlg = true;
      pass01.val("");
      pass02.val("");
      pass01.attr("placeholder", "パスワードが一致しませんでした。");
      pass02.attr("placeholder", "パスワードが一致しませんでした。");
      pass01.addClass("er");
      pass02.addClass("er");
      $(".form-pass01").addClass("er");
      $(".form-pass02").addClass("er");
    }
    // 性別：入力必須
    if (gender.val() == null){
      errorFlg = true;
      $(".form-gender .error-text").text("性別を選択してください。");
      $(".form-gender").addClass("er");
    }
    // 生年月日：入力必須(優先) , ありえない数字を判定
    if (birthY == "" || birthM == "" || birthD == "") {
      errorFlg = true;
      $(".form-birth .error-text").text("生年月日を入力してください。");
      $(".form-birth").addClass("er");
    }
    else if (birthY > new Date().getFullYear() || birthM > 12){
      errorFlg = true;
      errorBirthFlg = true;
    }
    else{
      if (birthM == 2) {
        if (birthD > 29) {
          errorFlg = true;
          errorBirthFlg = true;
        }
      }
      if (birthM == 4 || birthM == 6 || birthM == 9 || birthM == 11) {
        if (birthD > 30) {
          errorFlg = true;
          errorBirthFlg = true;
        }
      }
      if (birthM == 1 || birthM == 3 || birthM == 5 || birthM == 6 || birthM == 7 || birthM == 8 || birthM == 10 || birthM == 12) {
        if (birthD > 31) {
          errorFlg = true;
          errorBirthFlg = true;
        }
      }
    }
    if(errorBirthFlg){
      $(".form-birth .error-text").text("不適切な生年月日です。");
      $(".form-birth").addClass("er");
    }
    // パートナー：入力必須
    if (partner.val() == null) {
      errorFlg = true;
      $(".form-partner").addClass("er");
      $(".form-partner .error-text").text("パートナーを選択してください。");
    }
    // *********************************************************
    //  ↑↑↑ 入力エラー処理ここまで ↑↑↑
    // *********************************************************



    //  エラーがなかった時、確認画面へ
    if (!errorFlg){
      // 確認画面へデータを入れる
      confGender.removeClass("gender0");
      confGender.removeClass("gender1");
      confGender.removeClass("gender2");
      confPartnerImg.removeClass("partner0");
      confPartnerImg.removeClass("partner1");
      confPartnerImg.removeClass("partner2");

      confName.text(name.val());
      confMail.text(mail.val());
      confPass01.text("********");
      confPass02.text("********");
      
      switch (gender.val()){
        case "0":
          confGender.text("男性");
          confGender.addClass("gender0");
          break;
        case "1":
          confGender.text("女性");
          confGender.addClass("gender1");
          break;
        case "2":
          confGender.text("その他");
          confGender.addClass("gender2");
          break;
      }
      confBirth.html(birthY + "年&nbsp;" + birthM + "月&nbsp;" + birthD + "日");
      switch (partner.val()) {
        case "0":
          confPartnerImg.html("<span><img src='img/partner.svg' alt='生活リズムくん'></span>");
          confPartnerName.text("生活リズムくん");
          confPartnerImg.addClass("partner0");
          break;
        case "1":
          confPartnerImg.html("<span><img src='img/partner.svg' alt='生活リズムちゃん'></span>");
          confPartnerName.text("生活リズムちゃん");
          confPartnerImg.addClass("partner1");
          break;
        case "2":
          confPartnerImg.html("<span><img src='img/partner.svg' alt='生活リズムぶた'></span>");
          confPartnerName.text("生活リズムぶた");
          confPartnerImg.addClass("partner2");
          break;
      }


      // 確認画面へ移動
      // 戻ってきた時に表示しておかないといけないため、
      // regiのshowはもどさない
      scConf.addClass("show");
    }
  })


  // 戻るボタン押した時の処理
  btnReturnRegi.on("click", function () {
    setTimeout(function () {
      // エラー初期化
      $(".form-parts").removeClass("er");
      $(".box-form-txt").removeClass("er");
      name.removeClass("er");
      mail.removeClass("er");
      pass01.removeClass("er");
      pass02.removeClass("er");
      errorFlg = false;
    }, 400)
  })


  // エラー出した後、入力した場合エラースタイルをなくす
  name.keyup(function(){
    $(".form-name").removeClass("er");
    if (errorFlg == true && !name.val()){
      $(".form-name").addClass("er");
    }
  })
  mail.keyup(function () {
    $(".form-mail").removeClass("er");
    if (errorFlg == true && !mail.val()) {
      $(".form-mail").addClass("er");
    }
  })
  pass01.keyup(function () {
    $(".form-pass01").removeClass("er");
    if (errorFlg == true && !pass01.val()) {
      $(".form-pass01").addClass("er");
    }
  })
  pass02.keyup(function () {
    $(".form-pass02").removeClass("er");
    if (errorFlg == true && !pass02.val()) {
      $(".form-pass02").addClass("er");
    }
  })

  let gender = $("input[name='regi-gender']");
  let birthY = $("input[name='regi-birthY']");
  let birthM = $("input[name='regi-birthM']");
  let birthD = $("input[name='regi-birthD']");
  let birth = $(".box-birth input")
  let partner = $("input[name='regi-partner']");

  gender.change(function(){
    $(".form-gender").removeClass("er");
  })

  birth.keyup(function(){
    $(".form-birth").removeClass("er");
    if ( errorFlg == true ){
      if(!birthY.val() || !birthM.val() || !birthD.val()){
      $(".form-birth").addClass("er");
      }
    } 
  })

  partner.change(function () {
    $(".form-partner").removeClass("er");
  })

  

  // ******************************************
  //  新規登録のajax関数
  // ******************************************
  btnRegi.on("click",function(){
    ajaxRegist(
      name.val(),
      mail.val(),
      pass01.val(),
      $("input[name='regi-gender']:checked").val(),
      birthY.val() + "/" + birthM.val() + "/" + birthD.val(),
      $("input[name='regi-partner']:checked").val()
    )
  })
  
})

