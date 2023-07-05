import { photos } from './data';
import { dateParser } from './utils/dateParser.js';

photos.forEach(function (photo, index) {
  const thumbnail = document.createElement('div');
  thumbnail.classList.add('photo');
  thumbnail.setAttribute('id', `photo-${index}`);
  thumbnail.setAttribute('data-index', index);

  const image = document.createElement('img');
  image.src = photo.imageUrl;
  image.alt = photo.title;

  thumbnail.appendChild(image);
  document.querySelector('.gallery').appendChild(thumbnail);

});

const categories = Array.from(new Set(['all', ...photos.map(photo => photo.category)]));
const categorySelect = document.getElementById('category-select');

categories.forEach(function (category) {
  const option = document.createElement('option');
  option.value = category;
  option.textContent = getCategoryLabel(category);
  categorySelect.appendChild(option);
});

const filterSelector = document.getElementById('category-select');

filterSelector.addEventListener('change', () => {
  filterPhotos();
});

function getCategoryLabel(category) {
  switch (category) {
    case 'all':
      return 'Все';
    case '24':
      return '24"';
    case '32':
      return '32"';
    case '43':
      return '43"';
    case '50':
      return '50"';
    case '55':
      return '55"';
    case '65':
      return '65"';
    default:
      return '';
  }
}

const photosFromGallery = document.querySelectorAll('.photo');

photosFromGallery.forEach((photo) => {
  photo.addEventListener('click', () => {
    const idNumber = photo.id.match(/\d+/)[0];
    showDetails(idNumber, this);
  });
});

function showDetails(index, thumbnail) {
  const photo = photos[index];
  const detailsContainer = document.getElementById('photo-details');

  detailsContainer.innerHTML = `
        <div class='descriptionPhotoBlock'>
           <img src='${photo.imageUrl}' alt='${photo.title}'/>
        </div>
        <p><strong>${photo.title}</strong></p>
        <p>${photo.description}</p>

        <div class='comments'>
          <h3>Комментарии:</h3>
          <form id='comment-form-${index}'>
            <input type='text' id='comment-input' class='input' placeholder='Добавить комментарий' required>
            <button type='submit' class='sendCommentBtn'>Отправить</button>
          </form>
          <div id='comments-list' class='commentBlock'>
            ${getCommentsHtml(photo.comments)}
          </div>
        </div>
      `;

  const commentForm = document.getElementById(`comment-form-${index}`);

  commentForm.addEventListener('submit', (event) => {
    event.preventDefault();
    addComment(index);
  });
}

function addComment(index) {
  const commentInput = document.getElementById('comment-input');
  const commentText = commentInput.value;

  if (commentText) {
    const photo = photos[index];
    photo.comments.push({ commentText, date: dateParser() });

    const commentsList = document.getElementById('comments-list');
    commentsList.innerHTML = getCommentsHtml(photo.comments);

    commentInput.value = '';
  }
}

function getCommentsHtml(comments) {
  let html = '';
  for (let i = 0; i < comments.length; i++) {
    html += `
        <div class='comment'>
            <p class='commentText'>${comments[i].commentText}</p>
            <p class='date'>${comments[i].date}</p>
        </div>
        `;
  }
  return html;
}

function filterPhotos() {
  const selectedCategory = categorySelect.value;
  const thumbnails = document.querySelectorAll('.photo');

  thumbnails.forEach(function (thumb) {
    const photo = photos[thumb.dataset.index];
    if (selectedCategory === 'all' || photo.category === selectedCategory) {
      thumb.style.display = 'block';
    } else {
      thumb.style.display = 'none';
    }
  });
}
