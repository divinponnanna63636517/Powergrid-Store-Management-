let products=JSON.parse(localStorage.getItem("products"))||[];

let history=JSON.parse(localStorage.getItem("history"))||[];

function save(){

localStorage.setItem("products",JSON.stringify(products));

localStorage.setItem("history",JSON.stringify(history));

}

function addProduct(){

let name=document.getElementById("name").value;

let desc=document.getElementById("desc").value;

let qty=parseInt(document.getElementById("qty").value);

if(name==""||qty<=0)return;

let existing=products.find(x=>x.name.toLowerCase()==name.toLowerCase());

if(existing){

existing.qty+=qty;

}

else{

products.push({

name:name,

desc:desc,

qty:qty

});

}

save();

displayProducts();

}

function displayProducts(){

let search=document.getElementById("search").value.toLowerCase();

let table=document.getElementById("table");

table.innerHTML="";

products.filter(x=>x.name.toLowerCase().includes(search))

.forEach(p=>{

table.innerHTML+=`

<tr>

<td>${p.name}</td>

<td>${p.desc}</td>

<td>${p.qty}</td>

</tr>

`;

});

displayHistory();

}

function issueProduct(){

let product=document.getElementById("searchIssue").value.toLowerCase();

let qty=parseInt(document.getElementById("issueQty").value);

let reason=document.getElementById("reason").value;

let item=products.find(x=>x.name.toLowerCase()==product);

if(!item){

alert("Product Not Found");

return;

}

if(item.qty<qty){

alert("Insufficient Quantity");

return;

}

item.qty-=qty;

history.push({

name:item.name,

qty:qty,

reason:reason,

date:new Date().toLocaleString()

});

save();

displayProducts();

}

function displayHistory(){

let h=document.getElementById("history");

h.innerHTML="";

history.forEach(i=>{

h.innerHTML+=`

<tr>

<td>${i.name}</td>

<td>${i.qty}</td>

<td>${i.reason}</td>

<td>${i.date}</td>

</tr>

`;

});

}

displayProducts();
