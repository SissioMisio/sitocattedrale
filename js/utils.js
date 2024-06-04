//viene eseguito al caricamento della pagina
const loc = window.location.pathname;
const dir = loc.substring(0, loc.lastIndexOf('/'));

//Individuazione del path di root
let rootDir = dir;
//finché il file non è null e non si arriva a / (se si arriva a / ed è comunque null, si dà errore: file non trovato!)

function urlExists(url) {
    let http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status!==404;
}

let Esiste = false;

while (!Esiste) {
    if(!urlExists(rootDir + "/_MAIN")) {
        //cancella la fine fino a quando si arriva a un altro /

        //cancella tutto quello che c'è dopo l'ultimo / (compreso lo /)
        let char = rootDir.lastIndexOf("/");
        rootDir = rootDir.substring(0, char);


        if(rootDir + "/" === "/") { //(se il rootDir diventa solo "/" allora errore)
            break;
        }
    } else {
        Esiste = true;
    }
}

if(!Esiste) {
    alert("ERRORE: Impossibile trovare la pagina principale! (sicuro di non aver cancellato \"_MAIN\"?)");
}

const path = rootDir + "/config/lang.json";
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

function goTo(where) {
    switch(where) {
        case "home":
            window.location.replace(rootDir + "/");
            break;
        case "storia":
            window.location.replace(rootDir + "/storia");
            break;
        case "struttura":
            window.location.replace(rootDir + "/struttura");
            break;

        //TODO: AGGIUSTA QUESTI!
        case "VARIE_STRUTTURE_QUI":
            alert("VARIE_STRUTTURE_QUI");
            break;
        case "VARIE_STRUTTURE_QUI2":
            alert("VARIE_STRUTTURE_QUI");
            break;
        case "VARIE_STRUTTURE_QUI3":
            alert("VARIE_STRUTTURE_QUI");
            break;
        case "VARIE_STRUTTURE_QUI4":
            alert("VARIE_STRUTTURE_QUI");
            break;
        case "opere":
            window.location.replace(rootDir + "/opere");
            break;
        case "VARIE_OPERE_QUI":
            alert("VARIE_OPERE_QUI");
            break;
        case "VARIE_OPERE_QUI2":
            alert("VARIE_OPERE_QUI");
            break;
        case "VARIE_OPERE_QUI3":
            alert("VARIE_OPERE_QUI");
            break;
        case "VARIE_OPERE_QUI4":
            alert("VARIE_OPERE_QUI");
            break;
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
                elementsByTagNameElement.innerHTML = "<img src=\"" + rootDir + "/images/menu/engflag.png\">English"; //imposta il fatto che si veda la lingua inglese
            } else {
                elementsByTagNameElement.innerHTML = "<img src=\"" + rootDir + "/images/menu/itaflag.png\">Italiano"; //imposta il fatto che si veda la lingua italiana
            }
        } else {
            if(lang === "it") {//esattamente la stessa cosa del menu ma al contrario per il dropdown
                elementsByTagNameElement.innerHTML = "<a onclick=\"setLanguage('en')\"><img src=\"" + rootDir + "/images/menu/engflag.png\">English</a>";
            } else {
                elementsByTagNameElement.innerHTML = "<a onclick=\"setLanguage('it')\"><img src=\"" + rootDir + "/images/menu/itaflag.png\">Italiano</a>";
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
