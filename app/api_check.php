<?php

// morning => 朝ごはん
// lunch => 昼ごはん
// dinner => 夜ご飯
// vege => 野菜
// fish => 魚
// fru => フルーツ
// smoke => タバコ
// point => 生活チェックの点数


// morning,lunch,dinner
// 0 => 食べてない ,　1 => 食べた

// vege,fish,fru(複数ある場合もあるので配列)
// 食べてない => null , 0 => 朝食べた ,　1 => 昼食べた ,　2 => 夜食べた

// smoke:タバコ
// 0 => 吸ってない　数字 => 吸った数

// 生活チェックの内容を記録する
// 成功したら計算した社会貢献度のデータを返す


print json_encode($_GET);