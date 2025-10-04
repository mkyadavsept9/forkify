import View from './view';
import icons from 'url:../../img/icons.svg';

class BookmarkView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No Bookmarks. Find new recipe and bookmark it :)';
  _message = '';

  _generateMarkup() {
    return this._data.map(data => this._generateMarkupPreview(data)).join('');
  }

  _generateMarkupPreview(data) {
    return `
        <li class="preview">
            <a class="preview__link ${
              data.id === window.location.hash.slice(1)
                ? 'preview__link--active'
                : ''
            }" href="#${data.id}">
              <figure class="preview__fig">
                <img src="${data.image}" alt="${data.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${data.title} ...</h4>
                <p class="preview__publisher">${data.publisher}</p>
              </div>
            </a>
          </li>
    `;
  }
}

export default new BookmarkView();
