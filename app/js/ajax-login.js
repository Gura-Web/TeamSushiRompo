$(function(){
  // ログイン処理のajax通信
  let address = $("input[name='log-address']");
  let pass = $("input[name='log-pass']");
  let btnLog = $(".btn-log");

  btnLog.on("click",function(){
    // 正しくログインできた
    $(".wrap-af").addClass("in");
    $(".wrap-be").addClass("out");
    setTimeout(function(){
      $(".wrap-be").css("display","none");
    },600);

    // 正しくログインできなかった場合
    // address.attr("placeholder", "メールアドレスが間違っています。");
    // pass.attr("placeholder", "パスワードが間違っています。");
    // address.addClass("er");
    // pass.addClass("er");
    // $(".form-address").addClass("er");
    // $(".form-pass").addClass("er");
    // address.val("");
    // pass.val("");
  })

  // エラー出した後、入力した場合エラースタイルをなくす
  address.keyup(function () {
    address.removeClass("er");
    $(".form-address").removeClass("er");
  })
  pass.keyup(function () {
    pass.removeClass("er");
    $(".form-pass").removeClass("er");
  })

  // ajax通信
  $.ajax({
    url: "api_login.php",
    method: "get",
    dataType: "json",
    cashe: false,
    data: {
      mail: address.val(),
      pass: pass.val()
    },
    timeout: 3000
  })
    .done(function (data) {
      console.log(data)
      if (!data) {
        // 正しくログインできた

        // ・名前
        // ・性別
        // ・年齢
        // ・パートナーの種類
        // ・１週間の生活チェックの点数
        // ・今までの生活チェック結果(カレンダーに表示)
        // ・前回の生活チェックの結果(点数,電気使用率,タバコ,野菜,魚,フルーツ)
        // ・社会貢献度グラフの情報

        // 取ってきた情報を表示する
        
      }
      else{
        // 正しくログインできなかった
        address.attr("placeholder", "メールアドレスが間違っています。");
        pass.attr("placeholder", "パスワードが間違っています。");
        address.addClass("er");
        pass.addClass("er");
        $(".form-address").addClass("er");
        $(".form-pass").addClass("er");
        address.val("");
        pass.val("");
      }
    })
    .fail(function (error) {
      console.log(error)
    })
})