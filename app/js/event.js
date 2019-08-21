$(function(){
  let scRegi = $(".sc-regi");
  let scLog = $(".sc-log");
  let scConf = $(".sc-conf");
  let scComp = $(".sc-comp");
  let btnMoveRegi = $(".btn-move-regi");
  let btnMoveLog = $(".btn-move-log");
  let btnReturn = $(".btn-return");
  let scLoad = $(".sc-load");
  let wrapAf = $(".wrap-af");

  // ロード画面
  setTimeout(function(){
    scLoad.css("opacity",0);
    setTimeout(function(){
      scLoad.css("z-index",0);
    },100)
  },1400);
  
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
  let btnResult = $(".btn-result");
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
    let nowNum = $(this).parents(".sc-quest").attr("class").split(" ")[1].split("0")[1];
    let nextNum = Number(nowNum) + 1;
    $(".quest0" + nextNum).addClass("on");
  })

  

  // 生活チェック 戻るボタン
  let btnReturnQuest = $(".btn-return-quest");
  btnReturnQuest.on("click",function(){
    $(this).parents(".sc-quest").removeClass("on");
  })


  // ピッカー(プラグイン)
  $(".picker-hour").picker({
    name: 'hour',
    data: ['1', '2', '3', '4', '5', '6', '7','8','9','10','11','12'],
    lineHeight: 50, // default: 30,
    selected: 0
  });
  $(".picker-minute").picker({
    name: 'minute',
    data: [
      '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 
      '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
      '21', '22', '23', '24', '25', '26', '27', '28', '29', '30',
      '31', '32', '33', '34', '35', '36', '37', '38', '39', '30',
      '41', '42', '43', '44', '45', '46', '47', '48', '49', '40',
      '51', '52', '53', '54', '55', '56', '57', '58', '59', '60'
    ],
    lineHeight: 50, // default: 30,
    selected: 0
  });

})
