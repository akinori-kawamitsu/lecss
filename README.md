# LECSS ver 1.0.1
LECSS is "legacy css" grid system.
Support:
 IE8, 9, 10, 11, edge, chrome, safari, firefox
Using propaty:
 flexbox
 calc

ie8まで“一応”対応したCSSグリッドシステム

「最新仕様だけど、WindowsXPのIE8でも見れるようにしてね♪」という愚かで反社会的なクライアントの要望を聞かざるを得ない状況に陥った時に、ちょっとだけあなたの労力を削減してくれるでしょう。LECSSとは、Legacy CSSという意味なのです。

##grid system
基本構造  

    <div class="float">
	  <div class="col-{target}-{size}"></div>
	  <div class="col-{target}-{size}"></div>
	</div>

具体的には

    <div class="float">
	  <div class="col-sp-12 col-tab-6 col-pc-4"></div>
	  <div class="col-sp-12 col-tab-6 col-pc-4"></div>
	  <div class="col-sp-12 col-pc-4"></div>
	</div>

のようになります。
div class="float"は、Bootstrapにおけるrowと同じ役割です。  


{target} (グリッドの分割を行う最小サイズを指定します。)
考え方は Bootstrap の xs, sm, md と同じです。  
  sp (smartphone:~480px)  
  tab (tablet:~768px)  
  pc (pc size display:769px~)  
  
※ブレイクポイントの値は"src/scss/_parameter.scss" の　breakpoint settings で変更できます。  

LECSSの場合、{target} を指定しないパターンも作ることができます。  
その場合、{size} で指定した分割単位が適用されるのは pc サイズのみで、tab サイズでは50%ずつの2分割、sp サイズでは100% の幅になります。
例：

    <div class="float">
	  <div class="col-4"></div>
	  <div class="col-4"></div>
	  <div class="col-4"></div>
	</div>


{size}  (グリッドの分割単位を示します。)  
 1~12, 1by5~4by5, 1by7~6by7,  
 1r~12r, 1by5~4by5r, 1by7~6by7r,  
 1nm~12nm, 1by5nm~4by5nm,  1by7nm~6by7nm,  
 1nmr~12nmr, 1by5nmr~4by5nmr, 1by7nmr~6by7nmr,  
 
 1~12は12分割で占める割合です。  
 1by5~4by5は5分の1から5分の4、  
 1by7~6by7は7分の1から7分の6 を表しています。  
 
 数字で終わるものは左詰めで margin と padding が設定されています。  
 rで終わるものは右詰めで margin と padding が設定されています。  
 nmで終わるものは左詰めで、横方向の margin は0になっています。Bootstrap の分割ユニットと同じように使えます。親要素には -nm を付けてください。  
 nmrで終わるものは右詰で、横方向の margin は0になっています。nmで終わるものと混在させることができ、Foundationの右端の分割ユニットと同様の使い方ができます。  


親要素に指定するクラス名（rowにあたる役割）には以下の種類があります。  

float: 内部要素のmarginの分、コンテナの幅を広げたもの。構造はBootstrapのrowと同じです。  
float-nm: 内部要素がnm, nmrで終わる要素を使う場合に使います。コンテナの幅はfloat-nmの親要素と同じになります。  
flex: flexboxレイアウトで、左詰めになります。たとえ子要素に r がついていても左から順に並びます。  
flex-r: flexboxレイアウトで、右詰めになります。子要素の末尾に r で無くても右から順に並びます。  
flex-nm: flexboxレイアウトで、左詰め、コンテナの幅はflex-nmの親要素と同じ(width: 100%;)になります。子要素にnmを使う場合はこれを使います。  
flex-nmr: flexboxレイアウトで、右詰め、コンテナの幅はflex-nmの親要素と同じ(width: 100%;)になります。  
flex-{target}-eq: 子要素を均等分割する場合に使います。  


floatの代わりに"flex"を使うと、flexboxレイアウトになり、子要素はrの有無にかかわらず全て左詰めになります。  
flexboxレイアウトで右詰めにする場合は"flex-r"を使います。  
一方、IE9以下では"flex"を使ってもfloatレイアウトになります。jQuery.matchHeight.jsを使って高さを合わせて、flexレイアウトと同様の表示を実現しています。  
floatレイアウトの左右詰めは子要素のrの有無で決まります。"flex"を使う場合は、子要素の末尾はすべて"r"無しで、"flex-r"を用いる場合、子要素の末尾にはすべて"r"をつけてください。  

flex-{target}-eq は、均等分割です。要素間にスペースはありません。  

グリッド間のmarginとpaddingは固定値で指定できます。  
また、sp, tab, pcのそれぞれで異なるマージンを指定できます。この値は_parameter.scssで変更します。  

そのほかの変数も、_parameter.scssで管理します。  

##各ファイルの説明
###style.scss  
komitsuboshi-cssの主要ファイルをまとめています。  

###reset.scss
normalize.css v4.0.0　をベースに、独自に追加した記述があります。  

###_parameter.scss
グリッドのmarginやpaddingの値など、変数はこのファイルでまとめて管理しています。  
（componentに使われる変数は、それぞれのconponentファイル内で定義します）  

###base.scss
h1～h6, p, imgなど、基本的な要素について記述しています。  

###grid.scss
このフレームワークの中心になるグリッドシステムのファイルです。  

###ie8.scss, ie9.scss, ie10.scss
ie8,9,10用のファイルです。  
ie8はメディアクエリ非対応です。またcontainerの最小幅をspサイズの最大値（デフォルトでは480px）に制限しています。  
flexboxをカバーするため、IE9以下ではjquery.matchHeight.jsを読み込んでいます。  
ie10以下では、flexboxの等幅分割をdisplay:table;,display:table-cell;で代用しています。  

###jquery.matchHeight.js
ie8,9でflexboxと同等の表示にするためのプラグインです。  
 jquery-match-height master by @liabru  
 http://brm.io/jquery-match-height/  
WordPressでも動作するようにカプセル化しました。(ver 0.2beta)  

###kicss.js
画像キャプション機能を提供するjQueryを入れています。(ver 0.2beta)  

csscomb.json
WordPressのコードディング基準に合わせるためのcsscombファイル。  
<https://github.com/cedaro/grunt-wp-css/blob/develop/tasks/config/default.json>  
bradyvercher氏作。  


##使い方
次のコードを head 内に記述します。

	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" type="text/css" href="style.css" />
	<script src="https://code.jquery.com/jquery-1.12.0.min.js"></script>
	<script src="./js/lecss.js" type="text/javascript"></script>
	<script>
	var ua = window.navigator.userAgent.toLowerCase();
	if (ua.indexOf("msie 11") != -1){
	document.write('<link rel="stylesheet" type="text/css" href="ie11.css" />');
	}
	else if (ua.indexOf("msie 10") != -1){
	document.write('<link rel="stylesheet" type="text/css" href="ie10.css" />');
	}
	else if (ua.indexOf("linux; u;") >0){
	document.write('<link rel="stylesheet" type="text/css" href="ie10.css" />');
	}
	</script>
	<!--[if lte IE 9]>
	<script src="./js/jquery.matchHeight.js" type="text/javascript"></script>
	<script type="text/javascript">
	jQuery(function() {
		jQuery("[class^='flex'] [class^='col-']").matchHeight();
	});
	</script>
	<link rel="stylesheet" type="text/css" href="ie9.css" />
	<![endif]-->
	<!--[if lt IE 9]>
	<script src="./js/html5shiv.js" type="text/javascript"></script>
	<link rel="stylesheet" type="text/css" href="ie8.css" />
	<![endif]--> 

##独自のクラスと役割一覧

###wrapper
body直下に配置し、ページ内のコンテンツ全てをラップさせてください。  
android の一部でコンテンツ右側に大きな余白が生じるのを防止します。  

###container
Bootstrap の container と同じです。コンテンツを幅に上限を与え、ページ中央に配置にします。  
container のmax-width の値は、_parameter.scss の $container で設定します。

###clear
floatをclearします。  

###clearfix
付与したタグにclearfixを設定します。  

###list-style-none
list-style を消去し、リストのインデントを無くします。  

###table-fix
等幅分割の table を作ります。(table-layout: fixed;)  

###aligncenter, alignright, alignleft
WordPress用の中央配置、右寄せ、左寄せの設定です。  
imgタグのみに使ってください。  
imgにalignright, alignleft を適用すると、画像の最大幅は50%になります。（回り込みを維持します）  
ただし、スマートフォンサイズ（$spで設定した画面サイズ以下）では回り込みが解除され、最大幅は100%になります。  
スマートフォンサイズでも回り込みを維持させる場合は、br-no を併用します。  

    基本的な使い方
	<img class="alignleft">
	br-noとの併用
	<img class="alignleft br-no">
	
###sp-center
スマートフォンサイズで画像を中央に配置したいときに、alignleft や alignright と併用します。  
単独で使用することもできます。  

###br-tab
imgタグの、alignleft, alignrightと併用します。  
tabサイズ未満で回り込みを解消し、最大幅を100%にします。  

###tab-center
imgタグの、alignleft, alignrightと併用します。  
tabサイズ未満で回り込みを解消し、中央に配置して、最大幅を100%にします。  

###br
ブロック要素のあとに改行を挿入します。  

###text-left, text-right, text-center, text-justify  
それぞれ、text-align プロパティの値を left, right, center, justify に設定します。  

###caption, caption-img, caption-text
画像にキャプションを付けます。  
使い方 
+ jQuery と lecss.js を読み込ませます。  
+ キャプションを付ける img をdivで囲み、 "caption-img" を付けます。また、キャプションのテキストに "caption-text" を付け、両者を "caption" を付けたブロックレベル要素でラップします。  

    <div class="caption">
    	<div  class="caption-img">
    	  <img alt="" src="" style="margin-right:5px;" /><img alt="" src="250x40.png" />
    	</div>
    	<p class="caption-text"></p>
    </div>
	
"caption" 内の画像の幅を自動的に計算して "caption-text" の幅にします。  
複数個のimgを使う場合は、スペースや改行を入れずに並べ、img の間に設ける隙間はcssで指定してください。改行などを使うと、iOSでは正しく計算できません。  

###table, table-cell
それぞれ、display: table; と display: table-cell を与えます。  

###middle-container, middle-item
ブロックレベル要素内で中心に揃えるためのclassです。  
middle-container に display: table; を、 middle-item に display: table-cell; とtext-align: center, vertical-align: middle; を付けています。  

###pc, tab, sp, pc-none, tab-none
ディスプレイサイズがpc, tab, sp　のときの表示の有無を制御します。  
pc: pcサイズのときのみ表示  
tab: tabサイズのときのみ表示  
sp： spサイズのときのみ表示  
例えば、pcとspのときに表示したい場合は、両方のクラスを付与します。  

pc-none: pcサイズのときには必ず消去する  
tab-none: tabサイズのときには必ず消去する  

pc-none と tab-none は　display: none !important; が付与されているので、気を付けて使ってください。  

###mt-{num}, mb-{num}
{num}には数字が入ります。  
mt-{num}: margin-top を px単位で指定します。20px までは 5px 刻み、20px から 60px までは10px刻みで設定します。  
mb-{num}: margin-bottom px単位で指定します。20px までは 5px 刻み、20px から 60px までは10px刻みで設定します。  

###youtube, gmap
このクラスを付与したブロックレベル要素の直下に youtube や Google Map の埋め込みコードを入れることで、埋め込みの動画や Google Map をレスポンシブデザインに対応させることができます。  

##変更履歴
※バージョンは semantic versioning <http://semver.org/lang/ja/> に基づいて付けています。  
ver 1.0.0　公開  
1.0.1　clearfixのバグ修正
2.0.0 フォントの設定を変更。