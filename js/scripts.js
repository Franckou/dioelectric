const flagsElements = document.getElementById("flags");

const textsToChange = document.querySelectorAll("[data-section]");

const changeLanguage = async (language) => {
    const requestJson = await fetch(`./languages/${language}.json`);
    const texts = await requestJson.json();
    
    console.log(texts);

    for (const textToChange of textsToChange){
        const section = textToChange.dataset.section;
        const value = textToChange.dataset.value;
        
        textToChange.innerHTML = texts[section][value];
    }
};

flagsElements.addEventListener("click", (e) => {
    const language = e.target.dataset.language || e.target.parentElement.dataset.language;
    changeLanguage(language);
});

// Función para detectar adblocker
function detectAdblock() {
    const adBlockDetected = new Promise((resolve, reject) => {
        const testAd = document.createElement('div');
        testAd.innerHTML = '&nbsp;';
        testAd.className = 'adsbox';
        document.body.appendChild(testAd);
        window.setTimeout(() => {
            if (testAd.offsetHeight === 0) {
                resolve(true);
            } else {
                resolve(false);
            }
            testAd.remove();
        }, 100);
    });

    return adBlockDetected;
}

// Usar la función para mostrar notificación
detectAdblock().then((adBlockDetected) => {
    if (adBlockDetected) {
        alert('Parece que estás usando un adblocker. Por favor, considera desactivarlo en nuestro sitio para una mejor experiencia :)');
    }
});