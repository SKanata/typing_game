var romanWord = localStorage.romanWord || 'sushiarashi';
var types = [];
var gameEndFlg = 0;
var timer = null;
var startTime = 0;
var timeLeft = 0;
var timeToCountDown = 99999999 * 1000; // ミリ秒
var cntNgTypes = 0;
var cntOkTypes = 0;
var cntOkWords = 0; 
var words = {
	'東横インにチェックイン':'touyokoinnityekkuinn',
	'横浜県はどっちですか':'yokohamakenhadottidesuka',
	'明日は晴れのち雪':'ashitahaharenochiyuki',
	'今日のところは勘弁':'kyounotokorohakanbenn',
    'ラズベリーぱいをたべる':'razuberi-paiwotaberu',
    '本日より放送開始です':'honjitsuyorihousoukaishidesu',
    '続編発売が決定しました':'zokuhenhatsubaigaketteishimashita',
    'あの人はおしゃれですね':'anohitowaosharedesune',
    '会うは別れの始め':'auwawakarenohajime',
    '危ない橋を渡る':'abunaihashiwowataru',
    'こまめな水分補給を':'komamenasuibunhokyuuwo',
    'ラーメンを摂取する':'ra-menwosessyusuru',
    'タイピングだけは早い':'taipingudakehahayai',
    '青春は汗とともに':'seisyunhaasetotomoni',
    'お昼ご飯はツナマヨおにぎり':'ohirugohanhatsunamayoonigiri',
    'メイカーフェアに参加中':'meika-feanisankachuu',
    '現在満席です':'genzaimansekidesu',
    '今シーズンで引退':'konsi-zundeintai',
    '夏休みに海外旅行':'natsuyasuminikaigairyokou',
    '恵比寿駅でおしゃれランチ':'ebisuqekideosyareranchi',
    '心の声に従う':'kokoronokoenishitagau',
    'みんな同じ顔に見える':'minnaonajikaonimieru',
    'じじじじじいいいいいいいいいいいいいいいいいいいじいいいい':'jijijijijiiiiiiiiiiiiiiiiiiiijiiiii',
    'オオクワガタへの憧れ':'ookuwagatahenoakogare',
    'もっとやれると思ってた':'mottoyarerutoomotteta',
    'ビアガーデンで一杯':'biaga-dendeippai',
    'オラオラオラオラ':'oraoraoraora',
    '無駄無駄無駄無駄':'mudamudamudamuda',
    '胡蝶蘭が無残な姿に':'kochourangamuzannasugatani',
    '新宿御苑でピクニック':'shinjukugyoendepikunikku',
    '電光掲示板でみました':'denkokeijibandemimashita',
    'お前のものは俺のもの':'omaenomonohaorenomono',
    '中古マンション購入しました':'chuukomanshonkounyuushimashita',
    '同点ソロホームラン':'doutensoroho-muran',
    'タイミングが合わなかった':'taimingugaawanakatta',
    '鈴木選手の満塁ホームラン':'suzukisenshunomanruihomuran',
    '書き下ろしイラスト付きです':'kakioroshiirasutotsukidesu',
    'あの人はおしゃれですね':'anohitowaosharedesune',
    '一週間は七営業日':'issyuukanhananaeigyiubi',
    '綺麗な夜景に社畜は不可欠':'kireinayakeinishachikuhahukaketsu',
    '三年目まではがまんしよう':'sannenmemadehagamanchiyou',
    'あといちにちだけがんばろう':'atoichinichidakeganbarou',
    '病欠は意識不足':'byouketsuhaishikibusoku',
    '利根川ぁぁぁっ':'tonegawaxaxaxaxxtsu',
    'ランチは十秒':'ranchihazyuubyou',
    '今日は終電で帰れる':'kyouhashuudendekaereru',
    '戦いはこれからだ':'tatakaihakorekarada',
    'オラオラオラオラ':'oraoraoraoratatakaihakorekarada',
    '効率化すすめて気づく俺が無駄':'kouritsukasusumetekidukuoregamuda',
    '今どきはシャープと言わずハッシュタグ':'imadokihasha-putoiwazuhasshutagu',
    '定額使い放題':'teigakutsukaihoudai',
    'お金以上に大切なもの':'okaneijounitaisetsunamono',
    '社外でも社員証を首にかけている':'shagaidemoshainshouwokubinikaketei',
    '首のところが少し変だね':'kubinotokorogasukoshihendane',
    '残念ながらそれはできません':'zannennagarasorehadekimasen',
    'そんなこと言わないでください':'sonnakotoiwanaidekudasai',
    '少なくとも最後に確認した時はいませんでした':'sukunakutomosaigonikakuninshitatokihaimasendeshita',
    '用意しておいたんですが家に忘れてきました':'youishiteoitandesugaieniwasuretekimashita',
    '知っていたらお教えしますよ':'shitteitaraooshieshimasuyo',
    '生麦生米生卵':'namamuginamagomenamatamago',
    'きゃりーぱみゅぱみゅ':'kyari-pamyupamyu',
    '除雪車除雪作業中':'josetsushajosetsusagyouchuu',
    'かえるぴょこぴょこみぴょこぴょこあわせてぴょこぴょこむぴょこぴょこ':'kaerupyokopyokomipyokopyokoawasetepyokopyokomupyokopyoko',
    '東京特許許可局局長今日急遽許可却下':'toukyoutokkyokyokakyokukyokuchoukyoukyuukyokyokakyakka',
    '坊主が屏風に上手に坊主の絵を描いた':'bouzugabyoubunijouzunibouzunoewokaita',
    '赤パジャマ黄パジャマ青パジャマ':'akapajamakipajamaaopajama',
    'となりの客はよく柿食う客だ':'tonarinokyakuhayokukakikuukyakuda',
    '空虚な九州空港の究極高級航空機':'kuukyonakyuushuukuukounokyuukyokukoukyuukoukuuki',
    '伝染病予防病院予防病室':'densenbyouyoboubyouinyoboubyoushitsu',
    '魔術師手術中集中術著述':'majutsushishujutsuchuushuuchuujutsuchojutsu',
    '骨粗鬆症訴訟勝訴':'kotsusoshoushousoshoushouso'
};

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
	if (keyCode === 188) { // カンマを押したら文字列のみ初期化
	    init_word();
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
/*
document.querySelector('.containerRoman').addEventListener('click', function(event){
	var textJp = prompt('日本語の問題文を入力してください');
	var textRoman = prompt('ローマ字の問題文を入力してください');
	if (textRoman && textJp) {
		words[textJp] = textRoman
		localStorage.originalWords = words;
		localStorage.originalWords = null;
		init();
	}
});
*/
