const CinemaQuery = {
  QUERY_EACH_MOVIE_RATE_AT_CINEMAS: (
    movieId
  ) => `SELECT screen.cinemaName,screen.cinemaId, SUM(cshows.seatRatio) as 'percentage' FROM movies.screens as screen
inner join  movies.shows as shows
on screen.screenId = shows.screenId
inner join movies.collected_shows as cshows
on cshows.showId = shows.id
inner join movies.cinemas as cin 
on cin.id = screen.cinemaId
inner join movies.regions as reg
on reg.id = cin.regionId
where shows.IsCollected = 0  and shows.movieId = ${movieId}
group by  screen.cinemaName,screen.cinemaId;`,

  QUERY_EACH_MOVIE_RATE_PER_CINEMA: (
    cinemaId,
    percentage
  ) => `SELECT shows.movieName as 'name', ((SUM(cshows.seatRatio)/${percentage}) * 100) as 'percentage' FROM movies.screens as screen
inner join  movies.shows as shows
on screen.screenId = shows.screenId
inner join movies.collected_shows as cshows
on cshows.showId = shows.id
inner join movies.cinemas as cin 
on cin.id = screen.cinemaId
inner join movies.regions as reg
on reg.id = cin.regionId
where shows.IsCollected = 0  and screen.cinemaId = ${cinemaId}
group by   shows.movieName;`,
};

module.exports = CinemaQuery;
