var g_dd = '';
var player;
var musicList;
var plagPlayList = true;

var pl ='';
var home_Music ="C:\Users\cukim\Music";

$(document).ready(function(){
	Request.Parse();
	
	if (Request.d!=undefined){		
		g_dd = Request.d;
		g_dd = g_dd.replace(/#/gi, "");
		pl = pl + g_dd;
	}

	if (Modernizr.audio){
		player = new Audio();
		player.autoplay = false;
		player.controls = true;
		player.loop = false;
		player.volume = 50/100;	

		//player = document.createElement('audio');
		//player.id = this.id;
		//player.src = '/music/Uninstall.mp3';
		//player.controls = this.controls;
		//player.loop = this.loop;

		// 미디어클립을 재생할 준비가 완료 시 이벤트 핸들러
		var p = document.getElementById("divMusicPlayer")
		//document.body.appendChild(player);
		p.appendChild(player);
		player.play();	

		$(player).attr('onended', 'cccc()');

		/*
		$(player).bind('onended',function(){
			alert("ddddd")
		})
		*/
		/*
		setTimeout(function(){
			//player.muted=true;
			player.volume = 50/100;	
			//player.pause();	
			},1000*15);
		setTimeout(function(){	player.pause();	},1000*20);
		*/

			updateMusicList(pl);
		
	}else{
		var str = createJwplayer("/p/jw/player47.swf","300","18",'',"false");
		var p = document.getElementById("divMusicPlayer")
		p.innerHTML = str;

		updateMusicList(pl);
	}	
	//readData('list.php', {d:d}'GET', false)
	
})
function cccc(){
	if (plagPlayList){
		s = decodeURI(player.src)		

		//alert(musicList.length + ":" + s)
		for(i=0;i<musicList.length;i++){

			//alert(musicList[i] +" , "+s.split('/').pop())

			if(musicList[i] ==  s.split('/').pop()){
				if (i==musicList.length-1) i=0;
				//alert(musicList[i+1])	
				playMusicFile(musicList[i+1]);
				break;
			}
		}
	}
}
function updateMusicList(d){
		var rr;
		//alert(d)
		$.getJSON("php/list.php", 
					{"d": d },
					function(ret){

			ss = updateMusicFolderList(ret.ds)
			$('#divMusicFolderList').html(ss); 

			ss = updateMusicFileList(ret.fs)
			$('#divMusicFileList').html(ss); 

		});		
		
/*
		$.ajax({	type: 'get',	dataType: 'json',	url: 'php/list.php',	data: "d=" + d,
					success: function(s){	
						alert(s)
//						frr = s.split('\n\n');		dirs = frr[0]; 				files = frr[1];
//						arr = dirs.split('\n');		ss = updateMusicFolderList(arr);		$('#divMusicFolderList').html(ss); 	
//						arr = files.split('\n');	ss = updateMusicFileList(arr);		$('#divMusicFileList').html(ss); 		
					},
			        error : function(e) {
						alert("처리중 장애가 발생하였습니다.\n"+ e);
					}	
		})
*/		
		
}
function updateMusicFolderList(arr){
	var str = '<ol id=\"MusicList\" type=\"1\">\n'
	if (arr.length<=2)	str += '<li class="type_a" onclick=\"MoveFolder(\'\')\">[ UP ]</li>\n'
	for(var i=0;i<arr.length;i++){
		if (arr[i] != '')	str += '<li class="type_a" onclick=\"MoveFolder(\'' + g_dd + "/" + arr[i] + '\')\">' + arr[i] + '</li>\n'
	}
	str += '</ul>'
	return str;
}
function updateMusicFolderList_org(arr){
	var str = '<ol id=\"MusicList\" type=\"1\">\n'
	if (arr.length<=2)	str += '<li class="type_a" onclick=\"MoveFolder(\'\')\">[ UP ]</li>\n'
	for(var i=0;i<arr.length;i++){
		if (arr[i] != '')	str += '<li class="type_a" onclick=\"MoveFolder(\'' + arr[i] + '\')\">' + arr[i] + '</li>\n'
	}
	str += '</ul>'
	return str;
}

function MoveFolder(s){
		document.location.href = 'list.htm?d=' + escape(s)
}

function updateMusicFileList(arr){
	musicList = arr;
	if (plagPlayList) p='ON'; else p='OFF';
	var strmenu = '<p style="padding-left:20px">'
		strmenu += '<a class="type_a" onclick="playMusicList(this);">[ play List ' + p +']</a>'
		strmenu += '</p>'
	$("#divMusicFileListMenu").html(strmenu);

	player.loop? ploop='ON': ploop='OFF';
	var strmenu = '<p style="padding-left:20px">'
		strmenu += '<a class="type_a" onclick="toggleLoop();">[ Loop ' + ploop +']</a>'
		strmenu += '</p>'
	$("#divMusicFileLoopMenu").html(strmenu);
	var str = '<ol id=\"olMusicList\" type=\"1\">\n'
	for(var i=0;i<arr.length-1;i++){
		if (arr[i] != '')	str += '<li class="type_a" onclick=\"playMusic(this)\">' + arr[i] + '</li>\n'
	}
	str += '</ol>'
	return str;
}

function updateMusicFileList_org(arr){
	musicList = arr;
	if (plagPlayList) p='ON'; else p='OFF';
	var strmenu = '<p style="padding-left:20px">'
		strmenu += '<a class="type_a" onclick="playMusicList(this);">[ play List ' + p +']</a>'
		strmenu += '</p>'
	$("#divMusicFileListMenu").html(strmenu);

	player.loop? ploop='ON': ploop='OFF';
	var strmenu = '<p style="padding-left:20px">'
		strmenu += '<a class="type_a" onclick="toggleLoop();">[ Loop ' + ploop +']</a>'
		strmenu += '</p>'
	$("#divMusicFileLoopMenu").html(strmenu);
	var str = '<ol id=\"olMusicList\" type=\"1\">\n'
	for(var i=0;i<arr.length-1;i++){
		if (arr[i] != '')	str += '<li class="type_a" onclick=\"playMusic(this)\">' + arr[i] + '</li>\n'
	}
	str += '</ol>'
	return str;
}

function toggleLoop(){

	
	player.loop? player.loop=false: player.loop=true;
	player.loop? ploop='ON': ploop='OFF';
	var strmenu = '<p style="padding-left:20px">'
	strmenu += '<a class="type_a" onclick="toggleLoop();">[ Loop ' + ploop +']</a>'
	strmenu += '</p>'
	$("#divMusicFileLoopMenu").html(strmenu);


}
function playMusic(c){
	f = $(c).text();
	playMusicFile(f)

}
function playMusicFile(f){

	f = '/music/' + g_dd + '/' + f 

	//alert(f)
	
	if (Modernizr.audio){
		player.pause();
		player.src = f;
		player.play();		
	
	}else{
		//s = escape(s)
		var str = createJwplayer("/jw/player47.swf","300","24",f,"true");
		
		var p = document.getElementById("divMusicPlayer")
		p.innerHTML = str;
	}	
	
	
		updateMusicTagID3('..' + f)
		updateMusicLyric(unescape(f))
		

	//alert(str)
}

function playMusicList(){

	$o = $("#olMusicList");
	var l = $o.children().length;

	//player.src='';
	$(player).empty();
	for(i=0;i<l;i++){
		u = $o.children()[i].innerText
		var s = document.createElement('source')
		s.src = escape(u);
		s.type="audio/mp3"
		
		$(player).append($(s));
	}

	player.play();
}
function updateMusicTagID3(f){

		//alert(f)
		$.ajax({	type: 'get',	dataType: 'text',	url: 'id3.php',	data: "f=" + f,
					success: function(s){	
						//alert(s)
						arr = s.split('\n');
						ss = drawID3List(arr);
						$('#divMusicTag').html(ss); 		
					}
		})

}


function drawID3List(arr){

	var str = '' //<ol id=\"MusicList\" type=\"1\">\n'
	//for(var i=0;i<arr.length-1;i++){
		str = arr[0] + '  -  ' + arr[1] + '<br/>' + arr[2] + ' ' + arr[3] + '\t' + arr[4] + '\t' + arr[5]
	//}
	str += '</ul>'
	return str;
}

function updateMusicLyric(f){

	f = f.substring(0,f.length-4)	
		

	f=escape(f)
	
	//alert(f);
	
	$('#divMusicLyric').text('');
	
	$('#divMusicLyric').load(f + '.htm',function(response, status, xhr) {
	  if (status == "error") {
	    //alert("error")
	    }
	  });
}


var Request =
{
	Parse : function () {
		var Values = (String(location).indexOf("?") > 0) ? String(location).replace(/.[^?]+\?/,"").split("&") : null;
		for (var i in Values) {
			var Redim = [
				Values[i].substr(0,Values[i].indexOf("=")),
				Values[i].substr(Values[i].indexOf("=") + 1,Values[i].length - Values[i].indexOf("=") - 1)
			];
			this[Redim[0]] = Redim[1];
		}
		delete this.Parse;
	}
}
