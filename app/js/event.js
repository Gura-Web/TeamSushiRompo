$(function(){
  let scTop = $(".sc-top");
  let scRegi = $(".sc-regi");
  let scLog = $(".sc-log");
  let scConf = $(".sc-conf");
  let scComp = $(".sc-comp");

  let btnMoveRegi = $(".btn-move-regi");
  let btnMoveLog = $(".btn-move-log");
  let btnReturn = $(".btn-return");
  let btnReturnRegi = $(".sc-regi .btn-return");
  

  // 新規登録画面へ移動
  btnMoveRegi.on("click",function(){
    scRegi.addClass("show");
    setTimeout(function(){
      scLog.removeClass("show");
      scConf.removeClass("show");
      scComp.removeClass("show");
    },400);
  })

  // ログイン画面へ移動
  btnMoveLog.on("click",function(){
    scLog.addClass("show");

  })

  // 前の画面へ移動
  btnReturn.on("click",function(){
    $(this).parents(".sc").removeClass("show");
  })
  btnReturnRegi.on("click",function(){
    setTimeout(function () {
      // エラー初期化
      $(".sc").removeClass("er");
      $(".box-form-txt").removeClass("er");
    }, 400)
  })



})
