
$(document).ready(function(){
	Request.Parse();

	alert(Request.url)
	
	if (Request.url!=undefined){
		
		var home_Music ="C:\Users\cukim\Music"
		var aUrl = Request.url;
		//var pl = './music/' + aUrl
		//var pp = './music/' + aUrl + '.mp3';

		var pl = home_Music +"\\"+ aUrl
		var pp = home_Music+"\\" + aUrl + '.mp3';
		//alert(pp)
		
		var str = createJwplayer("/p/jw/player47.swf","300","24",pp,"true");
		
		var p = document.getElementById("MPlayer")
		p.innerHTML = str;
		
		
		$.ajax({	type: 'get',	
					url: pl +'.htm',	
					dataType: 'text',
					success: function(s){	
						//alert(s);
						$('#divText').html(s); 		
					}
		})
		
	}
	else{
		//alert(navigator.appName)
		document.location.href="list.htm";
	}
	
})

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


function browserInfo(){
	document.write("<div id=\"example\"></div>");

	txt = "<p>Browser CodeName: " + navigator.appCodeName + "</p>";
	txt+= "<p>Browser Name: " + navigator.appName + "</p>";
	txt+= "<p>Browser Version: " + navigator.appVersion + "</p>";
	txt+= "<p>Cookies Enabled: " + navigator.cookieEnabled + "</p>";
	txt+= "<p>Platform: " + navigator.platform + "</p>";
	txt+= "<p>User-agent header: " + navigator.userAgent + "</p>";

	document.getElementById("example").innerHTML=txt;
}

