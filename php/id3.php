<?php
	$ff = urldecode($_REQUEST["f"]);;

	//echo($ff);
	
	//$ff = iconv("UTF-8", "CP949", $ff);
	//$id3 = ID3v1("../music/11105.mp3");
	$fn = "./".$ff;
if (file_exists($ff)){
	
	$id3 = ID3v1($ff);
	
	//$tt =  iconv("CP949", "UTF-8", $id3[Title]);
	if ($id3[Tag]=='ID3v1'){
		//echo "ID3v1";
		echo iconv("CP949", "UTF-8", $id3[Title])."\n";
		echo iconv("CP949", "UTF-8", $id3[Artist])."\n";
		echo iconv("CP949", "UTF-8", $id3[Album])."\n";
		echo iconv("CP949", "UTF-8", $id3[Year])."\n";
		echo iconv("CP949", "UTF-8", $id3[Comment])."\n";
		echo $id3[Genre];
	}else{
		echo "ID3v2 over";
		echo substr($id3,0,10);
	}
}else{
	echo "-1";
	//echo "<br>".$ff;
	//echo "<br>".getcwd();
}	
	
//------------------------------------------------------------	
function ID3v1($_MP3){ 

$GenreArray = array(
	"Blues", "Classic Rock", "Country", "Dance", "Disco", "Funk", "Grunge", "Hip-Hop", "Jazz", "Metal",
	"New Age", "Oldies", "Other", "Pop", "R&B", "Rap", "Reggae", "Rock", "Techno", "Industrial",
	"Alternative", "Ska", "Death Metal", "Pranks", "Soundtrack", "Euro-Techno", "Ambient", "Trip-Hop", "Vocal", "Jazz+Funk",
	"Fusion", "Trance", "Classical", "Instrumental", "Acid", "House", "Game", "Sound Clip", "Gospel", "Noise",
	"Alternative Rock", "Bass", "Soul", "Punk", "Space", "Meditative", "Instrumental Pop", "Instrumental Rock", "Ethnic", "Gothic",
	"Darkwave", "Techno-Industrial", "Electronic", "Pop-Folk", "Eurodance", "Dream", "Southern Rock", "Comedy", "Cult", "Gangsta",
	"Top 40", "Christian Rap", "Pop/Funk", "Jungle", "Native US", "Cabaret", "New Wave", "Psychadelic", "Rave", "Showtunes",
	"Trailer", "Lo-Fi", "Tribal", "Acid Punk", "Acid Jazz", "Polka", "Retro", "Musical", "Rock & Roll", "Hard Rock",
	"Folk", "Folk-Rock", "National Folk", "Swing", "Fast Fusion", "Bebob", "Latin", "Revival", "Celtic", "Bluegrass",
	"Avantgarde", "Gothic Rock", "Progressive Rock", "Psychedelic Rock", "Symphonic Rock", "Slow Rock", "Big Band", "Chorus", "Easy Listening", "Acoustic",
	"Humour", "Speech", "Chanson", "Opera", "Chamber Music", "Sonata", "Symphony", "Booty Bass", "Primus", "Porn Groove",
	"Satire", "Slow Jam", "Club", "Tango", "Samba", "Folklore", "Ballad", "Power Ballad", "Rhytmic Soul", "Freestyle",
	"Duet", "Punk Rock", "Drum Solo", "Acapella", "Euro-House", "Dance Hall", "Goa", "Drum & Bass", "Club-House", "Hardcore",
	"Terror", "Indie", "BritPop", "Negerpunk", "Polsk Punk", "Beat", "Christian Gangsta", "Heavy Metal", "Black Metal", "Crossover",
	"Contemporary C", "Christian Rock", "Merengue", "Salsa", "Thrash Metal", "Anime", "JPop", "SynthP"
	);

	$fp=@fopen($_MP3,'r'); 

	if(!$fp) return false; 
	@fseek($fp,-128,SEEK_END); 

	$ID_Tag=@fread($fp, 128); 
	$result[Tag]=substr($ID_Tag,0,3); 

	if(!$result[Tag]=='TAG') return false; 
		else $result[Tag]='ID3v1'; 

	$result[Title]=trim(substr($ID_Tag,3,30)); 
	$result[Artist]=trim(substr($ID_Tag,33,30)); 
	$result[Album]=trim(substr($ID_Tag,63,30)); 
	$result[Year]=trim(substr($ID_Tag,93,4)); 
	$result[Comment]=trim(substr($ID_Tag,97,28)); 
	$result[Albumtrack]=trim(substr($ID_Tag,126,1)); 
	$result[Genre]=trim(substr($ID_Tag,126,1)); 

	if ($result[Genre]!=''){
		$g = intval(trim(substr($ID_Tag,127,1)));
		$result[Genre]= $GenreArray[$g];
	}
	fclose($fp); 

	return $result; 
} 
function tostring($text){
	return iconv('UTF-16LE', 'UHC', chr(hexdec(substr($text[1], 2, 2))).chr(hexdec(substr($text[1], 0, 2))));

}
?>