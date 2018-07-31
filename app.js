var romanWord = localStorage.romanWord || 'sushiarashi';
var types = [];
var gameEndFlg = 0;
var timer = null;
var startTime = 0;
var timeLeft = 0;
var timeToCountDown = 10 * 1000; // ミリ秒
var cntNgTypes = 0;
var cntOkTypes = 0;
var cntOkWords = 0; 
var words = {
	'東横インにチェックイン':'touyokoinnityekkuinn',
	'旭川市から来た札幌太郎':'asahikawashikarakitasapporotaro',
	'明日は晴れのち雪':'ashitahaharenochiyuki',
	'今日のところは勘弁':'kyounotokorohakanbenn',
	'ラズベリーπ':'razuberi-pai'
};

/*
function loadCSV(targetFile) {
 
    // 読み込んだデータを1行ずつ格納する配列
    var allData = [];
 
    // XMLHttpRequestの用意
    var request = new XMLHttpRequest();
    request.open("get", targetFile, false);
    request.send(null);
 
    // 読み込んだCSVデータ
    var csvData = request.responseText;
 
    // CSVの全行を取得
    var lines = csvData.split("\n");
 
    for (var i = 0; i < lines.length; i++) {
        // 1行ごとの処理
 
        var wordSet = lines[i].split(",");
 
        var wordData = {
            wordSet[0] : wordSet[1]
        };
 
        allData.push(wordData);
    }
 	
    console.log(allData);
    return allData;
}
 
words = loadCSV("sample.csv");
*/

console.log(words)
function selectWord(obj) {
	/*連想配列からランダムに1つ取りだす*/
	var ary = Object.keys(obj);
	var randomKey = ary[Math.floor(Math.random() * ary.length)];
	return [randomKey, obj[randomKey]];

}

function init_word() {
	document.querySelector('.containerRoman').innerHTML = '';
	var [jpWord, romanWord] = selectWord(words);	
	types = romanWord.split('').map(function(str) {
		var type = document.createElement('span');
		type.className = 'type';
		type.textContent = str;
		document.querySelector('.containerRoman').appendChild(type);
		document.querySelector('.containerJp').textContent = jpWord;
		return type;

	});
}

function init() {
	cntNgTypes = 0;
	cntOkTypes = 0;
	cntOkWords = 0; 
	gameEndFlg = 0;
	init_word();
	timerEnd();
	document.querySelector('.timer').textContent = (timeToCountDown/1000).toFixed(1);
	document.querySelector('.message').textContent = '入力を開始したらスタートです！';
	document.querySelector('.result').textContent = '';
}
init();

function finishGame() {
	document.querySelector('.timer').textContent = 0.0; //-0.0と表示されないようにする
	document.querySelector('.message').textContent = "終了です！もう一度始めるにはESCキーを押してください。";
	document.querySelector('.result').textContent = `入力文字数は ${cntOkTypes}打, 入力単語数は ${cntOkWords}個, ミスタイプは ${cntNgTypes} です。`;
	timerEnd();
	gameEndFlg = 1;
};

function timerStart() {
	startTime = new Date().getTime();
	timer = setInterval( function() {
	document.querySelector('.timer').textContent = 0.0;
		var elapsedTime = Date.now() - startTime; //経過時間
		//残り時間 = 制限時間 - 経過時間
		timeLeft = (timeToCountDown - elapsedTime)/1000 ;//(new Date().getTime() - startTime) / 1000;
		document.querySelector('.timer').textContent = timeLeft.toFixed(1);
		if (timeLeft <= 0) {
			finishGame();
		}
	}, 100);
	

	document.querySelector('.message').textContent = '途中でやめるにはESCキーを押してください'
}

function timerEnd() {
	clearInterval(timer);
	timer = null;
}

document.addEventListener('keydown', function(event) {
	var keyCode = event.keyCode;

	if (gameEndFlg === 1) {
		if (keyCode === 27) {
			init();
			return
		} else {
			return
		}
	}

	var key = '';
	if (keyCode === 32) {
		key = ' '
	}

	if (keyCode === 189) {
		key = '-'
	}

	if (keyCode === 27) { //ESC押したら初期化
		init();
		return
	}


	if (keyCode >= 65 && keyCode <= 90) {
		key = String.fromCharCode(keyCode);
		if (event.shiftKey) {
			key = key.toUpperCase();
		} else {
			key = key.toLowerCase();
		}
	}

	if (key) {
		if (timer === null) {
			timerStart()
		}
		var next = types[0];
		if (next.textContent === key) {
			cntOkTypes += 1;
			next.classList.add('ok');
			types.shift();
			if (types.length === 0) {
				cntOkWords += 1;
				init_word();
			}
		} else {
			next.classList.add('ng');
			cntNgTypes += 1;
		}
	}
});

document.querySelector('.containerRoman').addEventListener('click', function(event){
	var text = prompt('問題文を入力してください');
	if (text) {
		romanWord = text;
		localStorage.romanWord = text;
		init();
	}
});