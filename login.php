<?php
$servername = "localhost";
$username = "jz21";
$password = "db_booom";
$dbname = "shopping";
$email = $_POST['email'];
$passwd=$_POST['passwd'];
$user=array();
$user["loggedIn"]=0;
// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if (!$conn) {
    echo "connection failed";	

}
if(!isset($_SESSION['user']))
{
$sql = "SELECT email,passwd,id,country FROM users WHERE email='$email' and passwd='$passwd'";

$result = mysqli_query($conn, $sql);
$row=mysqli_fetch_assoc($result);
if(mysqli_num_rows($result)==1)
{
	session_start();
	$user["loggedIn"]=1;
	$user["email"]=$row['email'];
        $_SESSION['loggedin']=1;
        $_SESSION['user']=$row['email'];
        $_SESSION['userID']=$row['id'];
	$_SESSION['country']=$row['country'];
	echo "<script> window.location.href = document.referrer; </script>";
}
else
 echo "Invalid  credentials";
}

mysqli_close($conn);
?>

