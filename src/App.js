var url = "https://api.themoviedb.org/3/movie/upcoming?api_key=96ed0ec492efaa4cdc588db75acb4b37&language=pt-BR"

var nowPlaying = "https://api.themoviedb.org/3/movie/now_playing?api_key=96ed0ec492efaa4cdc588db75acb4b37&language=pt-BR&region=BR"

let popular = "https://api.themoviedb.org/3/movie/popular?api_key=96ed0ec492efaa4cdc588db75acb4b37&language=pt-BR&region=BR"

let trending = "https://api.themoviedb.org/3/trending/movie/day?api_key=96ed0ec492efaa4cdc588db75acb4b37&language=pt-BR&region=BR" 

let upcoming = "https://api.themoviedb.org/3/movie/upcoming?api_key=96ed0ec492efaa4cdc588db75acb4b37&language=pt-BR"

let tv = "https://api.themoviedb.org/3/tv/popular?api_key=96ed0ec492efaa4cdc588db75acb4b37&language=pt-BR"

// let genres = "https://api.themoviedb.org/3/genre/movie/list?api_key=96ed0ec492efaa4cdc588db75acb4b37&language=pt-BR"

let SearchCollection = "https://api.themoviedb.org/3/search/collection?api_key=96ed0ec492efaa4cdc588db75acb4b37&language=pt-BR&query="


function getUrl(url){
    let content = fetch(url).then((response) => {
                        return response.json();
                    }).then((data) => {
                        return data;
                    })
    return content;
}


//popular banner
getUrl(nowPlaying).then((data) => {
    let banner = document.getElementById("banners");


    for(let i = 0; i < 10; i++){

        backdrop_path = data.results[i].backdrop_path
        console.log(backdrop_path)

        if(i == 0){
            banner.innerHTML += `<div class="carousel-item active"><img src="https://image.tmdb.org/t/p/original/${backdrop_path}" class="d-block w-100 banner img-fluid" alt="banner"></div>`
        }
        else{
            banner.innerHTML += `<div class="carousel-item"><img src="https://image.tmdb.org/t/p/original/${backdrop_path}" class="d-block w-100 banner img-fluid" alt="banner"></div>`
        }
        
    }
});


//popular movies
getUrl(popular).then((data) => {
    let movies = data.results;
    let popularDiv = document.getElementById("populars")

    movies.forEach((item) => {
        popularDiv.innerHTML += `<a href="#" class="movie-link"><img class="movie rounded" src="https://image.tmdb.org/t/p/original/${item.poster_path}"></a>`
    }) 
})

//latest movies
getUrl(trending).then((data) => {

    let movies = data.results;
    let trendingDiv = document.getElementById("latest")


    movies.forEach((item) => {
    
        trendingDiv.innerHTML += `<a href="#" class="movie-link"><img class="movie rounded" src="https://image.tmdb.org/t/p/original/${item.poster_path}"></a>`
    }) 
})


//Upcoming Movies
getUrl(upcoming).then((data) => {

    let movies = data.results;
    let upcomingDiv = document.getElementById("upcoming")

    movies.forEach((item) => {

        let url = `https://api.themoviedb.org/3/movie/${item.id}/videos?api_key=96ed0ec492efaa4cdc588db75acb4b37&language=pt-BR`


        getUrl(url).then((data2) => {

            link = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${data2.key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
            //criar elementos no html com wireframe desse link do yputube

            upcomingDiv.innerHTML += `<div class="d-flex flex-column align-items-center" style="cursor: pointer;" onclick="openVideo(link)"><div class="movie-link position-relative"><img class="movie-upcoming rounded" onmouseover="hoverInMovieUpcoming(${data2.id}, '${item.backdrop_path}')" onmouseout="hoverOutMovieUpcoming(${data2.id})" src="https://image.tmdb.org/t/p/original/${item.backdrop_path}"><img onmouseover="hoverInMovieUpcoming(${data2.id}, '${item.backdrop_path}')" onmouseout="hoverOutMovieUpcoming(${data2.id})" id="id${data2.id}" src="./images/play-button.png" class="btn-play position-absolute top-50 start-50 translate-middle"></div><p class="h5 text-light pt-2">${item.title}</p></div>`

        })
    
    }) 
})


function openVideo(link){
    //abrir video quando clicar nos lançamentos futuros
}


getUrl(tv).then((data) => {

    let series = data.results;
    let popularSeriesDiv = document.getElementById("popularSeries")

    series.forEach((item) => {
    
        popularSeriesDiv.innerHTML += `<a href="#" class="movie-link"><img class="movie rounded" src="https://image.tmdb.org/t/p/original/${item.poster_path}"></a>`
    }) 
})

function random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
  
let r1 = random(0,13), r2 = random(0,13);
while(r1 == r2){
    r1 = random(0,13);
    r2 = random(0,13);
}

randomColection(r1, r2);

function randomColection(rand1, rand2){ //genarate a randon collection section
    let collections = ["The Avengers", "Star Wars", "Harry Potter", "Fast and Furious", "Transforms", "Pirates of the Caribbean", "Indiana Jones", "Spider Man", "Impossible mission", "Toy Story", "X-men", "Jurassic Park", "The Dark Knight", "Thor"];

    for(let i = 1; i < 3; i++){

        let rand;
        (i == 1) ? rand = rand1 : rand = rand2;

        getUrl(SearchCollection+collections[rand]).then((data) => { //get the randon collection data

            let urlCollection = `https://api.themoviedb.org/3/collection/${data.results[0].id}?api_key=96ed0ec492efaa4cdc588db75acb4b37&language=pt-BR`;
    
            getUrl(urlCollection).then((data2) => {
                let parts = data2.parts;
                
                let movie = `https://api.themoviedb.org/3/movie/${data2.parts[0].id}?api_key=96ed0ec492efaa4cdc588db75acb4b37&language=pt-BR`
    
                getUrl(movie).then((movieDatail) => { //add section Tittle
                    console.log(movieDatail)
                    let collectionTitle = document.getElementById(`collection-title${i}`);
                    $(`#collection-title${i}`).addClass("text-capitalize");
    
                    if(movieDatail.tagline != "")
                        collectionTitle.textContent = movieDatail.tagline.replace(/\./g, "");
                    else
                        collectionTitle.textContent = movieDatail.title.replace(".", "");
                })
                
                let colections1Div = document.getElementById(`colections${i}`);
                parts.forEach((item) => { //add poster movie in the section
                    colections1Div.innerHTML += `<a href="#" class="movie-link"><img class="movie rounded" src="https://image.tmdb.org/t/p/original/${item.poster_path}"></a>`;
                })
            })
        })
    }
}

