var query=document.getElementById('query').value;
var hostname=window.location.hostname;
$.getJSON("http://"+hostname+":9200/shopping/_search?q=Name:"+query,function(results){
console.log(results);
});

