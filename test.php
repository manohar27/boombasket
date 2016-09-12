<?php
//Get the file
ini_set('user_agent','Mozilla/4.0 (compatible; MSIE 6.0)');
$json_file = file_get_contents("/usr/share/nginx/html/gameDetails.json");
$items = json_Decode($json_file,true);
$i=0;
$itemsnew=array();
foreach($items as $item)
{
        $item["id"]='ga'.$i;
        unset($item["ID"]);
	
	$itemsnew[$i]=$item;
       	$i=$i+1; 
}
$a=json_encode($itemsnew);
$fp=fopen('/usr/share/nginx/html/gameDetails1.json','w');
fwrite($fp,$a);
fclose($fp);
echo $a;
?>
