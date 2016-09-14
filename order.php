<!DOCTYPE html>
<!-- saved from url=(0043)http://getbootstrap.com/examples/jumbotron/ -->
<html lang="en"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <meta name="description" content="">
    <meta name="author" content="">

    <title>BOOMBasket</title>

    <!-- Bootstrap core CSS -->
<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

<!-- Optional theme -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
<script src="categories.js" />

<!-- Latest compiled and minified JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <link href="./Jumbotron Template for Bootstrap_files/ie10-viewport-bug-workaround.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="./Jumbotron Template for Bootstrap_files/jumbotron.css" rel="stylesheet">

    <!-- Just for debugging purposes. Don't actually copy these 2 lines! -->
    <!--[if lt IE 9]><script src="../../assets/js/ie8-responsive-file-warning.js"></script><![endif]-->
    <script src="./Jumbotron Template for Bootstrap_files/ie-emulation-modes-warning.js"></script>

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>

  <body>

    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand"  href="./index.html">BOOMBasket</a>
        </div>
    </div>
 </nav>
<center>
 <div class="jumbotron">
      <div class="pcontainer" id="pcontainer">
        
      </div>
    </div>
</center>
<?php
session_start();

if(isset($_POST['submit']))
{

include 'dbheader.php';
$email = $_POST['email']; $passwd=$_POST['passwd']; 
$cartList=$_POST['cartList'];
$paymentType='cod'; // Create connection 
$conn = mysqli_connect($servername, $username, $password, $dbname); // Check connection 
if (!$conn) {
    echo "connection failed";

}
if(isset($_SESSION['user']))
{

	$itemCounts = json_decode(stripslashes($cartList),true);
	$products= array_keys($itemCounts);
	$total=0;
	$userID=$_SESSION['userID'];
	$names=array();
	foreach($products as $item)
	{
		
		$category = substr($item,0,2);
		switch($category){
		case "pc" : $category="personal";break;
		case "hh" : $category="household";break;
		case "bv" : $category="beverages";break;
    case "ga" : $category="games";break;
    case "pl" : $category = "planes";break;
    case "f1" : $category="F-16";break;
  case "sk" : $category="Sukhoi";break;
  case "mi" : $category="Mi-28";break;
  case "dh" : $category="Dhruv";break;
  case "f3" : $category="F-35";break;
		}	
		$json_file=file_get_contents("/usr/share/nginx/html/".$category.".json");
		$file_items=json_Decode($json_file,true);
		foreach($file_items as $prod)
		{
			if($prod["id"]==$item)
			{
				array_push($names,$prod["Name"]);
				
				$total+=$prod["Price"]*$itemCounts[$item];

			}
				
		}
		
	}
	
	//echo $row["id"];
	$qr="insert into orders values(null,'$userID','$cartList','$total','$paymentType')";
	$order=mysqli_query($conn,$qr);
	if($order)
        {
          setlocale(LC_MONETARY, 'en_IN');
$total = money_format('%!i', $total);
		echo '<script>document.getElementById("pcontainer").innerHTML="Your order for Rs.'.$total.' has been confirmed";localStorage.clear();</script>';		
		echo "<center><a href='orders.php'>Click here to view your orders</a></center>";
	}
	else
		echo "Something  went wrong";

$_SESSION['initOrder']=0;
mysqli_close($conn);
}
}

?>
  <hr>

      <footer>
        <p>© 2016 BOOMBasket, Inc.</p>
      </footer>
    </div> <!-- /container -->


    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="./Jumbotron Template for Bootstrap_files/jquery.min.js"></script>
    <script>window.jQuery || document.write('<script src="../../assets/js/vendor/jquery.min.js"><\/script>')</script>
    <script src="./Jumbotron Template for Bootstrap_files/bootstrap.min.js"></script>
    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <script src="./Jumbotron Template for Bootstrap_files/ie10-viewport-bug-workaround.js"></script>
  

</body></html>

