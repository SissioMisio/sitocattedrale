$(document).ready(function () {
    $(window).scroll(function () {
        if ($(window).scrollTop() > 20) { // appena scendo di poco cambia subito il colore del background del menu
            document.getElementById('cssMenu').href='cambioMenu.css'; //imposto href dell'elemento cssMenu con cambioMenu.css
        } else {
            document.getElementById('cssMenu').href='menu.css'; //imposto href dell'elemento cssMenu con menu.css
        }
    });
});
