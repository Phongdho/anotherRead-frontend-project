const API_KEY = "H6PdARP2pbEwHjkm6Rrxiw96MaSZ6qIB";
const baseURL = "https://api.nytimes.com/svc/books/v3";
let path = "/lists/current/hardcover-fiction.json";
const query = `?api-key=${API_KEY}`;
const url = baseURL + path + query;

//fetch data 
const fetchAsync = async () => {
    let response = await fetch(url);
    let allData = await response.json();
    console.log(typeof allData, allData);
    const bookData = allData.results.books;
    const cardHTML = document.getElementById("card-group");
    const cardOutput = bookData.map((item) => {
        return renderBook(item);
    });
    cardHTML.innerHTML = cardOutput.join("");
}
fetchAsync();


function renderBook (item) {
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
    </div>
    `;
};