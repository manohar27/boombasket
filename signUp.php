<?php
if(isset($_POST['submit'])){
$servername = "localhost";
$username = "jz21";
$password = "db_booom";
$dbname = "shopping";
$email = $_POST['email'];
$passwd=$_POST['passwd'];
$country=$_POST['country'];
$user=array();
$user["loggedIn"]=0;
// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if (!$conn) {
    echo "connection failed";
}

$sql = "insert into users values(null,'$email','$passwd','$country')";

$result = mysqli_query($conn, $sql);
if($result)
 echo "<script>alert('Sign Up Complete'); window.location.href = document.referrer;</script>";
else
 echo "$email, $country";
// echo "<script>alert('Something went wrong'); window.location.href = document.referrer;</script>";
mysqli_close($conn);
}
?>
