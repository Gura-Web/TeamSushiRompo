$(function(){
  let scRegi = $(".sc-regi");
  let scLog = $(".sc-log");
  let scConf = $(".sc-conf");
  let scComp = $(".sc-comp");
  let btnMoveRegi = $(".btn-move-regi");
  let btnMoveLog = $(".btn-move-log");
  let btnReturn = $(".btn-return");
  
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

})
