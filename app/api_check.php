<?php

header('Access-Control-Allow-Origin: *');
header("Content-type: application/javascript; charset=utf-8");



// print_r($_GET);
require_once __DIR__ . "/define.php";
// ●$_GETの中
// id : ユーザーid
$id=$_GET["id"];
// morning: 朝ごはん  0=>食べてない 1=>食べた
$morning=$_GET["morning"];
// lunch: 昼ごはん　0=>食べてない 1=>食べた
$lunch=$_GET["lunch"];
// dinner: 夜ご飯　0=>食べてない 1=>食べた
$dinner=$_GET["dinner"];
// vege: 野菜　null=>食べてない 0=>朝食べた 1=>昼食べた 2=>夜食べた
$vege=$_GET["vege"];
// fish: 魚　null=>食べてない　　例：朝と昼食べた=>[0,1]
$fish=$_GET["fish"];
// fru: フルーツ　null=>食べてない
$fru=$_GET["fru"];
// smoke: タバコ本数
$smoke=$_GET["smoke"];
// point: チェックの点数
$point=$_GET["point"];
// timing: チェックした日時 Y/M/Date/Day  Day=> 1が月曜日 7が日曜日
$timing=$_GET["timing"];
// sleep: 睡眠時間
$sleep=$_GET["sleep"];
if($sleep>=8){
    $CO2=6.4;   //1.6*4
    $energie=13.16;   //3.29*4;
    $electric=285.6; //71.4*4
}
else{
    $CO2=6.4+(8-$sleep)*1.6;
    $energie=13.16+(8-$sleep)*3.29;
    $electric=285.6+(8-$sleep)*71.4;
}
$money = $_GET["money"];
$sick = $_GET["sleep"];
if ($instance = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME)) {
    $instance->set_charset("utf8");
    $sql = "SELECT * FROM hack_u_check WHERE user_id={$id}";
    
    if (!$r = $instance->query($sql)) {
        print "あ";
        print $sql;
        exit;
    }
    // 0の場合 初めて診断
    if (!$r->num_rows) {
        $sql = "INSERT INTO hack_u_check(
            user_id,
            point,
            diagnosis,
            timing,
            fish,
            vege,
            fru,
            smoke,
            sleep,
            CO2,
            energie,
            sick,
            money,
            electric,
            created_at
        )VALUES(
            {$id},
            {$point},
            0,
            '{$timing}',
            '{$fish}',
            '{$vege}',
            '{$fru}',
            {$smoke},
            {$sleep},
            {$CO2},
            {$energie},
            {$sick},
            {$money},
            {$electric},
            now()
        )";
    }
    else{
        // 0じゃない場合
        $sql = "INSERT INTO hack_u_check(
            user_id,
            point,
            diagnosis,
            timing,
            fish,
            vege,
            fru,
            smoke,
            sleep,
            CO2,
            energie,
            sick,
            money,
            electric,
            created_at
        )VALUES(
            {$id},
            {$point},
            1,
            '{$timing}',
            '{$fish}',
            '{$vege}',
            '{$fru}',
            {$smoke},
            {$sleep},
            {$CO2},
            {$energie},
            {$sick},
            {$money},
            {$electric},
            now()
        )";
    }
    
    if (!$r = $instance->query($sql)) {
        print "い";
        print $r;
      print $sql;
    }
    // 情報出す
    // ●欲しいデータ
    // 最初の診断の結果を出す
    $sql = "SELECT * FROM hack_u_check WHERE user_id={$id} AND diagnosis=0";
    if ($result = $instance->query($sql)) {
        if ($result = $instance->query($sql)) {
            $firstrows = $result->fetch_assoc();
        }
    }
    // 毎日診断のデータ
    $sql = "SELECT * FROM hack_u_check WHERE user_id={$id} AND diagnosis=1 ORDER BY created_at DESC";
    if ($result = $instance->query($sql)) {
        $rows =[];
        while ($row = $result->fetch_assoc()) {
            $rows[] = $row;
        }
    }
    // week : １週間の生活チェックの点数 月曜〜日曜 [月,火,水,木,金,土,日] チェックしたのが月曜日の場合、[月]だけ。
    $points = array_column($rows, 'point');
    $n=count($rows);
    if($n>=7){
        $week=array_slice($points ,0,7);
    }
    else{
        $week=array_slice($points ,0,$n);
    }

    // result : 最新のチェックの点数
    if(!$rows){
        $result=$firstrows["point"];
    }
    else{
        $result=$rows[0]["point"]; 
    }
    // timing : 最新のチェックの日付 "Y/M/D"
    if(!$rows){
        $timing=$firstrows["timing"];
    }
    else{
        $timing=$rows[0]["timing"]; 
    }
    // electric : 電気使用率 最初と最新 [最初,最新] 例：[20,50]
    if(!$rows){
        $electric=[];
        $electric[]=$firstrows["electric"];
        $electric[]=null;
    }
    else{
        $electric=[];
        $electric[]=$firstrows["electric"];
        $electric[]=$rows[0]["electric"];
    }
    // print_r($electric);
    
    // smoke : タバコの本数 最初と最新 [最初,最新]
    if(!$rows){
        $smoke=[];
        $smoke[]=$firstrows["smoke"];
        $smoke[]=null;
    }
    else{
        $smoke=[];
        $smoke[]=$firstrows["smoke"];
        $smoke[]=$rows[0]["smoke"];
    }
    // print_r($smoke);

    // vege : 最新のチェック結果の野菜食べたタイミング [ null or 数字]
    if(!$rows){
        $vege=$firstrows["vege"];
    }
    else{
        $vege=$rows[0]["vege"]; 
    }

    // fish : 最新のチェック結果の魚食べたタイミング [ null or 数字 ]
    if(!$rows){
        $fish=$firstrows["fish"];
    }
    else{
        $fish=$rows[0]["fish"]; 
    }
    // fruit : 最新のチェック結果の魚食べたタイミング [ null or 数字 ]
    if(!$rows){
        $fru=$firstrows["fru"];
    }
    else{
        $fru=$rows[0]["fru"]; 
    }

    // ( 食べてない => null  0 => 朝食べた 　1 => 昼食べた 　2 => 夜食べた )

    // CO2 : CO2削減 点数と+-　 例：[ 3 , "+" ]  
    if($firstrows["CO2"]){
        $CO2first=$firstrows["CO2"]; //最初診断の結果
    }
    else{
        $CO2first=null;
    }
    if($rows[0]["CO2"]){
        $CO2=$rows[0]["CO2"]; //最新
    }
    else{
        $CO2=null;
    }
    // energie : エネルギー節約 点数と+-
    if($firstrows["energie"]){
        $energiefirst=$firstrows["energie"]; //最初診断の結果
    }
    else{
        $energiefirst=null;
    }
    if($rows[0]["energie"]){
        $energie=$rows[0]["energie"]; //最新
    }
    else{
        $energie=null;
    }
    // sick : 病気予防 点数と+-
    if ($firstrows["sick"]) {
        $sickfirst = $firstrows["sick"]; //最初診断の結果
    } else {
        $sickfirst = null;
    }
    if ($rows[0]["sick"]) {
        $sick = $rows[0]["sick"];
    }
    // money : 節約 点数と+-
    if($firstrows["money"]){
        $moneyfirst=$firstrows["money"]; //最初診断の結果
    }
    else{
        $moneyfirst=null;
    }
    if($rows[0]["money"]){
        $money=$rows[0]["money"];
    // ( 最初と比べて上がった => "+"  下がった => "-"  変化無し => "" )
    }
    $instance->close();
}
else{
    // print "データベースの接続に失敗しました";
    header("Location:index.html");
    exit;
  }


    print $_GET['callback'] . '(' . json_encode(
        array(
            'week' => $week,
            'result' => $result,
            'timing' => $timing,
            'electric' => $electric,
            'smoke' => $smoke,
            'vege' => $vege,
            'fish' => $fish,
            'fru' => $fru,
            'co2first' => $CO2first,
            'co2' => $CO2,
            'energiefirst' => $energiefirst,
            'energie' => $energie,
            'moneyfirst' => $moneyfirst,
            'money' => $money,
            'sickfirst' => $sickfirst,
            'sick' => $sick
        )
    ) . ');';


