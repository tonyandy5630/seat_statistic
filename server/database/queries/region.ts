module.exports = {
  QUERY_REGION_STAT: `SELECT reg.region,reg.id ,SUM(cshows.seatRatio) as 'TotalSeatRatio', sum(screen.maxSeatQuantity) as 'TotalSeatNumber'  FROM movies.screens as screen
                                    inner join  movies.shows as shows
                                    on screen.screenId = shows.screenId
                                    inner join movies.collected_shows as cshows
                                    on cshows.showId = shows.id
                                    inner join movies.cinemas as cin 
                                    on cin.id = screen.cinemaId
                                    inner join movies.regions as reg
                                    on reg.id = cin.regionId
                                    where shows.IsCollected = 0
                                    group by  reg.id`,
  QUERY_EACH_REGION_STAT: (
    regId,
    totalRegionPercent
  ) => `SELECT shows.cinemaName as 'name' ,(SUM(cshows.seatRatio)/${totalRegionPercent}) * 100 as 'percentage'  FROM movies.screens as screen
        inner join  movies.shows as shows
        on screen.screenId = shows.screenId
        inner join movies.collected_shows as cshows
        on cshows.showId = shows.id
        inner join movies.cinemas as cin 
        on cin.id = screen.cinemaId
        inner join movies.regions as reg
        on reg.id = cin.regionId
        where shows.IsCollected = 0 and reg.id = ${regId}
        group by shows.cinemaName;`,
  QUERY_EACH_MOVIE_RATE_AT_REGIONS: (
    movieId
  ) => `SELECT reg.id,reg.region, SUM(cshows.seatRatio) as 'percentage' FROM movies.screens as screen
inner join  movies.shows as shows
on screen.screenId = shows.screenId
inner join movies.collected_shows as cshows
on cshows.showId = shows.id
inner join movies.cinemas as cin 
on cin.id = screen.cinemaId
inner join movies.regions as reg
on reg.id = cin.regionId
where shows.IsCollected = 0  and shows.movieId = ${movieId}
group by  reg.region,reg.id;`,

  QUERY_EACH_MOVIE_PERCENT_AT_A_REGION: (
    regId,
    totalMovieRatio
  ) => `SELECT shows.movieName as 'name', ((SUM(cshows.seatRatio)/${totalMovieRatio}) * 100) as 'percentage' FROM movies.screens as screen
inner join  movies.shows as shows
on screen.screenId = shows.screenId
inner join movies.collected_shows as cshows
on cshows.showId = shows.id
inner join movies.cinemas as cin 
on cin.id = screen.cinemaId
inner join movies.regions as reg
on reg.id = cin.regionId
where shows.IsCollected = 0  and reg.id = ${regId}
group by  shows.movieName;`,
};
