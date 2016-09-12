
<?php
//Get the file
ini_set('user_agent','Mozilla/4.0 (compatible; MSIE 6.0)'); 

$json_file = file_get_contents("/usr/share/nginx/html/gameDetails.json");
$items = json_Decode($json_file,true);
foreach($items as $item)
{
	$content = file_get_contents($item['Image']);
	$fp = fopen("/usr/share/nginx/html/img/games/".$item['Name'].".jpg", "w");
	fwrite($fp, $content);
	fclose($fp);
}
?>

