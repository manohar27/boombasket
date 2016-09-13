

function remove(id)
{
  var cartList = localStorage.getItem('itemCount');
  var cartArray = JSON.parse(cartList);
  delete cartArray[id];
  localStorage.setItem('itemCount',JSON.stringify(cartArray));
  var count = Object.keys(cartArray).length;
  localStorage.setItem('count',count);
  location.reload();
}
var cart = localStorage.getItem('itemCount');
var total=0;
var name='';
var item_template='';
if(cart==null || cart=="{}")
 document.getElementById('list').innerHTML = "<h2>Your cart is empty</h2>";
else
{
 var cartList=cart.split(',');
 //cookieArray.sort();
 var count=localStorage.getItem('count');
 var itemCounts=JSON.parse(localStorage.getItem('itemCount'));
 var count=Object.keys(itemCounts).length;
 var cartList=Object.keys(itemCounts);
 var lang=localStorage.getItem('lang');
  item_template=`<h2>${count} items in your cart</h2><table id="cartTable" cellspacing="50px">

   <tr>
     <th>Item </th>
     <th>&nbsp  &nbsp</th>
     <th>Quantity</th>
     <th>&nbsp  &nbsp</th>
     <th>Price</th>
    </tr>`;
for(var i in cartList)
 {
   var price=0;
   var img='';
   var category=cartList[i].substring(0,2);
   switch(category)
   {
	case "pc" : category="personal";break;
	case "hh" : category="household";break;
	case "bv" : category="beverages";break;
  case "ga" : category="games";break;
   }
 
  $.ajax({
	url: category+'.json',
	dataType: 'json',
	async: false,
	success:function(items){
	for(var j in items)
	{
		if(items[j].id==cartList[i])
		{
      if(lang!="English" && category=="games")
        name=items[j][lang];
      else
			name=items[j].Name;
      img = items[j].Name;
			price=items[j].Price.split(' ')[0];
		}
	}
	total=total+parseInt(price)*itemCounts[cartList[i]];
  item_template+=`<tr >
   <td><img src="img/${category}/${img}.jpg" style="float:left" height="50px" width="50px" />${name}</td>
   <td>&nbsp  &nbsp</td>

   <td>${itemCounts[cartList[i]+'']}</td>
   <td>&nbsp  &nbsp</td>
   <td><i class="fa fa-inr"></i> ${price}</td>
   <td><button onclick="remove('${cartList[i]}')">Delete</button</td>
   </tr>`;	
//document.getElementById('list').innerHTML=item_template; 
    }
  });
 
 
}
 item_template+="</table>"; 
 item_template+="<h2>Your order total is <i class='fa fa-inr'></i>"+total+"</h2><div id='proceedButton'></div>";



 $.getJSON("checkLogin.php",function(data){
 if(data.loggedIn==1)
 item_template+='<form action="order.php" method="post" id="cartForm"><input name="cartList" type="hidden" value='+localStorage.getItem("itemCount")+' /><button id="submit" name="submit" class="btn btn-primary btn-lg">Proceed </button> </form>';
 else
 item_template+='<button id="signin" type="button" data-toggle="modal" data-target="#loginModal" class="btn btn-primary btn-lg">Proceed</button>';
 document.getElementById('list').innerHTML=item_template;

});

}

