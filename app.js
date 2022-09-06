'use strict'

const calcbtn = document.getElementById("calc");
const resetbtn = document.getElementById("reset");
const addbtn = document.getElementById("add");

let armylist = [];

calcbtn.addEventListener("click", gettotal);
resetbtn.addEventListener("click", doreset);
addbtn.addEventListener("click", doadd);

function gettotal() {
    var tot = 0
    tot = tot + Number(document.getElementById("base").options[document.getElementById("base").selectedIndex].value);
    tot = tot + Number(document.getElementById("fortitude").options[document.getElementById("fortitude").selectedIndex].value);
    tot = tot + Number(document.getElementById("weapon").options[document.getElementById("weapon").selectedIndex].value);
    tot = tot + Number(document.getElementById("leader").options[document.getElementById("leader").selectedIndex].value);
    tot = tot + Number(document.getElementById("unittype").options[document.getElementById("unittype").selectedIndex].value);
    tot = tot + Number(document.getElementById("unitorg").options[document.getElementById("unitorg").selectedIndex].value);
    tot = tot + Number(document.getElementById("leader").options[document.getElementById("leader").selectedIndex].value);

    
    //plus 5
    if (document.getElementById("veteran").checked) {tot = tot + Number(document.getElementById("veteran").value)}
    if (document.getElementById("combined").checked) {tot = tot + Number(document.getElementById("combined").value)}
    if (document.getElementById("parthian").checked) {tot = tot + Number(document.getElementById("parthian").value)}
    if (document.getElementById("ferocious").checked) {tot = tot + Number(document.getElementById("ferocious").value)}
    
    //plus 3
    if (document.getElementById("phalanx").checked) {tot = tot + Number(document.getElementById("phalanx").value)}
    if (document.getElementById("javelins").checked) {tot = tot + Number(document.getElementById("javelins").value)}
    if (document.getElementById("warband").checked) {tot = tot + Number(document.getElementById("warband").value)}
    if (document.getElementById("shieldwall").checked) {tot = tot + Number(document.getElementById("shieldwall").value)}
    
    //Plus 10
    if (document.getElementById("fanactics").checked) {tot = tot + Number(document.getElementById("fanactics").value)}

    //display total
    document.getElementById("unitcost").innerHTML = tot
}

function doreset(){

    //Dropdowns
    document.getElementById("base").selectedIndex = 0;
    document.getElementById("fortitude").selectedIndex = 0;
    document.getElementById("weapon").selectedIndex = 0;
    document.getElementById("leader").selectedIndex = 0;
    document.getElementById("unittype").selectedIndex = 0;
    document.getElementById("unitorg").selectedIndex = 0;
    document.getElementById("leader").selectedIndex = 0;
    
    //Plus 5
    document.getElementById("veteran").checked = false;
    document.getElementById("combined").checked = false;
    document.getElementById("parthian").checked = false;
    document.getElementById("ferocious").checked = false;
    
    //plus 3
    document.getElementById("phalanx").checked = false;
    document.getElementById("javelins").checked = false;
    document.getElementById("warband").checked = false;
    document.getElementById("shieldwall").checked = false;
    
    //Plus 10
    document.getElementById("fanactics").checked = false;

    //Reset total to 0
    document.getElementById("unitcost").innerHTML = 0

    //name
    document.getElementById("unitname").innerHTML = ""
}

function deleteRow(row)
{
    var i=row.parentNode.parentNode.rowIndex;
    document.querySelector("table").deleteRow(i);
    armylist.splice(i-1, 1);
    calctotal();
}

function generateTableHead(table, data) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of data) {
      let th = document.createElement("th");
      let text = document.createTextNode(key);
      th.appendChild(text);
      row.appendChild(th);
    }
  }

  
  function generateTable(table, data) {
    for (let element of data) {
      let row = table.insertRow();
      for (const key in element) {
        let cell = row.insertCell();
        let text = document.createTextNode(element[key]);
        cell.appendChild(text);
      }
      let btncell = row.insertCell();
      btncell.innerHTML = "<button onclick='deleteRow(this)'>X</button>";
    }
  }


 
function getarmy() {
    var army = {};
    var special = "";
    army.unitcost = document.getElementById("unitcost").innerHTML;
    army.unitname = document.getElementById("unitname").value;
    army.base = document.getElementById("base").options[document.getElementById("base").selectedIndex].text
    army.fortitude = document.getElementById("fortitude").options[document.getElementById("fortitude").selectedIndex].text
    army.weapon = document.getElementById("weapon").options[document.getElementById("weapon").selectedIndex].text
    army.leader = document.getElementById("leader").options[document.getElementById("leader").selectedIndex].text
    army.unittype = document.getElementById("unittype").options[document.getElementById("unittype").selectedIndex].text
    army.unitorg = document.getElementById("unitorg").options[document.getElementById("unitorg").selectedIndex].text
    army.leader = document.getElementById("leader").options[document.getElementById("leader").selectedIndex].text
    
    if (document.getElementById("veteran").checked) {special = special + "veteran "};
    if (document.getElementById("combined").checked) {special = special + "combined "}
    if (document.getElementById("parthian").checked) {special = special + "parthian "}
    if (document.getElementById("ferocious").checked) {special = special + "ferocious "}
    
    //plus 3
    if (document.getElementById("phalanx").checked) {special = special + "phalanx "}
    if (document.getElementById("javelins").checked) {special = special + "javelins "}
    if (document.getElementById("warband").checked) {special = special + "warband "}
    if (document.getElementById("shieldwall").checked) {special = special + "shieldwall "}
    
    //Plus 10
    if (document.getElementById("fanactics").checked) {special = special + "fanactics "}

    army.special = special

    armylist.push(army)


}


function calctotal() {
  var totalcost = 0;
  for (var i = 0; i < armylist.length; i++) {
    totalcost += Number(armylist[i]["unitcost"]);
}
document.getElementById("totalcost").innerHTML = totalcost

}


function doadd(){


    gettotal()
    getarmy()
    calctotal()
    let table = document.querySelector("table");
    table.innerHTML = "";
    let data = Object.keys(armylist[0]);
    generateTable(table, armylist);
    generateTableHead(table, data);
}
