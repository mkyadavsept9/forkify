import View from './view';
import icons from 'url:../../img/icons.svg';

class ResultView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'We could not find the recipe. Please try another one :(';
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

export default new ResultView();
