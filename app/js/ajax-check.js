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
    let vege = [];
    $("input[name='vege']:checked").each(function(){
      vege.push($(this).val());
    });
    if(!vege.length){
      vege = null;
    }
    let fish = [];
    $("input[name='fish']:checked").each(function () {
      fish.push($(this).val());
    });
    if (!fish.length) {
      fish = null;
    }
    let fru = [];
    $("input[name='fru']:checked").each(function () {
      fru.push($(this).val());
    });
    if (!fru.length) {
      fru = null;
    }


    let point = 0;

    // 生活チェックの点数計算
    if (morning == "1"){
      point += 6;
    }
    if (lunch == "1"){
      point += 6;
    }
    if (dinner == "1"){
      point += 6;
    }
    if (vege !== null){
      point += vege.length * 8;
    }
    if (fish !== null) {
      point += fish.length * 8;
    }
    if (fru !== null) {
      point += fru.length * 8;
    }

    let smoke = 10;
    
    // たばこ本数計算
    if ($("input[name='smoke']:checked") !== 0){
      smoke = smoke -= $(".picker-smoke").attr("data-smoke");
  
    }

    // 現在の日時
    let now = new Date();
    let timing = now.getFullYear() + "/" + now.getMonth() + "/" + now.getDay(); 


    // 睡眠時間
    // ストレージから計算
    let sleep = 18;


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
      url: "api_check.php",
      method: "get",
      dataType: "json",
      cashe: false,
      data: {
        id: $(".wrap-af").attr("data-id"),
        morning: morning,
        lunch: lunch,
        dinner: dinner,
        vege: vege,
        fish: fish,
        fru: fru,
        smoke: smoke,
        point: point,
        timing: timing,
        sleep: sleep
      },
      timeout: 3000
    })
    .done(function (data) {
      console.log("成功")
      console.log(data)

      // 成功したら結果画面表示
      scResult.addClass("on");
      scCheck.css("z-index", 1);
      wrapAf.removeClass("hid");
      setTimeout(function () {
        afNav.removeClass("down");
      }, 100)


      // apiでとったデータを入れる
      let week = [10,20,30,40];
      let result = 70;
      let timing = "2019/8/4";
      let electric = [50,30];
      let smoke = [3,5];
      let vege = ["null"];
      let fish = [0,1];
      let fruit = [0,1,2];
      let co2 = [5 , "+"];
      let energie = [3, "-"];
      let sick = [4, ""];
      let money = [5, "+"];

      // マイページに表示
      $("#graph-week").graphMypage(week, result, timing, electric, smoke, vege, fish, fruit, co2, energie, sick, money);

      

    })
    .fail(function(error){
      console.log(error)
    })
  })
})