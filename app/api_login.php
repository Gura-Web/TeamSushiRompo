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
			$hashPassword = hash(HASH_ALG, $password . hash(HASH_ALG, HASH_SALT));
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


// print json_encode(["mail","text"]);
print $_GET['callback'] . '(' . json_encode($_GET) . ');';