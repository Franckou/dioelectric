document.addEventListener('DOMContentLoaded', () => {
    const userLanguage = navigator.language || navigator.userLanguage;
    const languageCode = userLanguage.split('-')[0];
    const jsonFile = languageCode === 'es' ? 'es.json' : 'us.json';

    const loadLanguageFile = async (file) => {
        try {
            const response = await fetch(`./languages/${file}`);
            if (!response.ok) {
                throw new Error(`Error fetching ${file}: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error loading language file:', error);
        }
    };

    const updatePageContent = (texts) => {
        const textsToChange = document.querySelectorAll("[data-section]");
        textsToChange.forEach(textToChange => {
            const section = textToChange.dataset.section;
            const value = textToChange.dataset.value;
            if (texts[section] && texts[section][value]) {
                textToChange.innerHTML = texts[section][value];
            }
        });
    };

    const initializeLanguage = async () => {
        const texts = await loadLanguageFile(jsonFile);
        if (texts) {
            updatePageContent(texts);
        }
    };

    const setupLanguageChange = () => {
        const flagsElements = document.getElementById("flags");
        flagsElements.addEventListener("click", async (e) => {
            const language = e.target.dataset.language || e.target.parentElement.dataset.language;
            if (language) {
                const selectedJsonFile = language === 'es' ? 'es.json' : 'us.json';
                const newTexts = await loadLanguageFile(selectedJsonFile);
                if (newTexts) {
                    updatePageContent(newTexts);
                }
            }
        });
    };

    const setupFloatMenu = () => {
        const floatButton = document.querySelector('.float-button');
        const floatMenu = document.getElementById('float-menu');

        const toggleMenu = () => {
            if (floatMenu.classList.contains('open')) {
                floatMenu.classList.remove('open');
                floatMenu.classList.add('close');
                requestAnimationFrame(() => {
                    floatMenu.style.display = 'none';
                });
            } else {
                floatMenu.classList.remove('close');
                floatMenu.classList.add('open');
                floatMenu.style.display = 'flex';
            }
        };

        if (floatButton && floatMenu) {
            floatButton.addEventListener('click', toggleMenu);
            document.addEventListener('click', (event) => {
                if (!floatButton.contains(event.target) && !floatMenu.contains(event.target)) {
                    if (floatMenu.classList.contains('open')) {
                        toggleMenu();
                    }
                }
            });
        }
    };

    const setupReadMoreButtons = () => {
        const sections = document.querySelectorAll('.materias');
        sections.forEach(section => {
            const content = section.querySelector('.contenido-materias');
            const button = section.querySelector('.boton-leer-mas');
            const text = content.querySelector('.texto-materias');

            if (text.scrollHeight > content.clientHeight) {
                button.style.display = 'block';
            } else {
                button.style.display = 'none';
            }

            button.addEventListener('click', () => {
                if (content.classList.contains('expanded')) {
                    content.classList.remove('expanded');
                    content.style.maxHeight = 'auto';
                    button.textContent = 'Leer más';
                } else {
                    content.classList.add('expanded');
                    content.style.maxHeight = text.scrollHeight;
                    button.textContent = 'Leer menos';
                }
            });
        });
    };

    // Inicializar funcionalidades
    initializeLanguage();
    setupLanguageChange();
    setupFloatMenu();
    setupReadMoreButtons();
});
