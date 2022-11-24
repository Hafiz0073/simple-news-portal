
const loadCetagories = () => {
    const url = 'https://openapi.programming-hero.com/api/news/categories'
    fetch(url)
        .then(res => res.json())
        .then(data => displayCetagories(data.data.news_category))
}
displayCetagories = categories => {
    const cetagoryLi = document.getElementById('li-item');
    categories.forEach(category => {
        // console.log(category)
        const userLi = document.createElement('li');
        userLi.classList.add('nav-item')
        userLi.innerHTML = `
             
                <a class="nav-link"  onclick="loadCatDetails('${category.category_id}')"> ${category.category_name} </a>
            `;
        cetagoryLi.append(userLi)

    });
}
const loadCatDetails = (catID) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${catID}`;
    // console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => displayCatDetails(data.data))
}
const displayCatDetails = catDetails => {
    const catDetailsDiv = document.getElementById('news-details')
    catDetailsDiv.innerHTML = '';
    catDetails.forEach(newsdetails => {
        console.log(newsdetails)
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('card')
        newsDiv.innerHTML = `
        <div class="row ">
        <div class="col-md-3 p-4">
            <img src="${newsdetails.thumbnail_url}" class="img-fluid rounded-start " alt="...">
        </div>
        <div class="col-md-9">
            <div class="card-body">
                <h5 class="card-title">${newsdetails.title}</h5>
                <p class="card-text">${newsdetails.details.slice(0, 600) + '...'}</p>
               
            </div>
            <div class="d-flex justify-content-between p-2 pt-4">
                <div class="d-flex col-md-4 " id="author">
                    <img class="rounded-circle" alt="avatar1" width="50px" height="50px"
                        src="${newsdetails.author.img}" />
                    <div class="d-flex flex-column ps-2">
                        <span class="text-muted">${newsdetails.author.name ? newsdetails.author.name : 'no data available'}</span>
                        <span class="text-muted">${newsdetails.author.published_date}</span>
                    </div>
                </div>
                <div id="viewers" class="col-md-3 d-flex">
                    <p class="text-muted fw-bold "> <i class="fa-regular fa-eye p-2"></i>${newsdetails.total_view ? newsdetails.total_view : 'no data available'}</p>
                </div>
                <div id="feedback" class="col-md-2">
                    <i class="fa-solid fa-star-half-stroke"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                </div>
                <div id="details" class="col-md-1">
                <i class="fa-solid fa-arrow-right"  data-bs-toggle="modal" data-bs-target="#newsDetailsModal"></i>
                </div>
            </div>
        </div>
        </div>
        `
        catDetailsDiv.append(newsDiv)
    })


}

loadCetagories()
loadCatDetails('02')