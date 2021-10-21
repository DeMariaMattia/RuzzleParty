
let Vocali='AEIOU';
let Consonanti='BCDFGHJKLMNPQRSTVWXYZ';
const Parola="";
function RandomLettere() {
    document.getElementById("btn1").innerHTML = Vocali.charAt(Math.floor(Math.random() * Vocali.length));
    document.getElementById("btn2").innerHTML = Consonanti.charAt(Math.floor(Math.random() * Consonanti.length));
    document.getElementById("btn3").innerHTML = Vocali.charAt(Math.floor(Math.random() * Vocali.length));
    document.getElementById("btn4").innerHTML = Consonanti.charAt(Math.floor(Math.random() * Consonanti.length));
    document.getElementById("btn5").innerHTML = Vocali.charAt(Math.floor(Math.random() * Vocali.length));
    document.getElementById("btn6").innerHTML = Consonanti.charAt(Math.floor(Math.random() * Consonanti.length));
    document.getElementById("btn7").innerHTML = Vocali.charAt(Math.floor(Math.random() * Vocali.length));
    document.getElementById("btn8").innerHTML = Consonanti.charAt(Math.floor(Math.random() * Consonanti.length));
    document.getElementById("btn9").innerHTML = Vocali.charAt(Math.floor(Math.random() * Vocali.length));
    document.getElementById("btn10").innerHTML = Consonanti.charAt(Math.floor(Math.random() * Consonanti.length));
    document.getElementById("btn11").innerHTML = Vocali.charAt(Math.floor(Math.random() * Vocali.length));
    document.getElementById("btn12").innerHTML = Consonanti.charAt(Math.floor(Math.random() * Consonanti.length));
    document.getElementById("btn13").innerHTML = Vocali.charAt(Math.floor(Math.random() * Vocali.length));
    document.getElementById("btn14").innerHTML = Consonanti.charAt(Math.floor(Math.random() * Consonanti.length));
    document.getElementById("btn15").innerHTML = Vocali.charAt(Math.floor(Math.random() * Vocali.length));
    document.getElementById("btn16").innerHTML = Consonanti.charAt(Math.floor(Math.random() * Consonanti.length));

}
function Evidenzia(id) {
    alert("riga0");
    document.getElementById(id).style.background='#FF9900';
    alert("riga1");
    Parola=Parola + document.getElementById(id).value;
    alert("riga2");
    let c =  document.getElementById(id).value;
    alert("cip");
}
function returnParola()
{
    alert(Parola);
    document.getElementById("Parola").innerHTML=Parola;
}
