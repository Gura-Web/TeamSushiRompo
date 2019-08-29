<?php


//
// define.php
// 定数を定義するファイル

//kenkenlocal
define( "DB_HOST", "localhost" );
define( "DB_USER", "root" );
define( "DB_PASS", "699177" );
define( "DB_NAME", "yanyan" );

//kenkenclick
// define( "DB_HOST", "localhost" );
// define( "DB_USER", "yanyan" );
// define( "DB_PASS", "eccMyAdmin" );
// define( "DB_NAME", "yanyan" );

// miki local
// define("DB_HOST", "127.0.0.1");
// define("DB_USER", "root");
// define("DB_PASS", "yururinpanda");
// define("DB_NAME", "db_seikatsu");

// miki 仮サーバー
// define("DB_HOST", "mysql1019.db.sakura.ne.jp");
// define("DB_USER", "mmiki-web");
// define("DB_PASS", "yururinpanda0317");
// define("DB_NAME", "mmiki-web_seikatsu");


// click
// define( "DB_HOST", "localhost" );
// define( "DB_USER", "wot" );
// define( "DB_PASS", "phpMyAdmin" );
// define( "DB_NAME", "wot" );
// コメント切り替えで便利

//
// テーブル関係
//

// 認証テーブル
// define( "TBL_AUTH","php3_auth" );
// ユーザーテーブル
// define( "TBL_USER","php3_user" );

//
// パスワード関係
//

// ハッシュアルゴリズム
define( "HASH_ALG","sha256" );
// パスワードソルト
define( "HASH_SALT","PHP3" );

?>
