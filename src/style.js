


//hover in movies-upcoming trailers
function hoverInMovieUpcoming(id, path){
    $(`#id${id}`).css("opacity", "1").css("width", "4rem")
    console.log(path)
    $("#bg-upcoming").css("background", `url(https://image.tmdb.org/t/p/w1920_and_h427_multi_faces/${path})`)
}
function hoverOutMovieUpcoming(id){
    $(`#id${id}`).css("opacity", "0.75").css("width", "3rem")
}