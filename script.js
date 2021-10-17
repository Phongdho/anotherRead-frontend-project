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
    console.log(typeof allData, allData);
    bookData = allData.results.books;
    const cardOutput = bookData.map((item, index) => {
        return renderBook(item, index);
    });
    cardHTML.innerHTML = cardOutput.join("");
}
fetchAsync();


function renderBook (item, index) {
    return `
    <div class="col"
        <div class="card-main h-100">
        <a href="page-${index}/book.html"><img src="${item.book_image}" class="card-img-top" alt="${item.title}" /></a>
            <div class="card-body">
                <h5 class="card-title">${item.title}</h5>
                <h6 class="card-author">&#9998; ${item.author}</h6>
                <p class="card-text">${item.description}</p>
            </div>
        </div>
    </div>
    `;
};

//Search API-rendered data on the landing page 
const searchBox = document.getElementById("search-box");
const searchButton = document.getElementById("search-btn");

const handleSearch = (e) => {
    e.preventDefault(); //Using server rendering option
    const titleQuery = searchBox.value;
    const searchData = bookData.filter((e) => e.title === titleQuery || e.author === titleQuery);
    const searchValue = searchData.map((item) => {
        return `
        <div class="col"
            <div class="card-main h-100">
                <img src="${item.book_image}" class="card-img-top" alt="${item.title}" />
                <div class="card-body">
                    <h5 class="card-title">${item.title}</h5>
                    <h6 class="card-author"><em>by</em> ${item.author}</h6>
                    <p class="card-text">${item.description}</p>
                </div>
            </div>
        </div>`;
    });
    cardHTML.innerHTML = searchValue.join("");
};
searchButton.addEventListener("click", handleSearch);
