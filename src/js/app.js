let jsonObj = new Array();
const $searchInput = document.querySelector('#search-input');
const $searchBtn = document.querySelector('.icon');
const $wrapperArea = document.querySelector('.wrapper');
const $infoList = $wrapperArea.getElementsByTagName('div');
const imagesUrl = 'https://image.tmdb.org/t/p/w500/'; // default url
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
function getMovieList() {
  return new Promise((resolve, rejcet) => {
    fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
      .then(response => response.json())
      .then(response => resolve(response))
      .catch(err => console.error(err));
  });
}

/**
 *
 * @returns
 */
async function loading() {
  let data = await getMovieList();

  jsonObj = data.results.map(item => {
    // 동적 태그 생성
    let $images = document.createElement('img');
    let $title = document.createElement('h3');
    let $content = document.createElement('p');
    let $grade = document.createElement('small');
    let $divArea = document.createElement('div');

    // 내용 채워주기
    $images.src = `${imagesUrl + item.backdrop_path}`; // src 속성 세팅해주고
    $title.textContent = `${item.title}`;
    $content.textContent = `${item.overview}`;
    $grade.textContent = `${item.vote_average}`;
    $divArea.appendChild($images);
    $divArea.appendChild($title);
    $divArea.appendChild($content);
    $divArea.appendChild($grade);
    $wrapperArea.appendChild($divArea);
    $searchInput.focus();

    // 이미지 클릭 시, id 출력
    $images.addEventListener('click', function () {
      alert(`영화 ID : ${item.id}`);
    });
    return item;
  });

  return jsonObj;
}

function searchTitle() {
  if ($searchInput.value === '') return alert('제목을 입력해 주세요.');
  // 처음엔 전부 숨겨주고
  for (let i = 0; i < $infoList.length; i++) {
    $infoList[i].style.display = 'none';
  }
  // 배열 순회하다가 일치하는 제목 있으면 출력
  jsonObj.map((searchItem, index) => {
    let serachText = searchItem.title.toUpperCase();

    if (serachText.indexOf($searchInput.value.toUpperCase().trim()) !== -1) {
      // 일치한 것만 보여주기
      $infoList[index].style.display = 'block';
    }
  });
  $searchInput.value = '';
}

$searchBtn.addEventListener('click', () => searchTitle());
$searchInput.addEventListener('keyup', e => {
  if (e.keyCode === 13) $searchBtn.click();
});

loading();
