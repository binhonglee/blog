var xmlHttp = new XMLHttpRequest();
xmlHttp.open("GET", "https://binhong.me/newsletter/secret", false);
xmlHttp.send();
document.getElementById("secret").value =  xmlHttp.responseText;
