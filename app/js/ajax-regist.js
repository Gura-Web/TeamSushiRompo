
// 新規登録のajax関数
function ajaxRegist(name,mail,pass,gender,birth,partner){
  $.ajax({
    url: "api_regist.php",
    method: "get",
    dataType: "json",
    cashe: false,
    data:{
      name:name,
      mail:mail,
      pass:pass,
      gender:gender,
      birth:birth,
      partner:partner
    },
    timeout: 3000
  })
  .done(function(data){
    console.log(data)
    if(data){
      $(".sc-comp").addClass("show");
      setTimeout(function(){
        $(".sc-regi").removeClass("show");
        $(".sc-conf").removeClass("show");
        $(".form-parts input").val("");
        $(".form-parts input").prop('checked', false);
      },400)
    }
  })
  .fail(function(error){
    console.log(error)
  })
}
