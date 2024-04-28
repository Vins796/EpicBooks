// url del sito di libri
const url = "https://striveschool-api.herokuapp.com/books";

// costante del carrello vuoto al quale andremo ad aggiungere gli articoli
const cart = [];

// Container delle card
const booksContainer = document.getElementById("booksContainer");

// Buttone per l'acquisto
const btnAcquista = document.querySelectorAll('.btn-buy');

// Contenitore del carrello
const cartContainer = document.getElementById('cartContainer');

// Funzione per mostrare i libri sul sito al caricamento della pagina
document.addEventListener("DOMContentLoaded", function() {

    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('Errore nella richiesta');
        }
        return response.json();
        })
    .then(data => {
        console.log(data);
        data.forEach(book => {
            const card = document.createElement("div");
            card.classList.add("col", "d-flex");
    
            card.innerHTML = `
              <div class="card">
                <img src="${book.img}" class="card-img-top" alt="${book.name}">
                <div class="card-body">
                  <h5 class="card-title">${book.title}</h5>
                  <p class="card-text">Prezzo: ${book.price}</p>
                  <button class="btn btn-danger btn-buy" type="button">Acquista</button>
                  <button class="btn btn-secondary btn-remove">Remove</button>
                </div>
              </div>
              `;
              
            booksContainer.appendChild(card);
              
            const addCart = card.querySelector('.btn-buy');
                addCart.addEventListener('click', function (event) {
                    event.preventDefault(); // Previeni il comportamento predefinito del link

                    const cartResult = document.createElement('div');
                    cartResult.innerHTML = `
                        Titolo: ${book.title},
                        Price: ${book.price}
                        `;


                    card.style.border = "1px solid red";
                    cartContainer.appendChild(cartResult);
                });
        });
    })    
});

// Funzione per cercare i libri in base al titolo
function search() {
    // Ottieni il valore dell'input di ricerca
    const input = document.getElementById('searchField').value.toLowerCase().trim();

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Errore nella richiesta');
            }
            return response.json();
        })
        .then(data => {
            // Svuota il contenitore dei libri prima di aggiungere i risultati della ricerca
            booksContainer.innerHTML = '';

            // Filtra i libri in base al titolo che contiene la stringa di ricerca
            const filteredBooks = data.filter(book => book.title.toLowerCase().includes(input));

            // Mostra i libri filtrati nel contenitore dei libri
            filteredBooks.forEach(book => {
                const card = document.createElement("div");
                card.classList.add("col", "d-flex");

                card.innerHTML = `
                    <div class="card">
                        <img src="${book.img}" class="card-img-top" alt="${book.name}">
                        <div class="card-body">
                            <h5 class="card-title">${book.title}</h5>
                            <p class="card-text">Prezzo: ${book.price}</p>
                            <button class="btn btn-danger btn-buy">Acquista</button>
                            <button class="btn btn-secondary btn-remove" onclick = "removeButton()">Remove</button>
                        </div>
                    </div>
                `;

                booksContainer.appendChild(card);

            });
        })
        .catch(error => console.error('Errore durante la ricerca dei libri:', error));
}








