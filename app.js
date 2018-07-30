var romanWord = localStorage.romanWord || 'sushiarashi';

var types = [];
var timer = null;
var startTime = 0;
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

function init() {
	document.querySelector('.containerRoman').innerHTML = '';
	var [jpWord, romanWord] = selectWord(words);	
	types = romanWord.split('').map(function(str) {
		var type = document.createElement('span');
		type.className = 'type';
		type.textContent = str;
		document.querySelector('.containerRoman').appendChild(type);
		return type;

	});
	timerEnd();
	document.querySelector('.timer').textContent = '0.000';
	document.querySelector('.containerJp').textContent = jpWord;
}
init();

function timerStart() {
	startTime = new Date().getTime();
	timer = setInterval( function() {
		var time = (new Date().getTime() - startTime) / 1000;
		document.querySelector('.timer').textContent = time.toFixed(3);
	}, 10);
}

function timerEnd() {
	clearInterval(timer);
	timer = null;
}

document.addEventListener('keydown', function(event) {
	var keyCode = event.keyCode;

	if (keyCode === 13) {
		init();
		return
	}

	var key = '';
	if (keyCode === 32) {
		key = ' '
	}

	if (keyCode === 189) {
		key = '-'
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
			next.classList.add('ok');
			types.shift();
			if (types.length === 0) {
				timerEnd();
				init();
			}
		} else {
				next.classList.add('ng');
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