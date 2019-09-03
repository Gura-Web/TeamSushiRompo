$(function(){

  // 

  // ストレージデータ一覧
  // dataNoFirst => true/null
  // dataCheck => Y/M/D
  // dataMor => Y/M/D/H/M
  // dataNig => Y/M/D/H/M
  // dataBre => Y/M/D
  // dataLun => Y/M/D
  // dataGetting => H/M
  // dataSleep => 睡眠時間の点数
  // dataHomeNig => おやすみ押さなかった時 true
  // dataHomeCheck1 => 生活チェックしなかった時(1日)　true
  // dataHomeCheck2 => 生活チェックしなかった時(2日〜)　true
  // dataPoint => 生活チェックの点数
  
  

  // dataId => ユーザid
  // dataName => ユーザ名前
  // dataPartner => パートナー種類


  // firstTime : 存在しない => 初日
  // firstTime : false => 初日以外

  // セットする関数
  function setStorage(key, value) {
    localStorage.setItem(key, value);
  }

  // 読み込む関数
  function getStorage(key) {
    return localStorage.getItem(key);
  }


  // 現在の日付
  let now = new Date();
  let nowYear = now.getFullYear();
  let nowMonth = now.getMonth()+1;
  let nowDate = now.getDate();
  let nowHour = now.getHours();
  let nowMinute = now.getMinutes();

  // 昨日の日付
  let yesDate = now.getDate()-1;
  let yesMonth = nowMonth;

  if (yesDate == 0){
    if (nowMonth == 3) {
      yesDate = 29;
      yesMonth -= 1;
    }
    else if (nowMonth == 5 || nowMonth == 7 || nowMonth == 10 || nowMonth == 12){
      yesDate = 30;
      yesMonth -= 1;
    }
    else{
      yesDate = 31;
      yesMonth -= 1;
    }
  }

  // おとといの日付
  let befDate = now.getDate() - 2;
  let befMonth = nowMonth;

  if (yesDate == 0) {
    if (nowMonth == 3) {
      yesDate = 28;
      yesMonth -= 1;
    }
    else if (nowMonth == 5 || nowMonth == 7 || nowMonth == 10 || nowMonth == 12) {
      yesDate = 29;
      yesMonth -= 1;
    }
    else {
      yesDate = 30;
      yesMonth -= 1;
    }
  }


  // *****************************
  //  起動した時
  // *****************************
  console.log(getStorage("dataNoFirst"))
  if (getStorage("dataNoFirst")){
    // dataNoFirstがtrue(初日でない)で、

    //dataCheckの日付が今日と同じ
    if (getStorage("dataCheck") == nowYear + "/" + nowMonth + "/" + nowDate){
      // => ボタン押せない

      $(".btn-check").html("生活チェック不可能");
      $(".btn-check").removeClass("on");

      // dataNigの日付がおとといより前
      if (getStorage("dataNig") !== nowYear + "/" + nowMonth + "/" + nowDate || getStorage("dataNig") !== nowYear + "/" + yesMonth + "/" + yesDate) {
        // => キャラ怒る・コメントにおやすみ押してよ追加
        setStorage("dataHomeNig", true);
      }
    }

    //dataCheckの日付が昨日と同じ
    else if (getStorage("dataCheck") == nowYear + "/" + yesMonth + "/" + yesDate){
      //  => キャラ普通・ボタン押せる
      $(".btn-check").html("<p><img src='img/icon-check.svg' alt=''></p>生活チェック可能");
      $(".btn-check").addClass("on");

      // dataNigの日付がおとといより前
      if (getStorage("dataNig") !== nowYear + "/" + nowMonth + "/" + nowDate || getStorage("dataNig") !== nowYear + "/" + yesMonth + "/" + yesDate) {
        // => キャラ怒る・コメントにおやすみ押してよ追加
        setStorage("dataHomeNig", true);
      }
    }

    // dataCheckの日付がおとといと同じ
    else if(getStorage("dataCheck") == nowYear + "/" + befMonth + "/" + befDate){
      //  => キャラ怒る・ボタン押せる
      $(".btn-check").html("<p><img src='img/icon-check.svg' alt=''></p>生活チェック可能");
      $(".btn-check").addClass("on");

      setStorage("dataHomeCheck1", true);
    }

    // dataCheckの日付がおとといより前(今日、昨日、おととい以外)
    else{
      //  => キャラ体調不良・ボタン押せる
      $(".btn-check").html("<p><img src='img/icon-check.svg' alt=''></p>生活チェック可能");
      $(".btn-check").addClass("on");

      setStorage("dataHomeCheck2", true);
    }
  }

  else{
    // dataNoFirstが存在しない(初日)で、dataCheckの日付がない
    if (!getStorage("dataCheck")){
      //  => キャラ普通
    }
  }

  // 起床時間をセット
  setStorage("dataGetting", $(".display-hour").text() + "/" + $(".display-minute").text())
  let getting = getStorage("dataGetting");
  let gettingH = getting.split("/")[0];
  let gettingM = getting.split("/")[1];
  $(".display-hour").text(gettingH);
  $(".display-minute").text(gettingM);



  let week = [];
  if(week !== null){
    let weekPoints = localStorage.getItem("dataWeek").split(",");
    $.each(weekPoints, function (i, e) {
      week.push(e);
    })
  }
  
  let result = localStorage.getItem("dataResult");
  let timing = localStorage.getItem("dataTiming");
  let electric = localStorage.getItem("dataElectric");
  let smoke = localStorage.getItem("dataSmoke");
  let vege = localStorage.getItem("dataVege");
  let fish = localStorage.getItem("dataFish");
  let fruit = localStorage.getItem("dataFruit");
  let co2 = localStorage.getItem("dataCo2");
  let energie = localStorage.getItem("dataEnergie");
  let sick = localStorage.getItem("dataSick");
  let money = localStorage.getItem("dataMoney");


  // マイページに表示
  if (localStorage.getItem("dataNoFirst")) {
    $("#graph-week").graphMypage(week, result, timing, electric, smoke, vege, fish, fruit, co2, energie, sick, money);
  }

  // ホーム表示
  $(".sc-home").charaMypage();


  // *****************************
  //  おはようボタンを押した時
  // *****************************

  // dataMorに現在のY/M/Dを入れる => ボタン押せなくする
  $(".btn-morning").on("click",function(){
    
    // dataMorが今日と同じならalert
    if (getStorage("dataMor") == nowYear + "/" + nowMonth + "/" + nowDate){
      alert("今日はすでに「おはよう」ボタンを押しています。")
    } 
    else{
      setStorage("dataMor", nowYear + "/" + nowMonth + "/" + nowDate + "/" + nowHour + "/" + nowMinute);
    }
  })
  

  // *****************************
  //  おやすみボタンを押した時
  // *****************************

  // dataNigに現在のY/M/Dを入れる => ボタン押せなくする
  $(".btn-night").on("click",function(){

    localStorage.removeItem("dataHomeNig");

    // dataNigが今日と同じならalert
    if (getStorage("dataNig") == nowYear + "/" + nowMonth + "/" + nowDate) {
      alert("今日はすでに「おやすみ」ボタンを押しています。")
    }
    else {
      setStorage("dataNig", nowYear + "/" + nowMonth + "/" + nowDate + "/" + nowHour + "/" + nowMinute);
    }
  })
  

  // *****************************
  //  生活チェックボタンを押した時
  // *****************************

  $(".btn-check").on("click",function(){

    if($(this).hasClass("on")){
      localStorage.removeItem("dataHomeCheck1");
      localStorage.removeItem("dataHomeCheck2");


      // dataNoFirstにtrueを入れる(初日じゃなくする)
      setStorage("dataNoFirst", true);

      // dataCheckに今日の日付を入れる => ボタン押せなくする
      setStorage("dataCheck", nowYear + "/" + nowMonth + "/" + nowDate);
      $(".btn-check").html("生活チェックは不可能");
      $(".btn-check").removeClass("on");

      // dataBre・dataLunに今日の日付がある場合は、生活チェックの問題を変更
      if (getStorage("dataBre") == nowYear + "/" + nowMonth + "/" + nowDate && getStorage("dataLun") == nowYear + "/" + nowMonth + "/" + nowDate) {
        // どちらもある場合
        $(".quest03").addClass("on");
        $('input[name="morning"]').eq(0).prop("checked", true);
        $('input[name="lunch"]').eq(0).prop("checked", true);
        console.log("aaaaa")
        $(".quest03 .header-qu p").text("1/5");
        $(".quest04 .header-qu p").text("2/5");
        $(".quest05 .header-qu p").text("3/5");
        $(".quest06 .header-qu p").text("4/5");
        $(".quest07 .header-qu p").text("5/5");
      }
      else if (getStorage("dataBre") == nowYear + "/" + nowMonth + "/" + nowDate) {
        // dataBreはある場合
        $(".quest02").addClass("on");
        $('input[name="morning"]').eq(0).prop("checked", true);
        console.log("iiiii")
        $(".quest02 .header-qu p").text("1/6");
        $(".quest03 .header-qu p").text("2/6");
        $(".quest04 .header-qu p").text("3/6");
        $(".quest05 .header-qu p").text("4/6");
        $(".quest06 .header-qu p").text("5/6");
        $(".quest07 .header-qu p").text("6/6");
      }
      else if (getStorage("dataLun") == nowYear + "/" + nowMonth + "/" + nowDate) {
        // dataLunはある場合
        $(".quest01").addClass("on");
        $(".quest01").addClass("not");
        $('input[name="lunch"]').eq(0).prop("checked", true);
        console.log("uuuuu")
        $(".quest01 .header-qu p").text("1/6");
        $(".quest03 .header-qu p").text("2/6");
        $(".quest04 .header-qu p").text("3/6");
        $(".quest05 .header-qu p").text("4/6");
        $(".quest06 .header-qu p").text("5/6");
        $(".quest07 .header-qu p").text("6/6");
      }
      else {
        // どちらもない場合
        $(".quest01").addClass("on");
        console.log("eeeee")
      }


      // 睡眠時間の計算 
      if (getStorage("dataNoFirst")) {
        // dataNigが昨日の日付かつ、dataMorが今日の日付の場合
        if (getStorage("dataNig") == nowYear + "/" + yesMonth + "/" + yesDate && getStorage("dataMor") == nowYear + "/" + nowMonth + "/" + nowDate) {
          // 正常に計算する
          let nights = getStorage("dataNig").split("/");
          let nightH = nights[3];
          let nightM = nights[4];

          if (nightM == 0) {
            nightH = 24 - nights[3];
          }
          else {
            nightH = 24 - nights[3] - 1;
            nightM = 60 - nightM;
          }

          let mornings = getStorage("dataMor").split("/");
          let morningH = mornings[3];
          let morningM = mornings[4];

          let sleepH = nightH + morningH;
          let sleepM = nightM + morningM;
          if (sleepM >= 50) {
            sleepH += 1;
          }

          if (sleepH >= 7 && sleepH <= 9) {
            setStorage("dataSleep", 18);
          }
          else if (sleepH == 6 || sleepH == 10) {
            setStorage("dataSleep", 15);
          }
          else if (sleepH == 5 || sleepH == 11) {
            setStorage("dataSleep", 10);
          }
          else {
            setStorage("dataSleep", 5);
          }
        }
        else {
          // どちらか、または両方を忘れていた場合は5点
          setStorage("dataSleep", 5);
        }
      }
      else {
        // dataNoFirstが存在しない場合は、12点
        setStorage("dataSleep", 12);
      }

    }
    else{
      alert("生活チェックは現在できません！")
    }
  })
  

    


  // *****************************
  //  食べたボタンを押した時
  // *****************************

  // 5:00~9:59 => dataBreに日付を記録
  // 10:00~14:59 => dataLunに日付を記録

  // 朝ごはん食べた
  $(".btn-break-y").on("click", function () {

    // dataBreが今日と同じならalert
    if (getStorage("dataNig") == nowYear + "/" + nowMonth + "/" + nowDate) {
      alert("今日はすでに「朝ごはん食べた」ボタンを押しています。")
    }
    else{
      // 朝ごはん食べたことをストレージに記録
      setStorage("dataBre", nowYear +"/"+ nowMonth +"/"+ nowDate);
      $(this).parents(".modal").removeClass("show");
    }
  })

  // 昼ごはん食べた
  $(".btn-lunch-y").on("click", function () {

    // dataLunが今日と同じならalert
    if (getStorage("dataLun") == nowYear + "/" + nowMonth + "/" + nowDate) {
      alert("今日はすでに「昼ごはん食べた」ボタンを押しています。")
    }
    else{
      // 昼ごはん食べたことをストレージに記録
      setStorage("dataLun", nowYear +"/"+ nowMonth +"/"+ nowDate);
      $(this).parents(".modal").removeClass("show");
    }
  })


  // *****************************
  //  起床時間を決定した時
  // *****************************

  $(".btn-decision").on("click",function(){
    setStorage("dataGetting", $(".display-hour").text() + "/" + $(".display-minute").text());
  })


  // *****************************
  //  ログアウト押した時
  // *****************************
  $(".btn-logout").on("click",function(){
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

    $(".wrap-be").css("display", "block");
    
    setTimeout(function () {
      $(".wrap-af").removeClass("in");
      $(".wrap-be").removeClass("out");
      $(".af-screens").css("left","100%")
      $(".box-chara__img").css("margin", "20px auto 0");
    }, 600);


  })

  
})