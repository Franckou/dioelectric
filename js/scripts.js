const flagsElements = document.getElementById("flags");

const changeLanguage = async (language) => {
    const requestJson = await fetch(`./languages/${language}.json`);
    const texts = await requestJson.json();
    console.log(texts);
};

flagsElements.addEventListener("click", (e) => {
    const language = e.target.dataset.language || e.target.parentElement.dataset.language;
    changeLanguage(language);
});