//nb: API_KEY is imported from config.js by the html file.
console.log("apiKey:", apiKey)
const main = document.querySelector('main');

window.addEventListener('load', e => {
    updateNews();
});


async function updateNews() {
    const res = await fetch('https://newsapi.org/v1/articles?source=techcrunch&apiKey='.concat(apiKey))
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
