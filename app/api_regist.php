<?php

header('Access-Control-Allow-Origin: *');

  // name => 名前,
  // mail => メールアドレス,
  // pass => パスワード,
  // gender => 性別  0:男性 1:女性 2:その他,
  // birth => 生年月日  Y/M/D,
  // partner => パートナー  0:男 1:女 2:豚  


  // 登録するだけのPHP
  require_once __DIR__ . "/define.php";
  $name = $_GET["name"];
  // print $name;
  $mail=$_GET["mail"];
  $password=$_GET["pass"];
  $sex=$_GET["gender"];
  $birth=$_GET["birth"];
  $partner=$_GET["partner"];
  $hashSalt = hash(HASH_ALG, HASH_SALT);
  $hashPassword = hash(HASH_ALG, $password . $hashSalt);
  if ($instance = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME)) {
    $instance->set_charset("utf8");
    $sql = "SELECT * FROM hack_u_user WHERE mail='{$mail}'";
    if (!$r = $instance->query($sql)) {
      print $sql;
      exit;
    }
    if (!$r->num_rows) {
      $sql = "INSERT INTO hack_u_user(
        user_name,
        password, 
        mail, 
        sex,
        bir,
        partner,
        created_at
    )VALUES(
        '{$name}',
        '{$hashPassword}',
        '{$mail}',
        {$sex},
        '{$birth}',
        {$partner},
        now()
    )";
    }
    if (!$instance->query($sql)) {
      print $sql;
    }
    $instance->close();
  }
  else {
    // print "データベースの接続に失敗しました";
    header("Location:index.html");
    exit;
  }


  // 登録完了できたら "true" を返す
  print json_encode("true");