document.addEventListener('DOMContentLoaded', async () => {
    // Detectar el idioma del navegador
    const userLanguage = navigator.language || navigator.userLanguage;
    const languageCode = userLanguage.split('-')[0]; // Obtiene el código del idioma, por ejemplo, 'es' de 'es-ES'
    
    // Determinar qué archivo JSON cargar
    let jsonFile = 'us.json'; // Archivo por defecto
    if (languageCode === 'es') {
        jsonFile = 'es.json';
    }

    // Cargar el archivo JSON
    let texts;
    try {
        const response = await fetch(`./languages/${jsonFile}`);
        if (!response.ok) {
            throw new Error(`Error fetching ${jsonFile}: ${response.statusText}`);
        }
        texts = await response.json();
        console.log('Loaded language data:', texts);
    } catch (error) {
        console.error('Error loading language file:', error);
        return;
    }

    // Actualizar el contenido de la página
    const textsToChange = document.querySelectorAll("[data-section]");

    for (const textToChange of textsToChange) {
        const section = textToChange.dataset.section;
        const value = textToChange.dataset.value;

        if (texts[section] && texts[section][value]) {
            textToChange.innerHTML = texts[section][value];
        }
    }

    // Manejo del cambio de idioma al hacer clic en las banderas
    const flagsElements = document.getElementById("flags");
    flagsElements.addEventListener("click", (e) => {
        const language = e.target.dataset.language || e.target.parentElement.dataset.language;
        if (language) {
            const selectedJsonFile = (language === 'es') ? 'es.json' : 'us.json';
            fetch(`./languages/${selectedJsonFile}`)
                .then(response => response.json())
                .then(newTexts => {
                    console.log('Loaded new language data:', newTexts);
                    for (const textToChange of textsToChange) {
                        const section = textToChange.dataset.section;
                        const value = textToChange.dataset.value;
                        if (newTexts[section] && newTexts[section][value]) {
                            textToChange.innerHTML = newTexts[section][value];
                        }
                    }
                })
                .catch(error => console.error('Error loading new language file:', error));
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const floatButton = document.querySelector('.float-button');
    const floatMenu = document.getElementById('float-menu');

    floatButton.addEventListener('click', function() {
        if (floatMenu.classList.contains('open')) {
            floatMenu.classList.remove('open');
            floatMenu.classList.add('close');
            setTimeout(() => {
                floatMenu.style.display = 'none';
            }, 300); // Duración de la animación
        } else {
            floatMenu.classList.remove('close');
            floatMenu.classList.add('open');
            floatMenu.style.display = 'flex';
        }
    });

    // Cerrar el menú cuando se haga clic fuera de él
    document.addEventListener('click', function(event) {
        if (!floatButton.contains(event.target) && !floatMenu.contains(event.target)) {
            if (floatMenu.classList.contains('open')) {
                floatMenu.classList.remove('open');
                floatMenu.classList.add('close');
                setTimeout(() => {
                    floatMenu.style.display = 'none';
                }, 300); // Duración de la animación
            }
        }
    });
});