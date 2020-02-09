/**************************************************************
				【自动弹幕说书人V1.5（JS版）】
			【Storyteller Of Auto-Barrage_V1.5_JS】
项目Github：github.com/Ironieser/Storyteller_Of_Auto-Barrage	


										作者：Ironieser丶 
										斗鱼ID：祖冲之丶丶
									Email:ironieser@gmail.com
														2020/2/5
***************************************************************
***************************************************************
打开浏览器！F12打开开发者工具！在Console下，粘贴代码，敲回车运行！
打开浏览器！F12打开开发者工具！在Console下，粘贴代码，敲回车运行！
打开浏览器！F12打开开发者工具！在Console下，粘贴代码，敲回车运行！
***************************************************************
***************************************************************
***************************************************************
┌---------------------------------------------------------------┐
|						>>>>功能表<<<<							|
|																|
|	功能函数：													|
|		（1）start()：	开启独轮车（脚本加载后，默认自动开启）	|
|		（2）stop():	停止独轮车；							|
|		（3）get_new_story():读取新的小说						|
|		（4）restart():重启独轮车								|
|		（5）reset():重置所有数值参数							|
|		（6）init_story:重置小说								|
|		（7）print_JS_information():显示脚本信息					|
|																|
|	数值参数：													|
|		（1）max_danmu_long:更改弹幕长度；建议（20~40）				|
|		（2）num:更改小说num句，台词1句；						|
|		（3）cycle_time:更改弹幕周期，单位毫秒；建议大于2000		|
|		（4）taici:更改固定台词；								|
|																|
|	**********************************************************	|
|	使用说明：													|
|		（1）使用函数											|
|																|
|			输入函数名											|
|			例：输入 start()			//开始发送弹幕			|
|																|
|		（2）调整参数											|
|																|
|			输入：参数 = 具体数值								|
|			例：输入 max_danmu_long = 35 	//更改弹幕长度为35	|
|																|
|	主要参数建议数值：											|
|																|
|		（1）最大弹幕长度：建议20~40；默认40；						|
|																|
|		（2）更改小说num句，台词1句：建议0~20；默认10；			|
|																|
|		（3）弹幕周期：建议大于2000，默认4000；					|
|																|
|		（4）小说：无限制，文本即可，自动分段，自动断句			|
|			>>默认斗破苍穹第一章									|
|																|
|		（5）台词：无限制，勿超过最大允许弹幕字数				|
|			>>默认：嘉靖：朕要真是这样的天子,天厌之！朕			|
|			>>要真是这样的君父，万民弃之！						|
|																|
└---------------------------------------------------------------┘
********************************************************************
**********************************************************************/


// ----------------------------------------------
// （1）重要参数定义【可自行修改】
// ----------------------------------------------
var max_danmu_long = 40;//每句长度
var num = 10;//小说num句后，切台词一句
var cycle_time = 4000;//弹幕周期，单位毫秒
var min_danmu_long = 8;//最小弹幕长度
var error_danmu_long = 20;//出错弹幕长度
var taici = "嘉靖：朕要真是这样的天子，天厌之！朕要真是这样的君父，万民弃之！";
// ----------------------------------------------
// ----------------------------------------------

/*********************************************************
// 🈲🈲🈲🈲🈲🈲🈲🈲🈲🈲🈲🈲🈲🈲🈲🈲🈲🈲🈲🈲🈲🈲🈲🈲🈲🈲🈲🈲🈲
// #######################################################
// ##											        ##
// ##  以下所有内容严禁修改，否则将产生无法预知的错误！ ##
// ##										            ##
// #######################################################
// 🈲🈲🈲🈲🈲🈲🈲🈲🈲🈲🈲🈲🈲🈲🈲🈲🈲🈲🈲🈲🈲🈲🈲🈲🈲🈲🈲🈲🈲
*********************************************************/

// ----------------------------------------------
// （1）全局参数定义【严禁修改】
// ----------------------------------------------
var story;
var story_arr;
var index = 0;//小说分段
var pos = 0;//小说句内定位
let interval;
// ----------------------------------------------


// ----------------------------------------------
// （2）脚本初始化，默认自动开启独轮车【严禁修改】
// ----------------------------------------------
console.clear();  		//清屏
init_story();			// 初始化小说文本
print_JS_information();	// 打印脚本介绍信息
start();				// 开启独轮车
// ----------------------------------------------


// ----------------------------------------------
// （3）核心函数定义【严禁修改】
// ----------------------------------------------


function start() {
	
	const area = document.getElementsByClassName('ChatSend-txt')[0]
	const btn = document.getElementsByClassName('ChatSend-button ')[0]
	var flag = 0;//台词小说切换标记
	if (btn.innerHTML == '发送') {//错误测试
		print_start_succuess();
	}else{
		print_start_error();
		return;
	}	

	print_author_infor();
	interval = setInterval(function () {
		if(flag == 0){//发送台词
			area.value = taici;
			if (btn.innerHTML == '发送') {
				btn.click();
			}
			flag++;
		}else if (flag <= num){//每num句小说，一句台词
			flag++;
			if(index==story_arr.length){//小说段落切换
				index = 0;
			}
			
			if(pos<story_arr[index].length){//小说段内分句
				var better_sentence_info = get_better_sentence(index, pos);
				//分句函数，返回分句结果和pos
				pos = better_sentence_info[1];//分句后pos指针赋值
				area.value = better_sentence_info[0];//分句结果赋给弹幕框
				
				if (btn.innerHTML == '发送') {
					btn.click()
				}
				
			}else{
				index++;
				if(story_arr[index].length == 0){//跳过空白段
					index++
				}
				pos = 0;	
			}
		}else{
			flag = 0;
		}
  	}, cycle_time)//循环
}


function stop() {
  	clearInterval(interval);
	print_stop_succuess();
	print_author_infor();
}


function restart(){
	print_restart_infor();
	stop()
	start()
}
function reset_all(){
	max_danmu_long = 40;
	num = 10;
	cycle_time = 4000;
	index = 0;//跳转至第一段
	pos = 0;//跳转至第一句
	taici = "嘉靖：朕要真是这样的天子，天厌之！朕要真是这样的君父，万民弃之！";
}


function init_story(){
	story=
	`
	《斗破苍穹》天蚕土豆


	-------------------------

	第一章 陨落的天才

		“斗之力，三段！”

		望着测验魔石碑上面闪亮得甚至有些刺眼的五个大字，少年面无表情，唇角有着一抹自嘲，紧握的手掌，因为大力，而导致略微尖锐的指甲深深的刺进了掌心之中，带来一阵阵钻心的疼痛…

		“萧炎，斗之力，三段！级别：低级！”测验魔石碑之旁，一位中年男子，看了一眼碑上所显示出来的信息，语气漠然的将之公布了出来…

		中年男子话刚刚脱口，便是不出意外的在人头汹涌的广场上带起了一阵嘲讽的骚动。

		“三段？嘿嘿，果然不出我所料，这个“天才”这一年又是在原地踏步！”

		“哎，这废物真是把家族的脸都给丢光了。”

		“要不是族长是他的父亲，这种废物，早就被驱赶出家族，任其自生自灭了，哪还有机会待在家族中白吃白喝。”

		“唉，昔年那名闻乌坦城的天才少年，如今怎么落魄成这般模样了啊？”

		“谁知道呢，或许做了什么亏心事，惹得神灵降怒了吧…”

		周围传来的不屑嘲笑以及惋惜轻叹，落在那如木桩待在原地的少年耳中，恍如一根根利刺狠狠的扎在心脏一般，让得少年呼吸微微急促。

		少年缓缓抬起头来，露出一张有些清秀的稚嫩脸庞，漆黑的眸子木然的在周围那些嘲讽的同龄人身上扫过，少年嘴角的自嘲，似乎变得更加苦涩了。

		“这些人，都如此刻薄势力吗？或许是因为三年前他们曾经在自己面前露出过最谦卑的笑容，所以，如今想要讨还回去吧…”苦涩的一笑，萧炎落寞的转身，安静的回到了队伍的最后一排，孤单的身影，与周围的世界，有些格格不入。

		“下一个，萧媚！”

		听着测验人的喊声，一名少女快的人群中跑出，少女刚刚出场，附近的议论声便是小了许多，一双双略微火热的目光，牢牢的锁定着少女的脸颊…

		少女年龄不过十四左右，虽然并算不上绝色，不过那张稚气未脱的小脸，却是蕴含着淡淡的妩媚，清纯与妩媚，矛盾的集合，让得她成功的成为了全场瞩目的焦点…

		少女快步上前，小手轻车熟路的触摸着漆黑的魔石碑，然后缓缓闭上眼睛…

		在少女闭眼片刻之后，漆黑的魔石碑之上再次亮起了光芒…

		“斗之气：七段！”

		“萧媚，斗之气：七段！级别:高级！”

		“耶！”听着测验员所喊出的成绩，少女脸颊扬起了得意的笑容…

		“啧啧，七段斗之气，真了不起，按这进度，恐怕顶多只需要三年时间，她就能称为一名真正的斗者了吧…”

		“不愧是家族中种子级别的人物啊…”

		听着人群中传来的一阵阵羡慕声，少女脸颊上的笑容更是多了几分，虚荣心，这是很多女孩都无法抗拒的诱惑…

		与平日里的几个姐妹互相笑谈着，萧媚的视线，忽然的透过周围的人群，停在了人群外的那一道孤单身影上…

		皱眉思虑了瞬间，萧媚还是打消了过去的念头，现在的两人，已经不在同一个阶层之上，以萧炎最近几年的表现，成年后，顶多只能作为家族中的下层人员，而天赋优秀的她，则将会成为家族重点培养的强者，前途可以说是不可限量。

		“唉…”莫名的轻叹了一口气，萧媚脑中忽然浮现出三年前那意气风的少年，四岁练气，十岁拥有九段斗之气，十一岁突破十段斗之气，成功凝聚斗之气旋，一跃成为家族百年之内最年轻的斗者！

		当初的少年，自信而且潜力无可估量，不知让得多少少女对其春心荡漾，当然，这也包括以前的萧媚。

		然而天才的道路，貌似总是曲折的，三年之前，这名声望达到巅峰的天才少年，却是突兀的接受到了有生以来最残酷的打击，不仅辛辛苦苦修炼十数载方才凝聚的斗之气旋，一夜之间，化为乌有，而且体内的斗之气，也是随着时间的流逝，变得诡异的越来越少。

		斗之气消失的直接结果，便是导致其实力不断的后退。

		从天才的神坛，一夜跌落到了连普通人都不如的地步，这种打击，让得少年从此失魂落魄，天才之名，也是逐渐的被不屑与嘲讽所替代。

		站的越高，摔得越狠，这次的跌落，或许就再也没有爬起的机会。

		“下一个，萧薰儿！”

		喧闹的人群中，测试员的声音，再次响了起来。

		随着这有些清雅的名字响起，人群忽然的安静了下来，所有的视线，豁然转移。

		在众人视线汇聚之处，一位身着紫色衣裙的少女，正淡雅的站立，平静的稚嫩俏脸，并未因为众人的注目而改变分毫。

		少女清冷淡然的气质，犹如清莲初绽，小小年纪，却已初具脱俗气质，难以想象，日后若是长大，少女将会如何的倾国倾城…

		这名紫裙少女，论起美貌与气质来，比先前的萧媚，无疑还要更胜上几分，也难怪在场的众人都是这般动作。

		莲步微移，名为萧薰儿的少女行到魔石碑之前，小手伸出，镶着黑金丝的紫袖滑落而下，露出一截雪白娇嫩的皓腕，然后轻触着石碑…

		微微沉静，石碑之上，刺眼的光芒再次绽放。

		“斗之气：九段！级别：高级！”

		望着石碑之上的字体，场中陷入了一阵寂静。

		“…竟然到九段了，真是恐怖！家族中年轻一辈的第一人，恐怕非薰儿小姐莫属了。”寂静过后，周围的少年，都是不由自主的咽了一口唾沫，眼神充满敬畏…

		斗之气，每位斗者的必经之路，初阶斗之气分一至十段，当体内斗之气到达十段之时，便能凝聚斗之气旋，成为一名受人尊重的斗者！

		人群中，萧媚皱着浅眉盯着石碑前的紫裙少女，脸颊上闪过一抹嫉妒…

		望着石碑上的信息，一旁的中年测验员漠然的脸庞上竟然也是罕见的露出了一丝笑意，对着少女略微恭声道：“薰儿小姐，半年之后，你应该便能凝聚斗气之旋，如果你成功的话，那么以十四岁年龄成为一名真正的斗者，你是萧家百年内的第二人！”

		是的，第二人，那位第一人，便是褪去了天才光环的萧炎。

		“谢谢。”少女微微点了点头，平淡的小脸并未因为他的夸奖而出现喜悦，安静的回转过身，然后在众人炽热的注目中，缓缓的行到了人群最后面的那颓废少年面前…

		“萧炎哥哥。”在经过少年身旁时，少女顿下了脚步，对着萧炎恭敬的弯了弯腰，美丽的俏脸上，居然露出了让周围少女为之嫉妒的清雅笑容。

		“我现在还有资格让你怎么叫么?”望着面前这颗已经成长为家族中最璀璨的明珠，萧炎苦涩的道，她是在自己落魄后，极为少数还对自己依旧保持着尊敬的人。

		“萧炎哥哥，以前你曾经与薰儿说过，要能放下，才能拿起，提放自如，是自在人！”萧薰儿微笑着柔声道，略微稚嫩的嗓音，却是暖人心肺。

		“呵呵，自在人？我也只会说而已，你看我现在的模样，象自在人吗？而且…这世界，本来就不属于我。”萧炎自嘲的一笑，意兴阑珊的道。

		面对着萧炎的颓废，萧薰儿纤细的眉毛微微皱了皱，认真的道：“萧炎哥哥，虽然并不知道你究竟是怎么回事，不过，薰儿相信，你会重新站起来，取回属于你的荣耀与尊严…”话到此处，微顿了顿，少女白皙的俏脸，头一次露出淡淡的绯红：“当年的萧炎哥哥，的确很吸引人…”

		“呵呵…”面对着少女毫不掩饰的坦率话语，少年尴尬的笑了一声，可却未再说什么，人不风流枉少年，可现在的他，实在没这资格与心情，落寞的回转过身，对着广场之外缓缓行去…

		站在原地望着少年那恍如与世隔绝的孤独背影，萧薰儿踌躇了一会，然后在身后一干嫉妒的狼嚎声中，快步追了上去，与少年并肩而行…
	`
	story_arr=story.split('\n');
	story_arr.pop();//去除数组第一个空元素
	story_arr.shift();//去除数组最后一个空元素
}


function get_new_story(){
	stop();
	story = prompt("请新的小说内容","在这里粘贴您的小说文本");
	alert("你输入的新小说：" + story);
	console.log(story);//打印故事
	story_arr=story.split('\n');
	story_arr.pop();//去除数组第一个空元素
	story_arr.shift();//去除数组最后一个空元素
}


function get_better_sentence(index, pos){
	var new_pos;
	var better_sentence;
	for(var i=0; i<max_danmu_long;){
		var temp = story_arr[index].charAt(pos+i);
		if((temp == "。"||temp == "！"||temp == "？"||temp == "…")&&i >= min_danmu_long){//提前遇到句尾
			if(story_arr[index].charAt(pos+i+1) == "”"){//为引用句结尾
				i++;
			}
			better_sentence = story_arr[index].substring(pos,pos+i+1);
			new_pos = pos + i + 1;
			break;
		}else if((temp =="，"||temp =="；"||temp =="：")&&i >= error_danmu_long){//句子过长，逗号断开
			better_sentence = story_arr[index].substring(pos,pos+i+1);
			new_pos = pos + i + 1;
			break;
		}else{//不构成危险弹幕，仍能成句，继续查找下一字符
			i++;
		}
		
	}
	if(i == max_danmu_long){
		better_sentence = story_arr[index].substr(pos,max_danmu_long);
		new_pos = pos + max_danmu_long;
	}
	return [better_sentence,new_pos];
}




function print_JS_information(){

	const tips=
	`
	************************************************************
				【自动弹幕说书人V1.5（JS版）】
		   【Storyteller Of Auto-Barrage_V1.5_JS】	
		
											  作者：Ironieser丶 
											  斗鱼ID：祖冲之丶丶
									   Email:ironieser@gmail.com
	Github：
		https://github.com/Ironieser/Storyteller_Of_Auto-Barrage


														2020/2/6
														
	************************************************************
	************************************************************
	************************************************************
	
┌---------------------------------------------------------------┐
|						>>>>功能表<<<<							|
|																|
|	功能函数：													|
|		（1）start()：	开启独轮车（脚本加载后，默认自动开启）	|
|		（2）stop():	停止独轮车；							|
|		（3）get_new_story():读取新的小说						|
|		（4）restart():重启独轮车								|
|		（5）reset():重置所有数值参数							|
|		（6）init_story:重置小说								|
|		（7）print_JS_information():显示脚本信息					|
|																|
|	数值参数：													|
|		（1）max_danmu_long:更改最大弹幕长度；建议（20~40）		|
|		（2）num:更改小说num句，台词1句；						|
|		（3）cycle_time:更改弹幕周期，单位毫秒；建议大于2000		|
|		（4）taici:更改固定台词；								|
|																|
|	**********************************************************	|
|	使用说明：													|
|		（1）使用函数											|
|																|
|			输入函数名											|
|			例：输入 start()			//开始发送弹幕			|
|																|
|		（2）调整参数											|
|																|
|			输入：参数 = 具体数值								|
|			例：输入 max_danmu_long = 35 	//更改弹幕长度为35	|
|		  	重要：调整参数后，重启生效							|
|																|
|	主要参数建议数值：											|
|																|
|		（1）最大弹幕长度：建议20~40；默认40；					|
|																|
|		（2）更改小说num句，台词1句：建议0~20；默认10；			|
|																|
|		（3）弹幕周期：建议大于2000，默认4000；					|
|																|
|		（4）小说：无限制，文本即可，自动分段，自动断句			|
|			>>默认斗破苍穹第一章									|
|																|
|		（5）台词：无限制，勿超过最大允许弹幕字数				|
|			>>默认：嘉靖：朕要真是这样的天子,天厌之！朕			|
|			>>要真是这样的君父，万民弃之！						|
|	**********************************************************	|
|	**********************************************************	|
└---------------------------------------------------------------┘
	`
	console.log(tips);
	
}


function print_start_succuess(){
	const start_succuess = 
	`
	
		┌---------------------------------------------------┐
		|													|
		|			提示：您已成功开启独轮车！				|
		|													|
		└---------------------------------------------------┘
	
	`

	console.log(start_succuess);
}


function print_stop_succuess(){
	const stop_succuess = 
	`

		┌---------------------------------------------------┐
		|													|
		|			提示：您已成功关闭独轮车！				|
		|													|
		└---------------------------------------------------┘
		
	`
	console.log(stop_succuess);
}


function print_start_error(){
	const error_info =
	`

		┌---------------------------------------------------┐
		|													|
		|			错误：独轮车开启失败！					|
		|													|
		|		直播页面加载错误！弹幕发送键检测失败!		|
		|													|
		|			已为您自动停止独轮车!					|
		|													|
		|				请稍后重试！	  					|
		|													|
		└---------------------------------------------------┘

	`
	console.log(error_info);
	
}


function print_author_infor(){
	const author=
	`

┌---------------------------------------------------------------┐
|																|
|	欢迎您使用：自动弹幕说书人V1.5（JS版）						|
|			   <Storyteller_Of_Auto-Barrage>					|
|																|
|	如您需要提交Bug，或有任何意见和建议							|
|																|
|	请联系我，或前往本项目的Github进行反馈，谢谢！				|
|	作者:Ironieser丶											|
|	斗鱼ID：祖冲之丶丶											|
|	Email：ironieser@mail.com									|
|	Github：													|
|	https://github.com/Ironieser/Storyteller_Of_Auto-Barrage	|
|																|
└---------------------------------------------------------------┘
	
	
	`

	console.log(author);
}


function print_restart_infor(){
	const restart_infor = 
	`
	
		┌---------------------------------------------------┐
		|													|
		|			提示：正在为您重启独轮车...				|
		|													|
		└---------------------------------------------------┘
	
	`

	console.log(restart_infor);
	
}
