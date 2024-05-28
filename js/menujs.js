$(document).ready(function () {
    $(window).scroll(function () {
        if ($(window).scrollTop() > 20) { // appena scendo di poco cambia subito il colore del background del menu
            document.getElementById('cssCambioMenu').href='/css/cambioMenu.css'; //imposto href dell'elemento cssMenu con cambioMenu.css
        } else {
            document.getElementById('cssCambioMenu').href='/css/preCambioMenu.css'; //imposto href dell'elemento cssMenu con preCambioMenu.css
        }
    });
});
