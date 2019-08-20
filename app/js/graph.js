$(function(){
    // 今日は何曜日とる

    var hiduke=new Date(); 
    // 0:Sun,1:Mon,2:Tue,3:Wed,4:Thu,5:Fri,6:Sat
    var week = hiduke.getDay();
    // idを取る
    var Id=$(".myid").attr("data-id");
    // ajaxで点数をもらう
    
    $.ajax({
        url : 'api_check.php?id='+Id+'',
        method : "get",
        cache : false,
        dataType : "json",
        timeout : 100,
        data :""
    })
  
    .done( function( data ){
        var first=data[0]["first"];
        var mon=data[0]["Mon"];
        var tue= data[0]["Tue"];
        var wed=data[0]["Wed"];
        var thu=data[0]["Thu"];
        var fri=data[0]["Fri"];
        var sat=data[0]["Sat"];
        var sun=data[0]["Sun"];
        var ctx = $("#myLineChart");
        var myLineChart = new Chart(ctx, {
            type: 'line',
            data: {
            labels: ['月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日', '日曜日'],
            datasets: [
                {
                label: '点数',
                data: [mon, tue, wed, thu, fri, sat, sun],
                borderColor: "rgba(0,0,255,1)",
                backgroundColor: "rgba(0,0,0,0)",
                borderSize: 100
                }
            ],
            },
            
            options: {
            title: {
                display: true,
                text: '今週の点数う'
            },
            scales: {
                yAxes: [{
                ticks: {
                    suggestedMax: 100,
                    suggestedMin: 0,
                    stepSize: 20,
                    callback: function(value, index, values){
                    return  value 
                    }
                }
                }]
            },
            }
        });  
        
        // 棒
    var ctx = $("#myBarChart");
    var myBarChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日', '日曜日'],
        datasets: [
        {
            label: '最初診断の結果',
            data: [first, first, first,first, first, first, first],
            backgroundColor: "rgba(219,39,91,0.5)"
        },{
            label: '今週の状態',
            data: [mon, tue, wed, thu, fri, sat, sun],
            backgroundColor: "rgba(130,201,169,0.5)"
        }
        ]
    },
    options: {
        title: {
        display: true,
        text: '私の状況'
        },
        scales: {
        yAxes: [{
            ticks: {
            suggestedMax: 100,
            suggestedMin: 0,
            stepSize: 20,
            callback: function(value, index, values){
                return  value +  '点'
            }
            }
        }]
        },
    }
    });
          
    });

});
