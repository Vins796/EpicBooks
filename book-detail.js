document.addEventListener('DOMContentLoaded', () => {
    //recupero il parametro dell'URL
    const urlParam = new URLSearchParams(window.location.search);
    // estraggo il valore assegnato a bookAsin dalla Query String
    const bookAsin = urlParam.get('bookAsin');
    console.log(bookAsin); // verifico di aver preso correttamente il parametro passato

    // eseguo la fetch sul singolo elemnto
    fetch(`https://striveschool-api.herokuapp.com/books/${bookAsin}`)
        .then((response) => response.json())
        .then((book) => {
            const bookDetail = document.getElementById('bookDetail');
            bookDetail.innerHTML = `
                <div class="card">
                    <img src="${book.img}" class="card-img-top" alt="${book.asin}">
                    <div class="card-body">
                        <h5 class="card-title">${book.title}</h5>
                        <p class="card-text">Category: ${book.category}</p>
                    </div>
                </div>
            `;
        })
})