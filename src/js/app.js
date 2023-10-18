let imagesUrl = 'https://image.tmdb.org/t/p/w500/'; // default url
const $wrapperArea = document.querySelector('.wrapper');
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZmNmNmNhMjRmNmE5ZmUzMzhjZDYzZDM0ZjFiNTkwNyIsInN1YiI6IjY1MmYyOTEzY2FlZjJkMDBlMjhkMzk4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HK_kH2xDe0X0L2HxwwO8e4qMFM1FatYUcnjt-nYOeGA',
  },
};
/**
 * TMDB API
 * 인기영화 리스트 불러오기
 */
fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
  .then(response => response.json())
  .then(response => {
    // JSON 데이터 내에서 키 값 찾아서 원하는 거 찍어내기
    response.results.map(item => {
      let $images = document.createElement('img');
      let $divArea = document.createElement('div');

      $images.src = `${imagesUrl + item.backdrop_path}`; // src 속성 세팅해주고
      $divArea.appendChild($images); // img 태그 div 태그로 감싸주고
      $wrapperArea.appendChild($divArea); // 부모 노드에 넣기

      $images.addEventListener('click', function (e) {
        alert(`영화 ID : ${item.id}`);
      });
    });
  })
  .catch(err => console.error(err));
