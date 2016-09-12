<?php
session_start();
$user=array();
if(isset($_SESSION['user']))
{
 
 $user['email']=$_SESSION['user'];
 $user['loggedIn']=1;
 $user['country']=$_SESSION['country'];
}
else
{
 $user['loggedIn']=0;
}
$response=json_encode($user);
echo $response;
?>
