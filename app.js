//nb: API_KEY is imported from config.js by the html file.
console.log("apiKey:", apiKey)
const main = document.querySelector('main');
const sourceSelector = document.querySelector('#sources');
//const defaultSource = 'the-washington-post';
const defaultSource = 'reuters';

window.addEventListener('load', async e => {
    updateNews();
    await updateSources();
    sourceSelector.value = defaultSource;
    sourceSelector.addEventListener('change', evt => {
        updateNews(evt.target.value);
    });
});

if ('serviceWorker' in navigator) {
    try {
        navigator.serviceWorker.register('sw.js');
        //nb: must be in same dir as app.js
        console.log("service worker registered.");
    } catch (error) {
        console.log("service worker registration failed.");
    }
}

async function updateSources() {
    const res = await fetch('https://newsapi.org/v1/sources')
    const json = await res.json();
    sourceSelector.innerHTML = json.sources
        .map(source => `<option value="${source.id}">${source.name}</option>`)
        .join('\n');
}

async function updateNews(source = defaultSource) {
    const res = await fetch('https://newsapi.org/v1/articles?source='.concat(source, '&apiKey=', apiKey))
    const json = await res.json();
    main.innerHTML = json.articles.map(createArticle).join('\n');
}

function createArticle(article){
    return `
        <div class="article">
          <a href="${article.url}">
            <h2>${article.title}</h2>
            <img src="${article.urlToImage}" alt="${article.title}">
            <p>${article.description}</p>
          </a>
        </div>
      `;
}
