let jsonObj = new Array();
const $searchInput = document.querySelector('#search-input');
const $searchBtn = document.querySelector('.icon');
const $wrapperArea = document.querySelector('.wrapper');
const $infoList = $wrapperArea.getElementsByTagName('div');
const imagesUrl = 'https://image.tmdb.org/t/p/w500/'; // default url
const checkText = new RegExp(/\s/g); // 공백 제거 정규식
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZmNmNmNhMjRmNmE5ZmUzMzhjZDYzZDM0ZjFiNTkwNyIsInN1YiI6IjY1MmYyOTEzY2FlZjJkMDBlMjhkMzk4OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HK_kH2xDe0X0L2HxwwO8e4qMFM1FatYUcnjt-nYOeGA',
  },
};

/**
 * TMDB API - 영화 리스트 불러오기
 * @returns jsonObj
 */
(async function getMovieList() {
  // fetch로 데이터 가져올 때까지 기다려주고
  let data = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    .then(response => response.json())
    .then(response => {
      return response;
    });

  // data map 함수로 순회
  jsonObj = data.results.map(item => {
    const $images = document.createElement('img');
    const $title = document.createElement('h3');
    const $content = document.createElement('p');
    const $grade = document.createElement('small');
    const $divArea = document.createElement('div');

    $images.src = `${imagesUrl + item.backdrop_path}`;
    $title.textContent = `${item.title}`;
    $content.textContent = `${item.overview}`;
    $grade.textContent = `${item.vote_average}`;
    $divArea.classList.add('info-area');
    $divArea.appendChild($images);
    $divArea.appendChild($title);
    $divArea.appendChild($content);
    $divArea.appendChild($grade);
    $wrapperArea.appendChild($divArea);
    $searchInput.focus();

    $images.addEventListener('click', function () {
      alert(`영화 ID : ${item.id}`);
    });
    return item;
  });

  return jsonObj;
})();

function searchTitle() {
  if ($searchInput.value === '') return alert('제목을 입력해 주세요.');

  for (let i = 0; i < $infoList.length; i++) {
    $infoList[i].style.display = 'none';
  }

  jsonObj.map((searchItem, index) => {
    let serachText = searchItem.title.toUpperCase();

    if (serachText.indexOf($searchInput.value.replace(checkText, '').toUpperCase()) !== -1) {
      $infoList[index].style.display = 'block';
    }
  });
  $searchInput.value = '';
}

$searchBtn.addEventListener('click', () => searchTitle());
$searchInput.addEventListener('change', e => {
  $searchBtn.click();
});
