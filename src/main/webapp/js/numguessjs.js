       function reset(){
            document.getElementById("serverResponse").innerText="";
            xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange=callback;
            var url ="NumGenServlet"+"?requestRestartGame=1";
            xmlHttp.open("GET",url,true);
            xmlHttp.send();
        }

         function guess(){
             xmlHttp = new XMLHttpRequest();
             xmlHttp.onreadystatechange=callback;
             var url ="NumGenServlet"+"?requestGuessNumber="+document.getElementById("number").value;
             xmlHttp.open("GET",url,true);
             xmlHttp.send();
         }

        function guessLink(givenValue) {
            xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange=callback;
            var url ="NumGenServlet"+"?requestGuessNumber="+givenValue;
            xmlHttp.open("GET",url,true);
            xmlHttp.send();
        }

         function callback() {
             if(xmlHttp.readyState==4 && xmlHttp.status==200) {
                 var jSonMessage = JSON.parse(xmlHttp.responseText);
                 var keyRestartGame=jSonMessage.keyRestartGame;

                 document.getElementById("sicriu").style.display = "none";
                 document.getElementById("sicriuIliescu").style.display = "none";

                 if (keyRestartGame != undefined && keyRestartGame.length > 0) {
                     alert("Restart cu succes, Iliescu a inviat!");
                     document.getElementById("number").value="";
                     document.getElementById("sicriu").style.display = "none";
                     document.getElementById("sicriuIliescu").style.display = "block"
                     return;
                 }

                 var keyError = jSonMessage.keyError;
                 if (keyError != undefined && keyError.length > 0) {
                     alert("Trebuie sa introduceti un numar valid!");
                     return;
                 }
                 var keySuccess = jSonMessage.keySuccess;
                 var keyHint = jSonMessage.keyHint;
                 var keyNrGuesses = jSonMessage.keyNrGuesses;
                 var keyTime = jSonMessage.keyNrTime;

                 if(keySuccess=="false") {
                     if (keyHint == "higher") {
                         document.getElementById("serverResponse").innerHTML = "Gresit, Are mai mult de trait!";
                     }
                     else if (keyHint == "lower") {
                         document.getElementById("serverResponse").innerHTML = "Gresit, Are mai putin de trait!";
                     }
                 }
                 else
                 if(keySuccess=="true")
                 {
                     document.getElementById("serverResponse").innerHTML = "Condoleante, a murit! "
                         + document.getElementById("number").value + "Ai aflat dupa " + keyNrGuesses + " incercari"
                         + " si ti-a luat " + keyTime + " secunde";
                     document.getElementById("sicriu").style.display = "block";
                     document.getElementById("sicriuIliescu").style.display = "none"
                 }
             }
         }