// 生活チェック
$(function(){
  let btnResult = $(".btn-result");
  let result = $(".result");
  let afNav = $(".af-nav");
  let scCheck = $(".sc-check");

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
        // id:id, // ストレージから？？
        morning: morning,
        lunch: lunch,
        dinner: dinner,
        vege: vege,
        fish: fish,
        fru: fru,
        // smoke: smoke,
        point: point
      },
      timeout: 3000
    })
    .done(function (data) {
      console.log("成功")
      console.log(data)

      // 成功したら結果画面表示
      result.addClass("on");
      scCheck.css("z-index", 1);
      setTimeout(function () {
        afNav.removeClass("down");
      }, 100)

      // マイページにこのデータを反映
      // ストレージに一番最新のチェックデータとして保存
      // 一番最初のデータもストレージ？
      // 電気使用率の計算

      // 入力データ削除
      // ボタンを済みにする


    })
    .fail(function(error){
      console.log("エラー")
    })
  })
})