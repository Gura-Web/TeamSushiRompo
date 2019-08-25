$(function(){
  // ログイン処理のajax通信
  let address = $("input[name='log-address']");
  let pass = $("input[name='log-pass']");
  let btnLog = $(".btn-log");

  btnLog.on("click",function(){
    
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
        if (data) {
          console.log("ログインできた")
          $(".wrap-af").addClass("in");
          $(".wrap-be").addClass("out");
          setTimeout(function(){
            $(".wrap-be").css("display","none");
          },600);

          // dataNoFirstがない場合は普通に入れる
          if (localStorage.getItem("dataNoFirst")){
            // ** dataNoFirstがある場合、すでに保存されてるdataIdと比べる
            if (localStorage.getItem("dataId") !== 1){
              // 違った場合、ストレージ全て決して入れる
              localStorage.removeItem("dataNoFirst");
              localStorage.removeItem("dataCheck");
              localStorage.removeItem("dataMor");
              localStorage.removeItem("dataNig");
              localStorage.removeItem("dataBre");
              localStorage.removeItem("dataLun");
              localStorage.removeItem("dataGetting");
              localStorage.removeItem("dataSleep");
              localStorage.removeItem("dataId");
              localStorage.removeItem("dataName");
              localStorage.removeItem("dataPartner");
              localStorage.removeItem("dataPoint");

              //** id、名前、パートナーをストレージに入れる
              localStorage.setItem("dataId", 1);
              localStorage.setItem("dataName", "まちゃき");
              localStorage.setItem("dataPartner", 1);
            }
          }
          else{
            //** id、名前、パートナーをストレージに入れる
            localStorage.setItem("dataId", 1);
            localStorage.setItem("dataName", "まちゃき");
            localStorage.setItem("dataPartner", 1);
          }
          



          
          // 正しくログインできた

          // id : ユーザーid
          // name : ユーザー名
          // gender : 性別 0=>男性 1=>女性 2=>その他
          // partner : パートナー 0=>男性 1=>女性 2=>豚
          // week : １週間の生活チェックの点数 月曜〜日曜 [月,火,水,木,金,土,日]
          // result : 最新のチェックの点数
          // timing : 最新のチェックの日付 "Y/M/D"
          // electric : 電気使用率 最初と最新 [最初,最新] 例：[20,50]
          // smoke : タバコの本数 最初と最新 [最初,最新]

          // vege : 最新のチェック結果の野菜食べたタイミング [ null or 数字]
          // fish : 最新のチェック結果の魚食べたタイミング [ null or 数字 ]
          // fruit : 最新のチェック結果の魚食べたタイミング [ null or 数字 ]
          // ( 食べてない => null  0 => 朝食べた 　1 => 昼食べた 　2 => 夜食べた )

          // co2 : CO2削減 点数と+-　 例：[ 3 , "+" ]  
          // energie : エネルギー節約 点数と+-
          // sick : 病気予防 点数と+-
          // money : 節約 点数と+-
          // ( 最初と比べて上がった => "+"  下がった => "-"  変化無し => "" )

          // 取ってきた情報を表示する

          // apiでとったデータを入れる
          let week = [10, 20, 30, 40];
          let result = 70;
          let timing = "2019/8/4";
          let electric = [50, 30];
          let smoke = [3, 5];
          let vege = ["null"];
          let fish = [0, 1];
          let fruit = [0, 1, 2];
          let co2 = [5, "+"];
          let energie = [3, "-"];
          let sick = [4, ""];
          let money = [5, "+"];

          // マイページに表示
          $("#graph-week").graphMypage(week, result, timing, electric, smoke, vege, fish, fruit, co2, energie, sick, money);

        }
        else {
          console.log("ログインできなかった")
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
        console.log("ログインエラー"+error)
      })

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

})