$(function(){

  // ログインしたことあれば(dataIdあれば)ホーム表示
  if(localStorage.getItem("dataId") !== null){
    $(".wrap-af").addClass("in");
    $(".wrap-be").addClass("out");
    setTimeout(function () {
      $(".wrap-be").css("display", "none");
    }, 600);

    if (localStorage.getItem("dataPartner") == 2) {
      $(".box-chara__img").css("margin", "120px auto 110px");
    }
  }



  let scRegi = $(".sc-regi");
  let scLog = $(".sc-log");
  let scConf = $(".sc-conf");
  let scComp = $(".sc-comp");
  let btnMoveRegi = $(".btn-move-regi");
  let btnMoveLog = $(".btn-move-log");
  let btnReturn = $(".btn-return");
  let scLoad = $(".sc-load");
  let wrapAf = $(".wrap-af");
  let btnPush = $(".btn-push");

  // ロード画面
  scLoad.css("opacity", 0);
  scLoad.css("z-index", 0);
  // setTimeout(function(){
  //   scLoad.css("opacity",0);
  //   setTimeout(function(){
  //     scLoad.css("z-index",0);
  //   },100)
  // },1400);
  
  // 新規登録画面へ移動
  btnMoveRegi.on("click",function(){
    scRegi.addClass("show");
    setTimeout(function(){
      scLog.removeClass("show");
      scConf.removeClass("show");
      scComp.removeClass("show");
      $("input[name='log-address']").removeClass("er");
      $("input[name='log-pass']").removeClass("er");
      $("input[name='log-address']").val("");
      $("input[name='log-pass']").val("");
    },400);
  })

  // ログイン画面へ移動
  btnMoveLog.on("click",function(){
    scLog.addClass("show");
    scLog.css("z-index",1);
    setTimeout(function(){
      scComp.removeClass("show");
      setTimeout(function(){
        scLog.css("z-index", 0);
      },500)
    },400)
  })

  // 前の画面へ移動
  btnReturn.on("click",function(){
    $(this).parents(".sc").removeClass("show");
  })

  // ログイン後 メニュー押した時の動き
  let btnMoveHome = $(".btn-move-home");
  let btnMoveMy = $(".btn-move-my");
  let btnMoveSet = $(".btn-move-set");

  // ホーム画面
  let scCheck = $(".sc-check");
  let scQuest = $(".sc-quest");
  let btnCheck = $(".btn-check");
  let btnNext = $(".btn-next");
  let result = $(".result");
  let afNav = $(".af-nav");

  // 上の3つ囲んだタグ
  let afScreens = $(".af-screens");

  btnMoveHome.on("click",function(){
    btnMoveHome.addClass("on");
    btnMoveMy.removeClass("on");
    btnMoveSet.removeClass("on");
    afScreens.css("left","100%");
    setTimeout(function(){
      btnMoveHome.children("p").addClass("on");
    },100)
    btnMoveHome.children("p").removeClass("on");
    // 生活チェックから帰ってきた時だけでいい↓
    if(result.hasClass("on")){
      setTimeout(function () {
        scCheck.removeClass("on");
        scQuest.removeClass("on");
        result.removeClass("on");
        setTimeout(function(){
          scCheck.css("z-index", 10);
        },400)
      }, 400)
    }
  })
  btnMoveMy.on("click", function () {
    btnMoveMy.addClass("on");
    btnMoveHome.removeClass("on");
    btnMoveSet.removeClass("on");
    afScreens.css("left", "0%");
    setTimeout(function () {
      btnMoveMy.children("p").addClass("on");
    }, 100)
    btnMoveMy.children("p").removeClass("on");
    if (result.hasClass("on")) {
      setTimeout(function () {
        scCheck.removeClass("on");
        scQuest.removeClass("on");
        result.removeClass("on");
        setTimeout(function () {
          scCheck.css("z-index", 10);
        }, 400)
      }, 400)
    }
  })
  btnMoveSet.on("click", function () {
    btnMoveSet.addClass("on");
    btnMoveHome.removeClass("on");
    btnMoveMy.removeClass("on");
    afScreens.css("left", "-100%");
    setTimeout(function () {
      btnMoveSet.children("p").addClass("on");
    }, 100)
    btnMoveSet.children("p").removeClass("on");
    if (result.hasClass("on")) {
      setTimeout(function () {
        scCheck.removeClass("on");
        scQuest.removeClass("on");
        result.removeClass("on");
        setTimeout(function () {
          scCheck.css("z-index", 10);
        }, 400)
      }, 400)
    }
  })

  // ホーム画面
  btnCheck.on("click",function(){
    scCheck.addClass("on");
    wrapAf.addClass("hid");
    setTimeout(function(){
      afNav.addClass("down");
    },400)
  })

  btnNext.on("click",function(){
    if ($(this).parents(".sc-quest").hasClass("not")){
      $(".quest03").addClass("on");
      $(this).removeClass("not")
    }
    else{
      let nowNum = $(this).parents(".sc-quest").attr("class").split(" ")[1].split("0")[1];
      let nextNum = Number(nowNum) + 1;
      $(".quest0" + nextNum).addClass("on");
    }
  })

  
  

  // 生活チェック 戻るボタン
  let btnReturnQuest = $(".btn-return-quest");
  btnReturnQuest.on("click",function(){
    $(this).parents(".sc-quest").removeClass("on");
  })


  // ピッカー(プラグイン)
  $(".picker-hour").picker({
    name: 'hour',
    data: ['00','01', '02', '03', '04', '05', '06', '07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23'],
    lineHeight: 30, // default: 30,
    selected: 7
  });
  $(".picker-minute").picker({
    name: 'minute',
    data: [
      '00','01', '02', '03', '04', '05', '06', '07', '08', '09', '10', 
      '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
      '21', '22', '23', '24', '25', '26', '27', '28', '29', '30',
      '31', '32', '33', '34', '35', '36', '37', '38', '39', '30',
      '41', '42', '43', '44', '45', '46', '47', '48', '49', '40',
      '51', '52', '53', '54', '55', '56', '57', '58', '59', '60'
    ],
    lineHeight: 30, // default: 30,
    selected: 10
  });
  $(".picker-smoke").picker({
    name: 'smoke',
    data: [
      '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10本以上'],
    lineHeight: 30, // default: 30,
    selected: 0
  })


  $('.clone-scroller-hour').bind("scroll", function () {
    $(".display-hour").text($(".picker-hour").attr("data-hour"));
  });
  $('.clone-scroller-minute').bind("scroll", function () {
    $(".display-minute").text($(".picker-minute").attr("data-minute"));
  });


  // プッシュ通知ON/OFF
  btnPush.on("click",function(){

    if($(this).hasClass("on")){
      $(this).removeClass("on");
      $(this).addClass("off");
      $(".btn-push-on").removeClass("check");
      $(".btn-push-off").addClass("check");
    }
    else{
      $(this).addClass("on");
      $(this).removeClass("off");
      $(".btn-push-on").addClass("check");
      $(".btn-push-off").removeClass("check");
    }
  })


  // ホーム画面
  let btnMorning = $(".btn-morning");
  let btnNight = $(".btn-night");
  let btnAte = $(".btn-ate");
  let modalOhayo = $(".modal-ohayo");
  let modalOyasumi = $(".modal-oyasumi");
  let modalBreak = $(".modal-break");
  let modalLunch = $(".modal-lunch");
  let btnClose = $(".btn-close");

  btnMorning.on("click",function(){
    modalOhayo.addClass("show");
    // 起きた時間をストレージに記録する(storage.js)
  })
  btnNight.on("click", function () {
    modalOyasumi.addClass("show");
    // 寝る時間をストレージに記録する(storage.js)
  })
  btnClose.on("click",function(){
    $(this).parents(".modal").removeClass("show");
  })

  let nowHour = new Date().getHours();
  // 5:00~9:59 => あさごはん
  // 10:00~14:59 => ひるごはん
  // 15:00~4:59 => 押すとアラート
  btnAte.on("click", function () {
    if (nowHour >= 5 && nowHour <= 9){
      modalBreak.addClass("show");
    }
    else if (nowHour >= 10 && nowHour <= 14){
      modalLunch.addClass("show");
    }
    else{
      alert("AM5時から朝ごはんチェック、AM10時から昼ごはんチェックが可能です。")
    }
  })



  $(".btn-n").on("click",function(){
    $(this).parents(".modal").removeClass("show");
  })

  // 生活チェック可能時間　18:00~23:59
  setInterval(function () {
    if (nowHour >= 18 && nowHour <=23){
      btnCheck.addClass("on")
    }
  },60000)


})
