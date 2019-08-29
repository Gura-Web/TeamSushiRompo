<?php

header('Access-Control-Allow-Origin: *');
header("Content-type: application/javascript; charset=utf-8");

  // mail => メールアドレス,
  // pass => パスワード
  require_once __DIR__ . "/define.php";
  $mail=$_GET["mail"];
  $password=$_GET["pass"];
  $errorFlg = true;
  $hashSalt = hash(HASH_ALG, HASH_SALT);
  $hashPassword = hash(HASH_ALG, $password . $hashSalt);
  if ($instance = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME)) {
    $instance->set_charset("utf8");
    $sql = "SELECT * FROM hack_u_user WHERE mail='{$mail}'";
    if (!$r = $instance->query($sql)) {
    print $sql;
			exit;
    }
    if ($r->num_rows) {
			if ($result = $instance->query($sql)) {
				// SQLの結果を取り出す
				$userAuth = $result->fetch_assoc();
      }
      // print_r($userAuth);
			// 入力したパスワードハッシュ化
			// $hashPassword = hash(HASH_ALG, $password . hash(HASH_ALG, HASH_SALT));
			// 入力したパスワードチェック
			if ($hashPassword === $userAuth["password"]) {
        // print "ログインできる";
      }
      else{
        $errorFlg = false;
      }
		}else {
			$errorFlg = false;
    }
    $id=$userAuth["id"];
    // print $id;
    // チェック情報出す
    // 最初の診断の結果を出す
    $sql = "SELECT * FROM hack_u_check WHERE user_id={$id} AND diagnosis=0";
    if ($result = $instance->query($sql)) {
        $firstrows = $result->fetch_assoc();
    }
    // 毎日のデータ
    $sql = "SELECT * FROM hack_u_check WHERE user_id={$id} AND diagnosis=1 ORDER BY created_at DESC";
    if ($result = $instance->query($sql)) {
        $rows =[];
        while ($row = $result->fetch_assoc()) {
            $rows[] = $row;
        }
    }
      $instance->close();
  }
  else{
    header("Location:index.html");
    exit;
  }
// ログインするPHP

// メールアドレスが存在しない or パスワードが一致しない場合、
// "false" を返す


  // ●欲しいデータ
  // id : ユーザーid
  // name : ユーザー名
  $name=$userAuth["user_name"];
  // gender : 性別 0=>男性 1=>女性 2=>その他
  $gender=$userAuth["sex"];
  // partner : パートナー 0=>男性 1=>女性 2=>豚
  $partner=$userAuth["kyara"];
  // week : １週間の生活チェックの点数 月曜〜日曜 [月,火,水,木,金,土,日]
  $week=[10,20,30];  

  // result : 最新のチェックの点数
  $result=$rows[0]["point"];
  // timing : 最新のチェックの日付 "Y/M/D"
  $timing=$rows[0]["timing"];
  // electric : 電気使用率 最初と最新 [最初,最新] 例：[20,50]
  if(!$rows){
    $electric=[];
    $electric[]=$firstrows["electric"];
    $electric[]="0";
    }
    else{
        $electric=[];
        $electric[]=$firstrows["electric"];
        $electric[]=$rows[0]["electric"];
    }
  // smoke : タバコの本数 最初と最新 [最初,最新]
  if(!$rows){
    $smoke=[];
    $smoke[]=$firstrows["smoke"];
    $smoke[]="null";
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
    $fish=$rows["fish"]; 
  }
  // fruit : 最新のチェック結果の魚食べたタイミング [ null or 数字 ]]
  if(!$rows){
    $fru=$firstrows["fru"];
  }
  else{
    $fru=$rows["fru"]; 
  }
  // ( 食べてない => null  0 => 朝食べた 　1 => 昼食べた 　2 => 夜食べた )

  // co2 : CO2削減 点数と+-　 例：[ 3 , "+" ]  
  // energie : エネルギー節約 点数と+-
  // sick : 病気予防 点数と+-
  // money : 節約 点数と+-
  // ( 最初と比べて上がった => "+"  下がった => "-"  変化無し => "" )
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
  if ($firstrows["sick"]) {
    $sickfirst = $firstrows["sick"]; //最初診断の結果
  } else {
    $sickfirst = null;
  }
  if ($rows[0]["sick"]) {
    $sick = $rows[0]["sick"]; //最新
  } else {
    $sick = null;
  }
  if ($firstrows["money"]) {
    $moneyfirst = $firstrows["money"]; //最初診断の結果
  } else {
    $moneyfirst = null;
  }
  if ($rows[0]["money"]) {
    $money = $rows[0]["money"]; //最新
  } else {
    $money = null;
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


print $_GET['callback'] . '(' . json_encode(
  array(
    'name' => $name,
    'gender' => $gender,
    'partner' => $partner,
    'week' => $week,
    'result' => $result,
    'timing' => $timing,
    'electric' => $electric,
    'smoke' => $smoke,
    'vege' => $vege,
    'fish' => $fish,
    'fru' => $fru,
    'cosfirst' => $CO2first,
    'co2' => $CO2,
    'energiefirst' => $energiefirst,
    'energie' => $energie,
    'moneyfirst' => $moneyfirst,
    'money' => $money,
    'sickfirst' => $sickfirst,
    'sick' => $sick
  )) . ');';


// ●欲しいデータ
// id : ユーザーid
// name : ユーザー名
// gender : 性別 0=>男性 1=>女性 2=>その他
// partner : パートナー 0=>男性 1=>女性 2=>豚
// week : １週間の生活チェックの点数 月曜〜日曜 [月,火,水,木,金,土,日]
// result : 最新のチェックの点数
// timing : 最新のチェックの日付 "Y/M/D"
// electric : 電気使用率 最初と最新 [最初,最新] 例：[20,50]
// smoke : タバコの本数 最初と最新 [最初,最新]

// vege : 最新のチェック結果の野菜食べたタイミング [ null or 数字]
// fish : 最新のチェック結果の魚食べたタイミング [ null or 数字 ]
// fruit : 最新のチェック結果の魚食べたタイミング [ null or 数字 ]
// ( 食べてない => null  0 => 朝食べた 　1 => 昼食べた 　2 => 夜食べた )

// co2 : CO2削減 点数と+-　 例：[ 3 , "+" ]  
// energie : エネルギー節約 点数と+-
// sick : 病気予防 点数と+-
// money : 節約 点数と+-
// ( 最初と比べて上がった => "+"  下がった => "-"  変化無し => "" )

// ●欲しいデータの例
// [{
//   id:1,
//   name:"あいうえお",
//   gender:0,
//   partner:0,
//   week:[0,0,0,0],
//   result:0,
//   timing: "2019/2/2",
//   electric: [0,0],
//   smoke: [0,0],
//   vege: [0,1,2],
//   fish: ["null"],
//   fruit: [0,1,2],
//   co2: [3,"+"]
//   energie: [3,"-"]
//   sick: [3,""]
//   money: [3,"+"]
// }]
