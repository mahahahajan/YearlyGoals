var myNodelist = document.getElementsByClassName("LI");
var i;
var size = 70;
var modifier = 1.014285714;
var paddingTop = 10;
var theme = 0;
var authenticated = false;
document.documentElement.style.setProperty('--size', size + 'px');
document.documentElement.style.setProperty('--modifier', modifier);
document.documentElement.style.setProperty('--paddingTop', paddingTop + 'px');
// for (i = 0; i < myNodelist.length; i++) {
//   var span = document.createElement("SPAN");
//   var txt = document.createTextNode("\u00D7");
//   span.style.fontSize = "70px";
//   span.className = "close";
//   span.appendChild(txt);
//   myNodelist[i].appendChild(span);
// }

// Click on a close button to hide the current list item
//Populate page with the right tasks 
$(document).ready(function(){
  firebase.database().ref().on('value',(snap)=>{
    var totalRecord =  snap.numChildren();
    for(var i = 1; i < totalRecord+1; i++){
      var taskObject = snap.child(i).val();
      var task = Object.keys(taskObject)[0];
      var taskDone = Object.values(taskObject)[0];
      $(".list").append("<li>" + task + "</li>");
      
    }
  });

});


var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function () {
    var div = this.parentElement;
    div.style.display = "none";
  }
}
var year = (new Date().getYear()) + 1900;
document.title = "My Todo " + year;
document.getElementById("year").textContent = year;
// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function (ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}

$("#zoomIn").on('click', function () {
  size += 10;
  paddingTop += 4;
  document.documentElement.style.setProperty('--size', size + 'px');
  document.documentElement.style.setProperty('--paddingTop', paddingTop + 'px');
});

$("#zoomOut").on('click', function () {
  size -= 10;
  paddingTop -= 4;
  document.documentElement.style.setProperty('--size', size + 'px');
  document.documentElement.style.setProperty('--paddingTop', paddingTop + 'px');
});

$("#theme").on('click', function () {
  if (theme == 0) { //llight mode to switch into dark mode 
    console.log("HELLO");
    $("document").css("background-color", "#1F2024");
    $("#paper").css("background-color", "#1F2024");
    $("#pattern").css("background-image", "repeating-linear-gradient(#1F2024 0px, #1F2024 calc(var(--size) - 1px), #068A82 var(--size))");
    $("#pattern").css("color", "white");
    $(".settings").css("background-color", "white");
    $(".settings").css("color", "black");

    $(".fab_buttons a").css("background-color", "white");
    $(".fab_buttons a").css("color", "black");

    theme++;
  }
  else {
    console.log("HELLO");
    $("document").css("background-color", "white");
    $("#paper").css("background-color", "white");
    $("#pattern").css("background-image", "repeating-linear-gradient(white 0px, white calc(var(--size) - 1px), teal var(--size))");
    $("#pattern").css("color", "black");

    $(".settings").css("background-color", "black");
    $(".settings").css("color", "white");

    $(".fab_buttons a").css("background-color", "black");
    $(".fab_buttons a").css("color", "white");
    theme = 0;
  }
});

$("#edit").on('click', function () {
  $(".overlay").slideDown("slow");
});

$(".x").on('click', function () {
  $(".overlay").slideUp("slow");
});

$("#passwordInput").bind("enterKey", function (e) {
  //do stuff here
  var storageRef = firebase.storage().ref();
  var thisRef = storageRef.child("resolutionPassword.txt");
  thisRef.getDownloadURL().then(function (value) {
    var pass = readTextFile(value);
    if($("#passwordInput").val() == pass){
      authenticated = true;
      alert("Signed in");
      $(".overlay").slideUp("slow");
    }
    
  });
});

$("#passwordInput").keyup(function (e) {
  if (e.keyCode == 13) {
    console.log("TEST");
    $(this).trigger("enterKey");

  }
});

function readTextFile(file) {
  var allText; 
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", file, false);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status == 0) {
        allText = rawFile.responseText;
        // console.log(allText);
        
      }
    }
  }
  rawFile.send(null);
  return allText;
}