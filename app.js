let trades = JSON.parse(localStorage.getItem("trades")) || [];

function login(){

let u=document.getElementById("user").value;
let p=document.getElementById("pass").value;

if(u && p){

document.getElementById("login").style.display="none";
document.getElementById("app").style.display="block";

loadDashboard();

}

}

function addTrade(){

let pair=document.getElementById("pair").value;
let entry=Number(document.getElementById("entry").value);
let exit=Number(document.getElementById("exit").value);
let size=Number(document.getElementById("size").value);
let note=document.getElementById("note").value;

let profit=(exit-entry)*size;

let trade={
pair,entry,exit,size,note,profit,
date:new Date().toLocaleDateString()
};

trades.push(trade);

localStorage.setItem("trades",JSON.stringify(trades));

loadDashboard();

}

function loadDashboard(){

let total=trades.length;

let wins=trades.filter(t=>t.profit>0).length;

let winrate=total?((wins/total)*100).toFixed(2):0;

let totalProfit=trades.reduce((a,b)=>a+b.profit,0);

document.getElementById("total").innerText=total;

document.getElementById("profit").innerText=totalProfit;

document.getElementById("winrate").innerText=winrate;

drawCharts();

loadHistory();

}

function loadHistory(){

let list=document.getElementById("history");

list.innerHTML="";

trades.forEach(t=>{

let li=document.createElement("li");

li.innerText=`${t.date} | ${t.pair} | P/L ${t.profit}`;

list.appendChild(li);

});

}

function drawCharts(){

let profits=trades.map(t=>t.profit);

let labels=trades.map((_,i)=>"T"+(i+1));

new Chart(document.getElementById("barChart"),{

type:'bar',

data:{
labels:labels,
datasets:[{label:"Profit/Loss",data:profits}]
}

});

let equity=[];

profits.reduce((a,b,i)=>equity[i]=a+b,0);

new Chart(document.getElementById("equityChart"),{

type:'line',

data:{
labels:labels,
datasets:[{label:"Equity Curve",data:equity}]
}

});

}

if ('serviceWorker' in navigator) {
navigator.serviceWorker.register('service-worker.js');
  }
