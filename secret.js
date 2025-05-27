var xmlHttp = new XMLHttpRequest();
xmlHttp.open("GET", "http://localhost:8080/secret", false);
xmlHttp.send();
document.getElementById("secret").value =  xmlHttp.responseText;
