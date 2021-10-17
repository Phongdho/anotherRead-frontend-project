const API_KEY = "H6PdARP2pbEwHjkm6Rrxiw96MaSZ6qIB";
const baseURL = "https://api.nytimes.com/svc/books/v3";
let path = "/lists/current/hardcover-fiction.json";
const query = `?api-key=${API_KEY}`;
const url = baseURL + path + query;

const cardHTML = document.getElementById("card-group");

//Fetch data 
const fetchAsync = async () => {
    let response = await fetch(url);
    let allData = await response.json();
    // console.log(typeof allData, allData);
    let bookData = allData.results.books;
    let eachBook = bookData[3];
    console.log(eachBook);
    function cardOutput () {
            return `
            <div class="col">
            <div class="card-main h-100">
            <div class="main-left">
            <h5 class="card-rank">Currently ranked #4 on NYTimes</h5>
            <img src="${eachBook.book_image}" class="card-img-top" alt="${eachBook.title}"/>
            </div>
            <div class="card-body">
                <h3 class="card-title">${eachBook.title}</h3>
                <h5 class="card-author">Author: ${eachBook.author}</h5>
                <p class="card-publisher"><strong>Publisher:</strong> ${eachBook.publisher}</p>
                <p class="card-id"><strong>ISBN:</strong> ${eachBook.primary_isbn13}</p>
                <p class="card-text"><strong>Description:</strong> ${eachBook.description}</p>
                <p class="card-buy"><strong>Get your copy:</strong> <a href="${eachBook.amazon_product_url}">Amazon</a></p>
            </div>
            </div>
            </div>
            `;
    };
    // console.log(cardHTML);
    cardHTML.innerHTML = cardOutput();
    };

fetchAsync();

