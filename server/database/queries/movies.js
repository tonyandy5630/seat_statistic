const CINEMA_QUERY = {
  QUERY_TOTAL_MOVIE_RATE_AT_REGIONS: `SELECT shows.movieId,shows.movieName as 'name', SUM(cshows.seatRatio) as 'percentage' FROM movies.screens as screen
inner join  movies.shows as shows
on screen.screenId = shows.screenId
inner join movies.collected_shows as cshows
on cshows.showId = shows.id
inner join movies.cinemas as cin 
on cin.id = screen.cinemaId
inner join movies.regions as reg
on reg.id = cin.regionId
where shows.IsCollected = 0 
group by shows.movieId,shows.movieName;`,
  QUERY_REGION_PERCENT_EACH_MOVIE: (
    movieId,
    totalPercent
  ) => `SELECT reg.region as'name',reg.id, ((SUM(cshows.seatRatio)/${totalPercent}) * 100) as 'percentage' FROM movies.screens as screen
inner join  movies.shows as shows
on screen.screenId = shows.screenId
inner join movies.collected_shows as cshows
on cshows.showId = shows.id
inner join movies.cinemas as cin 
on cin.id = screen.cinemaId
inner join movies.regions as reg
on reg.id = cin.regionId
where shows.IsCollected = 0 and shows.movieId = ${movieId}
group by  reg.region,reg.id;`,
  QUERY_TOTAL_MOVIE_RATE_AT_CINEMAS: (
    cinemaId
  ) => `SELECT shows.movieName,shows.movieId , SUM(cshows.seatRatio) as 'percentage' FROM movies.screens as screen
inner join  movies.shows as shows
on screen.screenId = shows.screenId
inner join movies.collected_shows as cshows
on cshows.showId = shows.id
inner join movies.cinemas as cin 
on cin.id = screen.cinemaId
inner join movies.regions as reg
on reg.id = cin.regionId
where shows.IsCollected = 0 and shows.movieId = ${cinemaId}
group by  shows.movieName,shows.movieId ;`,
  QUERY_EACH_CINEMA_PERCENT_PER_MOVIE: (
    movieId,
    totalPercent
  ) => `SELECT shows.cinemaName as 'name',screen.cinemaId , ((SUM(cshows.seatRatio)/${totalPercent}) * 100) as 'percentage' FROM movies.screens as screen
inner join  movies.shows as shows
on screen.screenId = shows.screenId
inner join movies.collected_shows as cshows
on cshows.showId = shows.id
inner join movies.cinemas as cin 
on cin.id = screen.cinemaId
inner join movies.regions as reg
on reg.id = cin.regionId
where shows.IsCollected = 0 and shows.movieId = ${movieId}
group by  shows.cinemaName,screen.cinemaId;`,
};

module.exports = CINEMA_QUERY;
