// マイページに表示する関数

(function ($) {
  $.fn.charaMypage = function () {
    function getStorage(key) {
      return localStorage.getItem(key);
    }

    console.log("パートナー" + getStorage("dataPartner"))

    // ホーム　キャラ画像、コメント
    let userName = getStorage("dataName");
    let charaName = $(".box-chara__info p:first-child");
    let charaStatus = $(".box-chara__info p:last-child span");
    let charaImage = $(".box-chara__img img");
    let charaMessage = $(".box-chara__mes");

    if (getStorage("dataPartner") == 0) {
      // 生活リズムくんを選んだ場合
      charaName.text("生活リズムくん")
      if (!getStorage("dataNoFirst")) {
        // 初日の場合
        charaImage.attr("src", "img/chara01-body01.svg");
        charaStatus.text("普通");
        charaMessage.html(userName + "さん！はじめまして！<br>生活チェックは18:00から可能です！")
      }
      else if (getStorage("dataHomeCheck2") == true) {
        charaImage.attr("src", "img/chara01-body03.svg"); // 体調悪い画像
        charaStatus.text("悪い");
        charaMessage.html(userName + "さん、僕はとてもしんどいよ。<br>今日は生活チェックしてほしいです。")
      }
      else if (getStorage("dataHomeCheck1") == true) {
        charaImage.attr("src", "img/chara01-body04.svg"); // 怒ってる画像
        charaStatus.text("普通");
        charaMessage.html(userName + "さん！昨日生活チェックしてませんよ！<br>今日はしてくださいね！")
      }
      else if (getStorage("dataHomeNig") == true) {
        charaImage.attr("src", "img/chara01-body04.svg"); // 怒ってる画像
        charaStatus.text("普通");
        charaMessage.html(userName + "さん！昨日、日付が変わる前に寝ましたか？<br>しっかりおやすみボタンを押してから寝てくださいね。")
      }
      else {
        if (getStorage("dataPoint") >= 0 && 40 >= getStorage("dataPoint")) {
          charaImage.attr("src", "img/chara01-body03.svg"); // 体調悪い画像
          charaStatus.text("悪い")
          charaMessage.html(userName + "さん、少ししんどいな。<br>生活リズム頑張って直しましょうね！")
        }
        else if (getStorage("dataPoint") >= 41 && 79 >= getStorage("dataPoint")) {
          charaImage.attr("src", "img/chara01-body01.svg"); // 普通の画像
          charaStatus.text("普通")
          charaMessage.html(userName + "さん！僕は元気です。<br>生活リズムをもっと良くしていきましょう！")
        }
        else {
          charaImage.attr("src", "img/chara01-body02.svg"); // 良いの画像
          charaStatus.text("良い")
          charaMessage.html(userName + "さん！僕はとっても元気です。<br>生活リズムをキープしましょう！")
        }
      }
    }
    else if (getStorage("dataPartner") == 1) {
      // 生活リズムちゃんを選んだ場合
      charaName.text("生活リズムちゃん")
      if (!getStorage("dataNoFirst")) {
        // 初日の場合
        charaImage.attr("src", "img/chara02-body01.svg");
        charaStatus.text("普通");
        charaMessage.html(userName + "さん！はじめまして！<br>生活チェックは18:00から可能です！")
      }
      else if (getStorage("dataHomeCheck2") == true) {
        charaImage.attr("src", "img/chara02-body03.svg"); // 体調悪い画像
        charaStatus.text("悪い");
        charaMessage.html(userName + "さん、私とてもしんどいよ。<br>今日は生活チェックしてほしいです。")
      }
      else if (getStorage("dataHomeCheck1") == true) {
        charaImage.attr("src", "img/chara02-body04.svg"); // 怒ってる画像
        charaStatus.text("普通");
        charaMessage.html(userName + "さん！昨日生活チェックしてませんよ！<br>今日はしてくださいね！")
      }
      else if (getStorage("dataHomeNig") == true) {
        charaImage.attr("src", "img/chara02-body04.svg"); // 怒ってる画像
        charaStatus.text("普通");
        charaMessage.html(userName + "さん！昨日、日付が変わる前に寝ましたか？<br>しっかりおやすみボタンを押してから寝てくださいね。")
      }
      else {
        if (getStorage("dataPoint") >= 0 && 40 >= getStorage("dataPoint")) {
          charaImage.attr("src", "img/chara02-body03.svg"); // 体調悪い画像
          charaStatus.text("悪い")
          charaMessage.html(userName + "さん、少ししんどいな。<br>生活リズム頑張って直しましょうね！")
        }
        else if (getStorage("dataPoint") >= 41 && 79 >= getStorage("dataPoint")) {
          charaImage.attr("src", "img/chara02-body01.svg"); // 普通の画像
          charaStatus.text("普通")
          charaMessage.html(userName + "さん！私は元気です。<br>生活リズムをもっと良くしていきましょう！")
        }
        else {
          charaImage.attr("src", "img/chara02-body02.svg"); // 良いの画像
          charaStatus.text("良い")
          charaMessage.html(userName + "さん！私はとっても元気です。<br>生活リズムをキープしましょう！")
        }
      }
    }
    else {
      // 生活りずむんを選んだ場合
      charaName.text("生活りずむん")
      if (!getStorage("dataNoFirst")) {
        // 初日の場合
        charaImage.attr("src", "img/chara03-face01.svg");
        charaStatus.text("普通");
        charaMessage.html(userName + "さん！はじめまして！<br>生活チェックは18:00から可能だブ！")
      }
      else if (getStorage("dataHomeCheck2") == true) {
        charaImage.attr("src", "img/chara03-face03.svg"); // 体調悪い画像
        charaStatus.text("悪い");
        charaMessage.html(userName + "さん、僕とてもしんどいブ〜。<br>今日は生活チェックしてほしいブ〜。")
      }
      else if (getStorage("dataHomeCheck1") == true) {
        charaImage.attr("src", "img/chara03-face04.svg"); // 怒ってる画像
        charaStatus.text("普通");
        charaMessage.html(userName + "さん！昨日生活チェックしてないブ〜！<br>今日はしてブ〜！")
      }
      else if (getStorage("dataHomeNig") == true) {
        charaImage.attr("src", "img/chara03-face04.svg"); // 怒ってる画像
        charaStatus.text("普通");
        charaMessage.html(userName + "さん！昨日、日付が変わる前に寝たブ？<br>しっかりおやすみボタンを押してから寝てブ〜。")
      }
      else {
        if (getStorage("dataPoint") >= 0 && 40 >= getStorage("dataPoint")) {
          charaImage.attr("src", "img/chara03-face03.svg"); // 体調悪い画像
          charaStatus.text("悪い")
          charaMessage.html(userName + "さん、僕少ししんどいブ〜。<br>生活リズム頑張って直そうブ〜！")
        }
        else if (getStorage("dataPoint") >= 41 && 79 >= getStorage("dataPoint")) {
          charaImage.attr("src", "img/chara03-face01.svg"); // 普通の画像
          charaStatus.text("普通")
          charaMessage.html(userName + "さん！僕、元気ブ〜！<br>生活リズムをもっと良くしていこうブ〜！")
        }
        else {
          charaImage.attr("src", "img/chara03-face02.svg"); // 良いの画像
          charaStatus.text("良い")
          charaMessage.html(userName + "さん！僕はとっても元気ブ〜！<br>この生活リズムをキープするブ〜！")
        }
      }
    }

    // *****************************
    //  モーダルのキャラ分岐
    // *****************************
    let charaImg = $(".modal__chara img");
    let selectChara = getStorage("dataPartner");
    console.log(selectChara);
    if (selectChara == 0) {
      charaImg.attr("src", "img/chara01.svg");
    }
    else if (selectChara == 1) {
      charaImg.attr("src", "img/chara02.svg")
    }
    else {
      charaImg.attr("src", "img/chara03.svg")
    }

    return true;
  }
}(jQuery));
