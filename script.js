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

// Puntatore input ricerca
const input = document.getElementById('searchField');

// Bottone per svuotare carrello
const clearCart = document.getElementById('clear');

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


            // aggiunta elemento al carrello  
            const addCart = card.querySelector('.btn-buy');
                addCart.addEventListener('click', function (event) {
                    event.preventDefault(); // Previeni il comportamento predefinito del link
                    const titolo = book.title;
                    const prezzo = book.price;

                    if (!cart.find(item => item.title === titolo)) {
                        cart.push({title: titolo, price: prezzo});  

                        const cartResult = document.createElement('div');
                        cartResult.classList.add('carrello');
                        cartResult.innerHTML = `
                            <div class="carrello-item d-flex align-items-center">
                                <h5 class="card-title me-2">${book.title}</h5>
                                <p class="card-text m-0 me-3">Prezzo: ${book.price}</p>
                                <button class="btn btn-secondary btn-danger"><i class="bi bi-x-lg"></i></button>
                            </div>
                            `;    
    
                        card.style.border = "1px solid red";
                        cartContainer.appendChild(cartResult);
                    }

                });

                // rimuovozione elemento dal carrello
                const bottoneRemove = card.querySelector('.btn-remove');
                bottoneRemove.addEventListener('click', (event) => {
                    event.preventDefault();
                    const titolo = book.title;
                    const prezzo = book.price;
                    const carrello = document.querySelectorAll('.carrello');
                    carrello.forEach(carrelloSingolo => {
                        if (carrelloSingolo.querySelector('.card-title').textContent === titolo) {
                            carrelloSingolo.remove();
                            card.style.border = "none";
                            const index = cart.findIndex(item => item.title === titolo);
                            if (index !== -1) {
                                cart.splice(index, 1);
                            }
                        }
                    })
                    
                })

                // svuota carrello con bottone
                clearCart.addEventListener('click', () => {
                    cartContainer.innerHTML = '';
                    card.style.border = 'none';
                })

                // Aggiungi un listener per l'evento input sull'elemento di ricerca
                searchField.addEventListener("input", function () {
                    // Ottieni il valore dell'input di ricerca e convertilo in minuscolo
                    const searchTerm = searchField.value.toLowerCase().trim();

                    // Filtra i libri in base al termine di ricerca
                    const filteredBooks = data.filter((book) =>
                        book.title.toLowerCase().includes(searchTerm)
                    );

                    // Esegui la funzione searchResults solo se la lunghezza del termine di ricerca è almeno 1
                    if (searchTerm.length >= 1) {
                        searchResults(filteredBooks);
                    }
                });

                // Funzione per visualizzare i risultati della ricerca
                function searchResults(books) {
                    booksContainer.innerHTML = ""; // Rimuovi tutte le card esistenti prima di visualizzare i nuovi risultati

                    // Ciclo sui libri filtrati e crea una card per ciascuno di essi
                    books.forEach((book) => {
                        const card = document.createElement("div");
                        card.classList.add("col");

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

                        // Aggiungi la card al contenitore
                        booksContainer.appendChild(card);
    });
}
        });
    })    
});



// function search() {
//     // Ottieni il valore dell'input di ricerca
//     const input = document.getElementById('searchField').value.toLowerCase();

//     fetch(url)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Errore nella richiesta');
//             }
//             return response.json();
//         })
//         .then(data => {
//             // Svuota il contenitore dei libri prima di aggiungere i risultati della ricerca
//             booksContainer.innerHTML = '';

//             // Filtra i libri in base al titolo che contiene la stringa di ricerca
//             const filteredBooks = data.filter(book => book.title.toLowerCase().includes(input));

//             // Mostra i libri filtrati nel contenitore dei libri
//             filteredBooks.forEach(book => {
//                 const card = document.createElement("div");
//                 card.classList.add("col", "d-flex");

//                 card.innerHTML = `
//                     <div class="card">
//                         <img src="${book.img}" class="card-img-top" alt="${book.name}">
//                         <div class="card-body">
//                             <h5 class="card-title">${book.title}</h5>
//                             <p class="card-text">Prezzo: ${book.price}</p>
//                             <button class="btn btn-danger btn-buy">Acquista</button>
//                             <button class="btn btn-secondary btn-remove" onclick = "removeButton()">Remove</button>
//                         </div>
//                     </div>
//                 `;

//                 booksContainer.appendChild(card);

//             });
//         })
//         .catch(error => console.error('Errore durante la ricerca dei libri:', error));
// }








