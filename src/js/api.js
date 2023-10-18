/**
 * TMDB API
 * 인기영화 리스트 불러오기
 */
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZmNmNmNhMjRmNmE5ZmUzMzhjZDYzZDM0ZjFiNTkwNyIsInN1YiI6IjY1MmYyOTEzY2FlZjJkMDBlMjhkMzk4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HK_kH2xDe0X0L2HxwwO8e4qMFM1FatYUcnjt-nYOeGA',
  },
};

fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
  .then(response => response.json())
  .then(response => {
    // console.log(response);
    let data = response;
    console.log(data);
  })
  .catch(err => console.error(err));

console.log();
