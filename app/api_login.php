<?php

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

  // 正しくログインできた場合は、
  // ・ユーザーid
  // ・名前
  // ・性別
  // ・年齢
  // ・パートナーの種類
  // ・１週間の生活チェックの点数(ない場合はnull)
  // ・今までの生活チェック結果(カレンダーに表示)(ない場合はnull)
  // ・前回の生活チェックの結果(点数,電気使用率,タバコ,野菜,魚,フルーツ)(ない場合はnull)
  // ・一番最初にやった診断の結果
  // ・社会貢献度グラフの情報(ない場合はnull)
  // の情報を返す



  print json_encode($_GET);