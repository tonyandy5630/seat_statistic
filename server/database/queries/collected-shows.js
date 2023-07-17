const CShows_QUERY = {
  QUERY_LATEST_RECORD_TIME: `select MAX(recordTime) as 'latestRecordTime' from movies.collected_shows
                            group by recordTime
                            order by recordTime desc
                            limit 1;`,
};

module.exports = CShows_QUERY;
