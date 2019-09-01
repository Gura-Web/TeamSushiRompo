// 生活チェック
$(function(){
  let btnResult = $(".btn-result");
  let scResult = $(".result");
  let afNav = $(".af-nav");
  let scCheck = $(".sc-check");
  let wrapAf = $(".wrap-af");



  btnResult.on("click",function(){

    let morning = $("input[name='morning']:checked").val();
    let lunch = $("input[name='lunch']:checked").val();
    let dinner = $("input[name='dinner']:checked").val();

    let arrVege = [];
    let vege = "";
    if ($("input[name='vege']:checked").length){
      $("input[name='vege']:checked").each(function (i) {
        console.log("まえ"+vege);
        vege = vege + $(this).val() + "/";
        console.log("あと" + vege);
        arrVege.push($(this).val());
      });
      console.log(vege);
      vege = vege.slice(0,-1);
      console.log(vege);
    }
    else{
      vege = "null";
    }
    
    let arrFish = [];
    let fish = "";
    if ($("input[name='fish']:checked").length){
      $("input[name='fish']:checked").each(function () {
        fish = fish + $(this).val() + "/";
        arrFish.push($(this).val());
      });
      fish = fish.slice(0, -1);
    }
    else {
      fish = "null";
    }
    
    let arrFru = [];
    let fru = "";
    if ($("input[name='fru']:checked").length){
      $("input[name='fru']:checked").each(function () {
        fru = fru + $(this).val() + "/";
        arrFru.push($(this).val());
      });
      fru = fru.slice(0, -1);
    }
    else {
      fru = "null";
    }
    



    let point = 0;

    // コメントで一番よかった項目を出す
    let comRhythm = 0;
    let comVege = 0;
    let comFish = 0;
    let comFru = 0;
    let comSmoke = 0;
    let comSleep = 0;


    // 生活チェックの点数計算
    if (morning == "1"){
      point += 6;
      comRhythm += 6;
    }
    if (lunch == "1"){
      point += 6;
      comRhythm += 6;
    }
    if (dinner == "1"){
      point += 6;
      comRhythm += 6;
    }
    if (vege !== null){
      point += arrVege.length * 8;
      comVege = arrVege.length * 8;
    }
    else{
      vege = null;
    }
    if (fish !== null) {
      point += arrFish.length * 8;
      comFish = arrFish.length * 8;
    }
    else {
      fish = null;
    }
    if (fru !== null) {
      point += arrFru.length * 8;
      comFru = arrFru.length * 8;
    }
    else {
      fru = null;
    }

    let smoke = 10;

    
    // たばこ本数計算
    if ($("input[name='smoke']:checked") !== 0){
      smoke = smoke -= $(".picker-smoke").attr("data-smoke");
      comSmoke = smoke * 18 /10;
    }

    // 現在の日時
    let now = new Date();
    let nowDay = now.getDay();
    if (nowDay == 0){
      nowDay = 7;
    }
    let timing = now.getFullYear() + "/" + now.getMonth() + "/" + now.getDate()+ "/" + now.getDay(); 
    console.log(timing)
    

    // 睡眠時間
    // ストレージから
    
    let sleep = localStorage.getItem("dataSleep");
    comSleep = localStorage.getItem("dataSleep");

    point += sleep;

    localStorage.setItem("dataPoint", point);


    // moneyとsickをAPIに渡す
    let money;
    let sick;
    if (point >= 0 && 40 >= point) {
      money = 1;
      sick = 1;
    }
    else if (point >= 41 && 79 >= point) {
      money = 2;
      sick = 2;
    }
    else {
      money = 3;
      sick = 3;
    }

    // 100点
    // morning:1       6
    // lunch:1         6
    // dinner:1        6
    // vege:0,1,2      18(6*3)
    // fish:0,1,2      18(6*3)
    // fru:0,1,2       18(6*3)
    // smoke:0         10
    // sleep:7以上9以下/夜間  10 + 8 = 18    

    // morning:朝ごはん ,lunch:昼ごはん ,dinner:夜ご飯　
    // 0 => 食べてない　1 => 食べた

    // vege:野菜 ,fish:魚 ,fru:フルーツ (複数可能)
    // 食べてない => null 0 => 朝食べた　1 => 昼食べた　2 => 夜食べた

    // smoke:タバコ
    // 0 => 吸ってない　数字 => 吸った数

    // 生活チェック記録の
    // ajax通信
    $.ajax({
      url: "https://momokamiki.com/seikatsu/api_check.php",
      type: "GET",
      dataType: "jsonp",
      cache: false,
      data: {
        id: localStorage.getItem("dataId"),
        morning: morning,
        lunch: lunch,
        dinner: dinner,
        vege: vege,
        fish: fish,
        fru: fru,
        smoke: smoke,
        point: point,
        timing: timing,
        sleep: sleep,
        money: money,
        sick: sick
      },
      timeout: 3000
    })
    .done(function (data) {
      console.log("生活チェック通信成功")
      console.log(data)

      let checkData = data;

      console.log(checkData);

      // 成功したら結果画面表示
      scResult.addClass("on");
      scCheck.css("z-index", 1);
      wrapAf.removeClass("hid");
      setTimeout(function () {
        afNav.removeClass("down");
      }, 100)

      


      // apiでとったデータを入れる
      let week = checkData["week"];
      let result = checkData["result"];
      let timing = checkData["timing"];
      let electric = checkData["electric"];
      let smoke = checkData["smoke"];
      let vege = checkData["vege"];
      let fish = checkData["fish"];
      let fruit = checkData["fru"];
      let co2 = checkData["co2"];
      let energie = checkData["energie"];
      let sick = checkData["sick"];
      let money = checkData["money"];


      // カレンダーに追加ボタンのURLを設定
      let nowMonth = now.getMonth().toString()
      if (nowMonth.length == 1) {
        nowMonth = 0 + nowMonth;
      }
      let nowDay = now.getDay().toString()
      if (nowDay.length == 1) {
        nowDay = 0 + nowDay;
      }
      now.getFullYear() + "/" + now.getMonth() + "/" + now.getDay()
      let registCalender =
        "https://calendar.yahoo.co.jp/?V=60&TITLE=生活チェックは" + result +"点&ST="
        + now.getFullYear() + nowMonth + nowDay +
        "T1800&ET="
        + now.getFullYear() + nowMonth + nowDay +
        "T2359&DESC=この日の生活チェックの点数は、" + result + "点です。(生活リズムさんより)&ENC=UTF-8";
      $(".btn-calender a").attr("href", encodeURI(registCalender));

      // 結果画面に表示
      $(".result-point").removeClass("bad");
      $(".result-point").removeClass("soso");
      $(".result-point").removeClass("good");
      $(".result-point").text(result);
      if (result >= 0 && 40 >= result) {
        $(".result-point").addClass("bad");
      }
      else if (result >= 41 && 79 >= result) {
        $(".result-point").addClass("soso");
      }
      else {
        $(".result-point").addClass("good");
      }

      // 生活チェックのコメント表示
      let lastResult = week[week.length - 2];
      if (lastResult){
        console.log("前回の記録と比較")
        if (lastResult > result) {
          // bad
          $(".icon-result span").text("Bad");
          if (localStorage.getItem("dataPartner") == 2){
            $(".com-result").text("前回より点数が落ちちゃったブ〜。")
            $(".icon-result img").attr("src","img/chara03-face03.svg")
          }
          else{
            $(".com-result").text("前回より点数が落ちてしまいましたね。")
            if (localStorage.getItem("dataPartner") == 0){
              $(".icon-result img").attr("src", "img/chara01-face03.svg")
            }
            else{
              $(".icon-result img").attr("src", "img/chara02-face03.svg")
            }
          }
        }
        if (lastResult == result) {
          // Soso
          $(".icon-result span").text("Soso");
          if (localStorage.getItem("dataPartner") == 2) {
            $(".com-result").text("前回と点数は変わらないブ〜！")
            $(".icon-result img").attr("src", "img/chara03-face01.svg")
          }
          else {
            $(".com-result").text("前回と点数は変わりませんね！")
            if (localStorage.getItem("dataPartner") == 0) {
              $(".icon-result img").attr("src", "img/chara01-face01.svg")
            }
            else {
              $(".icon-result img").attr("src", "img/chara02-face01.svg")
            }
          }
        }
        if (lastResult < result) {
          // Good
          $(".icon-result span").text("Good");
          if (localStorage.getItem("dataPartner") == 2) {
            $(".com-result").text("前回より点数が上がったブ〜！！")
            $(".icon-result img").attr("src", "img/chara03-face02.svg")
          }
          else {
            $(".com-result").text("前回より点数が上がりましたね！！")
            if (localStorage.getItem("dataPartner") == 0) {
              $(".icon-result img").attr("src", "img/chara01-face02.svg")
            }
            else {
              $(".icon-result img").attr("src", "img/chara02-face02.svg")
            }
          }
        }
      }
      else{
        console.log("前回なし")
        // 前回の記録がない場合
        if ($(".result-point").hasClass("bad")){
          // bad
          $(".icon-result span").text("Bad");
          if (localStorage.getItem("dataPartner") == 2) {
            $(".com-result").text("今回の点数は悪い方だブ〜。１週間頑張れブ〜！")
            $(".icon-result img").attr("src", "img/chara03-face03.svg")
          }
          else {
            $(".com-result").text("今回の点数は悪い方ですね。１週間頑張りましょう！")
            if (localStorage.getItem("dataPartner") == 0) {
              $(".icon-result img").attr("src", "img/chara01-face03.svg")
            }
            else {
              $(".icon-result img").attr("src", "img/chara02-face03.svg")
            }
          }
        }
        if ($(".result-point").hasClass("soso")) {
          // soso
          $(".icon-result span").text("Soso");
          if (localStorage.getItem("dataPartner") == 2) {
            $(".com-result").text("今回の点数は普通だブ〜。１週間頑張れブ〜！")
            $(".icon-result img").attr("src", "img/chara03-face01.svg")
          }
          else {
            $(".com-result").text("今回の点数は普通ですね。１週間頑張りましょう！")
            if (localStorage.getItem("dataPartner") == 0) {
              $(".icon-result img").attr("src", "img/chara01-face01.svg")
            }
            else {
              $(".icon-result img").attr("src", "img/chara02-face01.svg")
            }
          }
        }
        if ($(".result-point").hasClass("good")) {
          // bad
          $(".icon-result span").text("Good");
          if (localStorage.getItem("dataPartner") == 2) {
            $(".com-result").text("今回の点数は良いブ〜！１週間頑張れブ〜！")
            $(".icon-result img").attr("src", "img/chara03-face02.svg")
          }
          else {
            $(".com-result").text("今回の点数は良いですね！１週間頑張りましょう！")
            if (localStorage.getItem("dataPartner") == 0) {
              $(".icon-result img").attr("src", "img/chara01-face02.svg")
            }
            else {
              $(".icon-result img").attr("src", "img/chara02-face02.svg")
            }
          }
        }
      }

      let comResult = [];
      comResult.push(comRhythm);
      comResult.push(comVege);
      comResult.push(comFish);
      comResult.push(comFru);
      // comResult.push(comSmoke);
      comResult.push(comSleep);

      let comGoodPoint = 0;
      let comGoodCont = "";

      $.each(comResult,function(i,e){
        if (comGoodPoint < Number(e)){
          comGoodPoint = Number(e);
          comGoodCont = i;
        }
      })

      if (localStorage.getItem("dataPartner") == 0){
        $(".icon-good img").attr("src", "img/chara01-face02.svg")
      }
      else if (localStorage.getItem("dataPartner") == 1){
        $(".icon-good img").attr("src", "img/chara02-face02.svg") 
      }
      else{
        $(".icon-good img").attr("src", "img/chara03-face02.svg")
      }

      switch (comGoodCont) {
        case 0:
          if (localStorage.getItem("dataPartner") == 2) {
            $(".com-good").text("生活リズムがしっかりしてて良いブ〜！");
          }
          else {
            $(".com-good").text("生活リズムがしっかりしてて良いですね！");
          }
          break;
        case 1:
          if (localStorage.getItem("dataPartner") == 2) {
            $(".com-good").text("野菜がしっかり取れてて良いブ〜！");
          }
          else {
            $(".com-good").text("野菜がしっかり取れてて良いですね！");
          }
          break;
        case 2:
          if (localStorage.getItem("dataPartner") == 2) {
            $(".com-good").text("魚がしっかり取れてて良いブ〜！");
          }
          else {
            $(".com-good").text("魚がしっかり取れてて良いですね！");
          }
          break;
        case 3:
          if (localStorage.getItem("dataPartner") == 2) {
            $(".com-good").text("フルーツがしっかり取れてて良いブ〜！");
          }
          else {
            $(".com-good").text("フルーツがしっかり取れてて良いですね！");
          }
          break;
        // case 4:
        //   if (localStorage.getItem("dataPartner") == 2) {
        //     $(".com-good").text("たばこ");
        //   }
        //   else {
        //     $(".com-good").text("生活リズムがしっかりしていますね！");
        //   }
        //   $(".com-good").text("たばこがGood！");
        //   break;
        case 4:
          if (localStorage.getItem("dataPartner") == 2) {
            $(".com-good").text("睡眠時間がちょうど良いブ〜！");
          }
          else {
            $(".com-good").text("睡眠時間がちょうど良いですね！");
          }
          break;
      }
      
      if (localStorage.getItem("dataPartner") == 2) {
        $(".box-all__txt").html(`
        今日、キミの生活リズムによって、貢献した社会貢献の項目と点数を発表するブ〜。<br>
        CO2削減は、${co2[0]}ポイント！<br>
        エネルギー削減は、${energie[0]}ポイント！<br>
        病気予防は、${sick[0]}ポイント！<br>
        節約度は、${money[0]}ポイント！<br>
        ※ 全て5ポイントがMAXだブ！MAXを目指して頑張るブ〜！`);
      }
      else {
        $(".box-all__txt").html(`
        今日、あなたの生活リズムによって、貢献した社会貢献の項目と点数を発表します。<br>
        CO2削減は、${co2[0]}ポイント！<br>
        エネルギー削減は、${energie[0]}ポイント！<br>
        病気予防は、${sick[0]}ポイント！<br>
        節約度は、${money[0]}ポイント！<br>
        ※ 全て5ポイントがMAXです！MAXを目指しましょう！`);
      }

      

      // マイページに表示
      $("#graph-week").graphMypage(week, result, timing, electric, smoke, vege, fish, fruit, co2, energie, sick, money);

      // ** ストレージに生活チェック済みを記録 => ボタンの表示切り替え
      // 選択内容を初期化
      $(".sc-check input").prop('checked', false);


    })
    .fail(function(error){
      console.log("生活チェックエラー"+error)
    })
  })
})