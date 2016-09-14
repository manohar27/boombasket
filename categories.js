

function language()
{
var lang = document.getElementById('lang').value;
var gamesHeading = document.getElementById('gamesHeading');
switch(lang)
{

	case 'English' : if(gamesHeading)document.getElementById('gamesHeading').innerHTML="Video Games";document.getElementById('query').placeholder="search for products";break;
	case 'Chinese' :if(gamesHeading) document.getElementById('gamesHeading').innerHTML="视频游戏";document.getElementById('query').placeholder="搜索产品";break;
	case 'Korean' :if(gamesHeading) document.getElementById('gamesHeading').innerHTML="비디오 게임";document.getElementById('query').placeholder="제품 검색";break;

}


localStorage.setItem('lang',lang);
}

function standard(x)
{
  var lastThree = x.substring(x.length-3);
var otherNumbers = x.substring(0,x.length-3);
if(otherNumbers != '')
    lastThree = ',' + lastThree;
var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
return res;
}



function add(id){
	var itemCount = document.getElementById(id).value;
	var category = id.substring(0,2);

	if(itemCount>=1 && itemCount<=200)
	{
	var cart = localStorage.getItem('cartList');
	var count= localStorage.getItem('count');	
	if(cart==null)
	{
	 localStorage.setItem('cartList',id);
	 localStorage.setItem('count',1);
	 var itemCounts={};
	 itemCounts[id]=itemCount;
	 localStorage.setItem('itemCount',JSON.stringify(itemCounts));
	}
	else
	{
	 var itemCounts=JSON.parse(localStorage.getItem('itemCount'));
	 if(itemCounts[id]==null)
		itemCounts[id]=0;
	 var prevCount=itemCounts[id];
	 var newCount=parseInt(prevCount)+parseInt(itemCount);
	 itemCounts[id]=newCount;
	 localStorage.setItem('itemCount',JSON.stringify(itemCounts));
	 localStorage.setItem('cartList',cart+','+id);
	 localStorage.setItem('count',Object.keys(itemCounts).length);
	}
	 var count = localStorage.getItem('count');
	 document.getElementById('cartCount').innerHTML=" ("+count+") ";
	}
	else
	{
		alert("Invalid Quantity");
		document.getElementById(id).value=1;
	}
}





function search(){
var item_template='';
var query=document.getElementById('query').value;
if(query.indexOf('*')>-1) return;
var hostname=window.location.hostname;
var url = "http://"+hostname+":9200/shopping/_search?size=1000&q=";
var lang = localStorage.getItem('lang');
if(lang==null)lang="English";
if(lang!='English')
    url+='_all:'+query; 
else
	url+='Name:'+query;
$.getJSON(url,function(results){
console.log(results);
document.getElementById('heading').innerHTML=results.hits.total+" items found";
if(results.hits.total>0){
 var items =results.hits.hits;
 for(var i in items){
 var cat=items[i]._type;
 var prodId=`${cat}_${items[i]._source.Name}_${items[i]._source.Quantity}`;
 if((lang=="Chinese" || lang=="Korean") && cat=="games")prodName = items[i]._source[lang];
 else prodName=items[i]._source.Name;	
 if(items[i]._source.Description==null)items[i]._source.Description=items[i]._source.Name;
 if(items[i]._source.Quantity==null)items[i]._source.Quantity='';
 var price=items[i]._source.Price.split(' ')[0];
 if(price.length>3)price = standard(price);
   item_template += `<div class="col-md-4 panel panel-default"  id="${cat}_${items[i].Name}_${items[i].Quantity}">  <h2>${prodName}</h2>
                                        <a href="javascript:addtocart('{$i}')" > <img class="thumbnail" onerror='this.src="./img/spares.jpg"' title="${items[i]._source.Description}" height="150px" width="150px" src="./img/${cat}/${items[i]._source.Name}.jpg" /></a>

                                        <p> <b><i class="fa fa-inr"></i>${price}</b><p>
                                        <p>${items[i]._source.Quantity}<p>
                                        <label>Qty</label>
                                        <input type="text" value="1" class="col-lg-2" maxlength="3" id="${items[i]._source.id}" />&nbsp

					 <button class="btn btn-success" onclick="add('${items[i]._source.id}')" value="Add to cart" >Add to cart</button>
                                        </div>`

}
document.getElementById('list').innerHTML=item_template;

}
else
document.getElementById('list').innerHTML='';
});



}






function fetchItems(cat)
{
var name=[];
	var item_template ='';
	/*switch(cat){

	case 'household' : 
	case 'beverages' :
	case 'personal' :
	case 'planes' :
	case  'F-16' : 
	case 'games' :*/ $.getJSON(cat+'.json',function(items){
                                 name=items;
                                 var lang = localStorage.getItem('lang');
                                 if(lang!="English" && cat=="games")prodName=lang;else  prodName="Name";


				for( var i in name)
				{		
					var prodId=`${cat}_${name[i].Name}_${name[i].Quantity}`;
					if(name[i].Quantity==null) name[i].Quantity='';

					
			 		item_template += `<div class="col-md-4" id="${cat}_${name[i].Name}_${name[i].Quantity}"> <h4>${name[i][prodName]}</h4> 			
					<a href="javascript:addtocart('{$i}')" > <img class="thumbnail" id="${name[i].Name}" onerror='this.src="./img/spares.jpg"' height="150px" width="150px" src="./img/${cat}/${name[i].Name}.jpg" /></a>
					<p>${name[i].Quantity}<p>
					<p><b><i class="fa fa-inr"></i>${name[i].Price.split(' ')[0]}</b></p>
                    <label>Qty</label>

					<input type="text" value="1" class="col-lg-2"  id="${name[i].id}" />&nbsp
					<button class="btn btn-success"  onclick="add('${name[i].id}')" value="Add to cart" >Add to cart</button>
					</div>`

				}
				//console.log(item_template);
				document.getElementById('list').innerHTML=item_template;
					

                                });
	
//	}
	

    
}

function category(cat){
	if(cat=="spares")
	{var selection = document.getElementById('modelSelect').value;
	
	localStorage.setItem('plane',selection);
	category(selection);
	}
	if(cat=="planes")
	{
		document.getElementById("heading").innerHTML=cat.toUpperCase() + "			<button type='button' class='btn btn-info btn-lg' data-toggle='modal' data-target='#myModal'>Buy Spares</button>";
	}
	else
		document.getElementById("heading").innerHTML = cat.toUpperCase();
 fetchItems(cat);

}


function logout()
{
 $.getJSON("logout.php",function(data){
	if(data.success==1)
		window.location="index.html";
		localStorage.clear();
	});

}


function signUp()
{




var signUp=`<div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Sign Up</h4>
      </div>
      <div class="modal-body">
       <form action="signUp.php" method="post">
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" class="form-control" id="email" name="email" placeholder="Email" required autofocus>
  </div>
  <div id="formGroup" class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" class="form-control" id="passwd" name="passwd" placeholder="Password" required>
  
     <label >Country </label> <select class="form-control" id="country" name="country">
<option value="">Country...</option>
<option value="AF">Afghanistan</option>
<option value="AL">Albania</option>
<option value="DZ">Algeria</option>
<option value="AS">American Samoa</option>
<option value="AD">Andorra</option>
<option value="AG">Angola</option>
<option value="AI">Anguilla</option>
<option value="AG">Antigua &amp; Barbuda</option>
<option value="AR">Argentina</option>
<option value="AA">Armenia</option>
<option value="AW">Aruba</option>
<option value="AU">Australia</option>
<option value="AT">Austria</option>
<option value="AZ">Azerbaijan</option>
<option value="BS">Bahamas</option>
<option value="BH">Bahrain</option>
<option value="BD">Bangladesh</option>
<option value="BB">Barbados</option>
<option value="BY">Belarus</option>
<option value="BE">Belgium</option>
<option value="BZ">Belize</option>
<option value="BJ">Benin</option>
<option value="BM">Bermuda</option>
<option value="BT">Bhutan</option>
<option value="BO">Bolivia</option>
<option value="BL">Bonaire</option>
<option value="BA">Bosnia &amp; Herzegovina</option>
<option value="BW">Botswana</option>
<option value="BR">Brazil</option>
<option value="BC">British Indian Ocean Ter</option>
<option value="BN">Brunei</option>
<option value="BG">Bulgaria</option>
<option value="BF">Burkina Faso</option>
<option value="BI">Burundi</option>
<option value="KH">Cambodia</option>
<option value="CM">Cameroon</option>
<option value="CA">Canada</option>
<option value="IC">Canary Islands</option>
<option value="CV">Cape Verde</option>
<option value="KY">Cayman Islands</option>
<option value="CF">Central African Republic</option>
<option value="TD">Chad</option>
<option value="CD">Channel Islands</option>
<option value="CL">Chile</option>
<option value="CN">China</option>
<option value="CI">Christmas Island</option>
<option value="CS">Cocos Island</option>
<option value="CO">Colombia</option>
<option value="CC">Comoros</option>
<option value="CG">Congo</option>
<option value="CK">Cook Islands</option>
<option value="CR">Costa Rica</option>
<option value="CT">Cote D'Ivoire</option>
<option value="HR">Croatia</option>
<option value="CU">Cuba</option>
<option value="CB">Curacao</option>
<option value="CY">Cyprus</option>
<option value="CZ">Czech Republic</option>
<option value="DK">Denmark</option>
<option value="DJ">Djibouti</option>
<option value="DM">Dominica</option>
<option value="DO">Dominican Republic</option>
<option value="TM">East Timor</option>
<option value="EC">Ecuador</option>
<option value="EG">Egypt</option>
<option value="SV">El Salvador</option>
<option value="GQ">Equatorial Guinea</option>
<option value="ER">Eritrea</option>
<option value="EE">Estonia</option>
<option value="ET">Ethiopia</option>
<option value="FA">Falkland Islands</option>
<option value="FO">Faroe Islands</option>
<option value="FJ">Fiji</option>
<option value="FI">Finland</option>
<option value="FR">France</option>
<option value="GF">French Guiana</option>
<option value="PF">French Polynesia</option>
<option value="FS">French Southern Ter</option>
<option value="GA">Gabon</option>
<option value="GM">Gambia</option>
<option value="GE">Georgia</option>
<option value="DE">Germany</option>
<option value="GH">Ghana</option>
<option value="GI">Gibraltar</option>
<option value="GB">Great Britain</option>
<option value="GR">Greece</option>
<option value="GL">Greenland</option>
<option value="GD">Grenada</option>
<option value="GP">Guadeloupe</option>
<option value="GU">Guam</option>
<option value="GT">Guatemala</option>
<option value="GN">Guinea</option>
<option value="GY">Guyana</option>
<option value="HT">Haiti</option>
<option value="HW">Hawaii</option>
<option value="HN">Honduras</option>
<option value="HK">Hong Kong</option>
<option value="HU">Hungary</option>
<option value="IS">Iceland</option>
<option value="IN">India</option>
<option value="ID">Indonesia</option>
<option value="IA">Iran</option>
<option value="IQ">Iraq</option>
<option value="IR">Ireland</option>
<option value="IM">Isle of Man</option>
<option value="IL">Israel</option>
<option value="IT">Italy</option>
<option value="JM">Jamaica</option>
<option value="JP">Japan</option>
<option value="JO">Jordan</option>
<option value="KZ">Kazakhstan</option>
<option value="KE">Kenya</option>
<option value="KI">Kiribati</option>
<option value="NK">Korea North</option>
<option value="KS">Korea South</option>
<option value="KW">Kuwait</option>
<option value="KG">Kyrgyzstan</option>
<option value="LA">Laos</option>
<option value="LV">Latvia</option>
<option value="LB">Lebanon</option>
<option value="LS">Lesotho</option>
<option value="LR">Liberia</option>
<option value="LY">Libya</option>
<option value="LI">Liechtenstein</option>
<option value="LT">Lithuania</option>
<option value="LU">Luxembourg</option>
<option value="MO">Macau</option>
<option value="MK">Macedonia</option>
<option value="MG">Madagascar</option>
<option value="MY">Malaysia</option>
<option value="MW">Malawi</option>
<option value="MV">Maldives</option>
<option value="ML">Mali</option>
<option value="MT">Malta</option>
<option value="MH">Marshall Islands</option>
<option value="MQ">Martinique</option>
<option value="MR">Mauritania</option>
<option value="MU">Mauritius</option>
<option value="ME">Mayotte</option>
<option value="MX">Mexico</option>
<option value="MI">Midway Islands</option>
<option value="MD">Moldova</option>
<option value="MC">Monaco</option>
<option value="MN">Mongolia</option>
<option value="MS">Montserrat</option>
<option value="MA">Morocco</option>
<option value="MZ">Mozambique</option>
<option value="MM">Myanmar</option>
<option value="NA">Nambia</option>
<option value="NU">Nauru</option>
<option value="NP">Nepal</option>
<option value="AN">Netherland Antilles</option>
<option value="NL">Netherlands (Holland, Europe)</option>
<option value="NV">Nevis</option>
<option value="NC">New Caledonia</option>
<option value="NZ">New Zealand</option>
<option value="NI">Nicaragua</option>
<option value="NE">Niger</option>
<option value="NG">Nigeria</option>
<option value="NW">Niue</option>
<option value="NF">Norfolk Island</option>
<option value="NO">Norway</option>
<option value="OM">Oman</option>
<option value="PK">Pakistan</option>
<option value="PW">Palau Island</option>
<option value="PS">Palestine</option>
<option value="PA">Panama</option>
<option value="PG">Papua New Guinea</option>
<option value="PY">Paraguay</option>
<option value="PE">Peru</option>
<option value="PH">Philippines</option>
<option value="PO">Pitcairn Island</option>
<option value="PL">Poland</option>
<option value="PT">Portugal</option>
<option value="PR">Puerto Rico</option>
<option value="QA">Qatar</option>
<option value="ME">Republic of Montenegro</option>
<option value="RS">Republic of Serbia</option>
<option value="RE">Reunion</option>
<option value="RO">Romania</option>
<option value="RU">Russia</option>
<option value="RW">Rwanda</option>
<option value="NT">St Barthelemy</option>
<option value="EU">St Eustatius</option>
<option value="HE">St Helena</option>
<option value="KN">St Kitts-Nevis</option>
<option value="LC">St Lucia</option>
<option value="MB">St Maarten</option>
<option value="PM">St Pierre &amp; Miquelon</option>
<option value="VC">St Vincent &amp; Grenadines</option>
<option value="SP">Saipan</option>
<option value="SO">Samoa</option>
<option value="AS">Samoa American</option>
<option value="SM">San Marino</option>
<option value="ST">Sao Tome &amp; Principe</option>
<option value="SA">Saudi Arabia</option>
<option value="SN">Senegal</option>
<option value="RS">Serbia</option>
<option value="SC">Seychelles</option>
<option value="SL">Sierra Leone</option>
<option value="SG">Singapore</option>
<option value="SK">Slovakia</option>
<option value="SI">Slovenia</option>
<option value="SB">Solomon Islands</option>
<option value="OI">Somalia</option>
<option value="ZA">South Africa</option>
<option value="ES">Spain</option>
<option value="LK">Sri Lanka</option>
<option value="SD">Sudan</option>
<option value="SR">Suriname</option>
<option value="SZ">Swaziland</option>
<option value="SE">Sweden</option>
<option value="CH">Switzerland</option>
<option value="SY">Syria</option>
<option value="TA">Tahiti</option>
<option value="TW">Taiwan</option>
<option value="TJ">Tajikistan</option>
<option value="TZ">Tanzania</option>
<option value="TH">Thailand</option>
<option value="TG">Togo</option>
<option value="TK">Tokelau</option>
<option value="TO">Tonga</option>
<option value="TT">Trinidad &amp; Tobago</option>
<option value="TN">Tunisia</option>
<option value="TR">Turkey</option>
<option value="TU">Turkmenistan</option>
<option value="TC">Turks &amp; Caicos Is</option>
<option value="TV">Tuvalu</option>
<option value="UG">Uganda</option>
<option value="UA">Ukraine</option>
<option value="AE">United Arab Emirates</option>
<option value="GB">United Kingdom</option>
<option value="US">United States of America</option>
<option value="UY">Uruguay</option>
<option value="UZ">Uzbekistan</option>
<option value="VU">Vanuatu</option>
<option value="VS">Vatican City State</option>
<option value="VE">Venezuela</option>
<option value="VN">Vietnam</option>
<option value="VB">Virgin Islands (Brit)</option>
<option value="VA">Virgin Islands (USA)</option>
<option value="WK">Wake Island</option>
<option value="WF">Wallis &amp; Futana Is</option>
<option value="YE">Yemen</option>
<option value="ZR">Zaire</option>
<option value="ZM">Zambia</option>
<option value="ZW">Zimbabwe</option>
      </select>
  </div>
  <button name="submit" id="submit" type="submit" class="btn btn-default">Sign Up</button>
        </form>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
`;
document.getElementById('loginModal').innerHTML=signUp;
}

