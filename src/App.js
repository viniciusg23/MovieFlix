var url = "https://api.themoviedb.org/3/movie/upcoming?api_key=96ed0ec492efaa4cdc588db75acb4b37&language=pt-BR"

var nowPlaying = "https://api.themoviedb.org/3/movie/now_playing?api_key=96ed0ec492efaa4cdc588db75acb4b37&language=pt-BR&region=BR"

let popular = "https://api.themoviedb.org/3/movie/popular?api_key=96ed0ec492efaa4cdc588db75acb4b37&language=pt-BR&region=BR"

let trending = "https://api.themoviedb.org/3/trending/movie/day?api_key=96ed0ec492efaa4cdc588db75acb4b37&language=pt-BR&region=BR" 

let upcoming = "https://api.themoviedb.org/3/movie/upcoming?api_key=96ed0ec492efaa4cdc588db75acb4b37&language=pt-BR"

var images = "https://image.tmdb.org/t/p/{size}/{path}"


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
    for(let i = 0; i < 10; i++){
        backdrop_path = data.results[i].backdrop_path

       document.getElementById(`banner${i}`).setAttribute("src", `https://image.tmdb.org/t/p/original/${backdrop_path}`)

        //console.log(banners[i])
    }
});


//popular movies
getUrl(popular).then((data) => {
    let movies = data.results;
    let popularDiv = document.getElementById("populars")

    movies.forEach((item) => {
        //console.log(item)
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




getUrl(upcoming).then((data) => {

    let movies = data.results;
    let upcomingDiv = document.getElementById("upcoming")
    console.log(movies)

    movies.forEach((item) => {

        let url = `https://api.themoviedb.org/3/movie/${item.id}/videos?api_key=96ed0ec492efaa4cdc588db75acb4b37&language=pt-BR`

        console.log(item)

        getUrl(url).then((data2) => {

            //console.log(data2)

            link = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${data2.key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
            //criar elementos no html com wireframe desse link do yputube

            upcomingDiv.innerHTML += `<div class="d-flex flex-column align-items-center" style="cursor: pointer;" onclick="openVideo(link)"><div class="movie-link position-relative"><img class="movie-upcoming rounded" onmouseover="hoverInMovieUpcoming(${data2.id}, '${item.backdrop_path}')" onmouseout="hoverOutMovieUpcoming(${data2.id})" src="https://image.tmdb.org/t/p/original/${item.backdrop_path}"><img onmouseover="hoverInMovieUpcoming(${data2.id}, '${item.backdrop_path}')" onmouseout="hoverOutMovieUpcoming(${data2.id})" id="id${data2.id}" src="./images/play-button.png" class="btn-play position-absolute top-50 start-50 translate-middle"></div><p class="h5 text-light pt-2">${item.title}</p></div>`





        })
        
        //upcomingDiv.innerHTML += `<a href="#" class="movie-link"><img class="movie-upcoming rounded" src="https://image.tmdb.org/t/p/original/${item.poster_path}"></a>`
    }) 
})


function openVideo(link){
    
}


