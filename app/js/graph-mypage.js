// マイページに表示する関数

// week : １週間の生活チェックの点数 月曜〜日曜 [月,火,水,木,金,土,日]
// result : 最新のチェックの点数
// timing : 最新のチェックの日付 "Y/M/D"
// electric : 電気使用率 最初と最新 [最初,最新] 例：[20,50]
// smoke : タバコの本数 最初と最新 [最初,最新]
// vege : 最新のチェック結果の野菜食べたタイミング [ null or 数字]
// fish : 最新のチェック結果の魚食べたタイミング [ null or 数字 ]
// fruit : 最新のチェック結果の魚食べたタイミング [ null or 数字 ]
// ( 食べてない => null  0 => 朝食べた 　1 => 昼食べた 　2 => 夜食べた )
// CO2 : CO2削減 点数と+-　 例：[ 3 , "+" ]  
// energie : エネルギー節約 点数と+-
// sick : 病気予防 点数と+-
// money : 節約 点数と+-
// ( 最初と比べて上がった => "+"  下がった => "-"  変化無し => "" )


(function ($) {
  $.fn.graphMypage = function (week, result, timing,electric,smoke,vege,fish,fruit,co2,energie,sick,money) {

    // 注意メッセージを消す
    $(".msg").remove();

    let date = new Date();

    //
    // 最新がいつか表示
    //
    $(".box-points").html("");
    let now = date.getFullYear() + "/" + date.getMonth() + "/" + date.getDay();
    if (timing == now){
      $(".box-points").append(`
        <p>今日の健康点数</p>
        <p class="point-check">${result}/100<span>点</span></p>
      `);
      $(".data-when").text("今日のデータ")
    }
    else{
      $(".box-points").append(`
        <p>${date.getMonth() + "/" + date.getDay()}の健康点数</p>
        <p class="point-check">${result}/100<span>点</span></p>
      `);
      $(".data-when").text(`${date.getMonth() + "/" + date.getDay()}のデータ`)
    }

    //
    // １週間グラフ
    //
    $("#graph-week").html("");
    let graphWeek = $("#graph-week");
    let weekChart = new Chart(graphWeek, {
      type: 'line',
      data: {
        labels: ['月', '火', '水', '木', '金', '土', '日'],
        datasets: [
          {
            data: week,
            borderColor: "#3BD5BB",
            backgroundColor: "rgba(0,0,0,0)"
          }
        ],
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            ticks: {
              suggestedMax: 90,
              suggestedMin: 10,
              stepSize: 20,
              callback: function (value, index, values) {
                return value + '点'
              }
            }
          }]
        },
      }
    });

    // 
    // 最新のチェック結果 if分岐
    //
    $(".sc-my").removeClass("bad");
    $(".sc-my").removeClass("soso");
    $(".sc-my").removeClass("good");
    if(result >= 0 &&  40 >= result ){
      $(".sc-my").addClass("bad");
      $(".sc-my h2 span").text("悪い");
    }
    else if(result >= 41 && 79 >= result){
      $(".sc-my").addClass("soso");
      $(".sc-my h2 span").text("普通");
    }
    else{
      $(".sc-my").addClass("good");
      $(".sc-my h2 span").text("良い");
    }

    //
    // 電気使用率
    //
    if (electric[0] < electric[1]){
      $(".point-electric").html(`
        <div class="over"><span>${electric[1]}%</span></div>
        <div class="remain"></div>
      `)
      $(".point-electric").siblings().addClass("up");
      $(".point-electric").siblings().html(`
        電気使用率<span>+<span>${electric[1] - electric[0]}</span>%</span>
      `)
      $(".point-electric .over").css("width","80%");
    }
    else if (electric[0] == electric[1]){
      $(".point-electric").html(`
        <div class="now"><span>${electric[1]}%</span></div>
        <div class="remain"></div>
      `)
      $(".point-electric .now").css("width", "50%");
    }
    else{
      $(".point-electric").html(`
        <div class="now"><span>${electric[1]}%</span></div>
        <div class="first"><span>${electric[0]}%</span></div>
        <div class="remain"></div>
      `)
      $(".point-electric").siblings().addClass("down");
      $(".point-electric").siblings().html(`
        電気使用率<span>-<span>${electric[0] - electric[1]}</span>%</span>
      `)
      $(".point-electric .now").css("width", "50%");
      $(".point-electric .first").css("width", "70%");
    }


    //
    // タバコ本数
    //
    if (smoke[0] < smoke[1]) {
      $(".point-smoke").html(`
        <div class="over"><span>${smoke[1]}本</span></div>
        <div class="remain"></div>
      `)
      $(".point-smoke").siblings().addClass("up");
      $(".point-smoke").siblings().html(`
        タバコ本数<span>+<span>${smoke[1] - smoke[0]}</span>本</span>
      `)
      $(".point-smoke .over").css("width", "80%");
    }
    else if (smoke[0] == smoke[1]) {
      $(".point-smoke").html(`
        <div class="now"><span>${smoke[1]}本</span></div>
        <div class="remain"></div>
      `)
      $(".point-smoke .over").css("width", "50%");
    }
    else {
      $(".point-smoke").html(`
        <div class="now"><span>${smoke[1]}本</span></div>
        <div class="first"><span>${smoke[0]}本</span></div>
        <div class="remain"></div>
      `)
      $(".point-smoke").siblings().addClass("down");
      $(".point-smoke").siblings().html(`
        タバコ本数<span>-<span>${smoke[0] - smoke[1]}</span>本</span>
      `)
      $(".point-smoke .now").css("width", "50%");
      $(".point-smoke .first").css("width", "70%");
    }

    //
    // 野菜
    //
    if(vege[0] !== "null"){
      $.each(vege,function(i){
        $(".point-vege").eq(i).addClass("on");
      })
    }

    //
    // 魚
    //
    if (fish[0] !== "null") {
      $.each(fish, function (i) {
        $(".point-fish").eq(i).addClass("on");
      })
    }

    //
    // フルーツ
    //
    if (fruit[0] !== "null") {
      $.each(fruit, function (i) {
        $(".point-fruit").eq(i).addClass("on");
      })
    }

    //
    // 社会貢献度 レーダーチャート
    //
    let co2Dif = "";
    if (co2[1] == "+"){
      co2Dif = "▲";
    }
    else if (co2[1] == "-"){
      co2Dif = "▼";
    }

    let energieDif = "";
    if (energie[1] == "+") {
      energieDif = "▲";
    }
    else if (energie[1] == "-") {
      energieDif = "▼";
    }

    let moneyDif = "";
    if (money[1] == "+") {
      moneyDif = "▲";
    }
    else if (money[1] == "-") {
      moneyDif = "▼";
    }

    let sickDif = "";
    if (sick[1] == "+") {
      sickDif = "▲";
    }
    else if (sick[1] == "-") {
      sickDif = "▼";
    }

    $("#graph-social").html("");
    let graphSocial = $("#graph-social");
    let socialChart = new Chart(graphSocial, {
      type: 'radar',
      data: {
        labels: [['Co2削減', co2[0] + co2Dif], ['エネルギー', '節約', energie[0] + energieDif], ['節約', money[0] + moneyDif], ['病気予防', sick[0] + sickDif]],
        datasets: [
          {
            data: [co2[0], energie[0], money[0], sick[0]],
            backgroundColor: "rgba(59,213,187,0.6)"
          }
        ],
      },
      options: {
        legend: {
          display: false,
          labels:{
            defaultFontSize: "12px"
          }
        },
        scale: {
          ticks: {
            suggestedMax: 5,
            suggestedMin: 0,
            stepSize: 1,
            // callback: function (value, index, values) {
            //   return value + [0]
            // }
          }
        }
      }
    });

    $("#graph-social").css("width", 327*1.6);
    $("#graph-social").css("height", 163*1.6);

    return true;
  }
}(jQuery));
