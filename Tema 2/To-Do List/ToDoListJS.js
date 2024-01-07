var closeList = document.getElementsByTagName("LI");
var i;
for (i = 0; i < closeList.length; i++){
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    closeList[i].appendChild(span);
}

var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++){
    close[i].onclick = function (){
        var div = this.parentElement;
        div.style.display = "none";
    }
}

var list = document.querySelector('ul');
list.addEventListener('click', function(ev){
    if (ev.target.tagName === 'LI'){
        ev.target.classList.toggle('checked');
    }
}, false);

function addElement(){
    var li = document.createElement("li");
    var inputValue = document.getElementById("taskInput").value;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === ''){
        alert("Trebuie sa scrii ceva !");
    } else {
        document.getElementById("tasks").appendChild(li);
    }
    document.getElementById("taskInput").value = "";

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    for(i = 0; i < close.length; i++){
        close[i].onclick = function (){
            var div = this.parentElement;
            div.style.display = "none";
        }
    }
}