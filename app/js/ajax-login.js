$(function(){
  // ログイン処理のajax通信
  let address = $("input[name='log-address']");
  let pass = $("input[name='log-pass']");
  let btnLog = $(".btn-log");

  
  btnLog.on("click",function(){
    
    // ajax通信
    $.ajax({
      url: "https://momokamiki.com/seikatsu/api_login.php",
      type: "GET",
      dataType: "jsonp",
      // contentType: "application/json",
      cache: false,
      data: {
        mail: address.val(),
        pass: pass.val()
      },
      timeout: 3000
      // jsonpCallback: "seikatsu_login"
    })
      .done(function (data) {
        console.log(data)
        console.log("通信できた")
        if (data) {
          console.log("ログインできた")
          $(".wrap-af").addClass("in");
          $(".wrap-be").addClass("out");
          setTimeout(function(){
            $(".wrap-be").css("display","none");
          },600);

          let loginData = data;

          // dataNoFirstがない(初日)場合は普通に入れる
          if (localStorage.getItem("dataNoFirst")){
            // dataNoFirstがある(初日でない)場合、すでに保存されてるdataIdと比べる
            if (localStorage.getItem("dataId") !== loginData["id"]){
              // 違った場合、ストレージ全て消して入れる
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
              localStorage.removeItem("dataHomeNig");
              localStorage.removeItem("dataHomeCheck1");
              localStorage.removeItem("dataHomeCheck2");

              localStorage.removeItem("dataWeek");
              localStorage.removeItem("dataResult");
              localStorage.removeItem("dataTiming");
              localStorage.removeItem("dataElectric");
              localStorage.removeItem("dataSmoke");
              localStorage.removeItem("dataVege");
              localStorage.removeItem("dataFish");
              localStorage.removeItem("dataFruit");
              localStorage.removeItem("dataCo2");
              localStorage.removeItem("dataEnergie");
              localStorage.removeItem("dataSick");
              localStorage.removeItem("dataMoney");
            }
          }
          
          // id、名前、パートナーをストレージに入れる
          localStorage.setItem("dataId", loginData["id"]);
          localStorage.setItem("dataName", loginData["name"]);
          localStorage.setItem("dataPartner", loginData["partner"]);
          
          // ぶたえらんだときホームの画像の高さ変える
          if (localStorage.getItem("dataPartner") == 2) {
            $(".box-chara__img").css("margin", "45px auto 95px");
            $(".box-chara__img").css("height","95px");
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

          // ** apiでとったデータを入れる
          let week = loginData["week"].reverse();//[10, 20, 30, 40];
          let result = loginData["result"];
          let timing = loginData["timing"];
          let electric = loginData["electric"];;
          let smoke = loginData["smoke"];
          let vege = loginData["vege"];
          let fish = loginData["fish"];
          let fruit = loginData["fruit"];
          let co2 = loginData["co2"];
          let energie = loginData["energie"];
          let sick = loginData["sick"];
          let money = loginData["money"];

          localStorage.setItem("dataWeek", week);
          localStorage.setItem("dataResult", result);
          localStorage.setItem("dataTiming", timing);
          localStorage.setItem("dataElectric", electric);
          localStorage.setItem("dataSmoke", smoke);
          localStorage.setItem("dataVege", vege);
          localStorage.setItem("dataFish", fish);
          localStorage.setItem("dataFruit", fruit);
          localStorage.setItem("dataCo2", co2);
          localStorage.setItem("dataEnergie", energie);
          localStorage.setItem("dataSick", sick);
          localStorage.setItem("dataMoney", money);


          // マイページに表示
          if (localStorage.getItem("dataNoFirst")){
            $("#graph-week").graphMypage(week, result, timing, electric, smoke, vege, fish, fruit, co2, energie, sick, money);
          }
          
          // ホーム表示
          $(".sc-home").charaMypage();

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
        console.log(error)
        console.log("通信エラー"+error)
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