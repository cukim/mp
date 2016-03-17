<?php

 //<- 오류 모두 표시 
//error_reporting(E_ALL); 
//ini_set('display_errors','On'); 

//<-- 오류 숨기기 
error_reporting(0); 
ini_set('display_errors','0'); 

	header('Content-Type: charset=utf-8');
	
	$RootPath="C:/Apache24/htdocs/music";
	
	$rpath = $_REQUEST["d"];
	$rpath = urldecode($rpath);	

	if($rpath==''){
		$rpath = $RootPath;
	}else{
		$rpath = $RootPath."\\".$rpath; 
	}
	$rpath = iconv("UTF-8", "CP949", $rpath);
	//echo ("* Path = $rpath<br>");

	if(is_dir($rpath)){
		fnGetFiles($rpath);
	}else {
		echo ("Invalid Directory Name : $rpath");
	}		
 
 function fnGetFiles($d){
 	$fdir = dir($d);
	$icount = 1;
	// read file system **********************
	$handle = opendir($d);
	while (false !== ($filename = readdir($handle))) {
		if (($filename==".")){
			continue;		 
		}else{
			if(is_dir("$d/$filename")){
				$dirs[] = $filename;
			}else{
				if (($fext=="htm")||($fext=="php")||($fext==".js")||($fext=="css")||($fext=="txt")){ 
					continue;		
				}else{
					$files[] = $filename;
				}
			}
		}	
	} //while
	//	sort($files);

	// write list of folder **********************
	$icount=0;
	echo "{\"ds\":[";
	foreach ($dirs as $dn){
		if ($icount>0) echo(",") ;
		if (($dn==".")||($dn=="..")){
			continue;		
		}else{

			$dn = iconv("euc-kr", "UTF-8", $dn);
				//$dn = urlencode($dn);	
			echo("\"$dn\"");
			$icount++;
		}
	}			
	echo "],";

	 // write list of files **********************
	$icount=0;
	echo "\"fs\":[";
	foreach ($files as $fn){
		if ($icount>0) echo(",") ;
		$fext = substr($fn,-3);
/*		if (($fext=="htm")||($fext=="php")||($fext==".js")||($fext=="css")||($fext=="txt")){ 
			continue;		
		}else{*/
			$fn = iconv("euc-kr", "UTF-8", $fn);
				//$fn = urlencode($fn);	
			$fnn = substr($fn,0,-4);
			
			echo("\"$fn\"");
			$icount++;
/*		}*/
	}			
	echo "]}";
}
// ------------------------------------------------------------

?> 