//viene eseguito al caricamento della pagina
const loc = window.location.pathname;
const dir = loc.substring(0, loc.lastIndexOf('/'));
let path = "/config/lang.json";

const userLang = navigator.language;

if (!document.cookie) { //se non esiste un cookie
    if (userLang.startsWith("it")) { //se la lingua del browser è italiano
        document.cookie = "eng=false;path=/";
        setLanguage("it");
    } else { //altrimenti imposto in inglese
        document.cookie = "eng=true;path=/";
        setLanguage("en");
    }
} else { //se il cookie esiste
    if (document.cookie.startsWith("eng=true")) { //se indica che è stato precedentemente impostato l'inglese
        setLanguage("en"); //imposto l'inglese
    } else { //altrimenti
        setLanguage("it"); //imposto l'italiano
    }
}


// ***** //

async function setLanguage(lang) {
    const request = new Request(path);
    const response = await fetch(request);
    const text = await response.text();

    const traduzioni = JSON.parse(text);

    if (lang === "en") {
        document.cookie = "eng=true;path=/";
    } else {
        document.cookie = "eng=false;path=/";
    }

    for (let elementsByTagNameElement of document.getElementsByTagName("cambioLingua")) { //per ogni elemento <cambioLingua>
        const idEl = elementsByTagNameElement.id; //prendi l'id dell'elemento

        if (idEl === "main_lingua") { //se è il menu
            if(lang === "en") {
                elementsByTagNameElement.innerHTML = "<img src=\"/images/menu/engflag.png\">English"; //imposta il fatto che si veda la lingua inglese
            } else {
                elementsByTagNameElement.innerHTML = "<img src=\"/images/menu/itaflag.png\">Italiano"; //imposta il fatto che si veda la lingua italiana
            }
        } else {
            if(lang === "it") {//esattamente la stessa cosa del menu ma al contrario per il dropdown
                elementsByTagNameElement.innerHTML = "<a onclick=\"setLanguage('en')\"><img src=\"/images/menu/engflag.png\">English</a>";
            } else {
                elementsByTagNameElement.innerHTML = "<a onclick=\"setLanguage('it')\"><img src=\"/images/menu/itaflag.png\">Italiano</a>";
            }
        }
    }

    for (let elementsByTagNameElement of document.getElementsByTagName("traduzione")) { //per ogni elemento <traduzione>
        const idEl = elementsByTagNameElement.id; //prendi l'id dell'elemento

        let testo = traduzioni[idEl][lang]; //trova il testo tradotto dal json

        if (idEl.startsWith("titolo_")) { //se è il titolo concateno anche il tag del titolo
            testo = "<title>" + testo + "</title>";
        }

        elementsByTagNameElement.innerHTML = testo; //imposto il testo finale per quell'elemento
    }
}
