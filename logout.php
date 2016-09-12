<?php
session_start();
$user=array();
if(isset($_SESSION['user']))
{
	$_SESSION=array();
	session_destroy();
	$user["success"]=1;
}
else
	$user["success"]=0;

$response=json_encode($user);
echo $response;
?>
