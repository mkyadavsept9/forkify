import View from './view';
import icons from 'url:../../img/icons.svg';

class PreviewView extends View {
  _generateMarkup(data) {
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
                <div class="preview__user-generated ${
                  this._data.key ? '' : 'hidden'
                }">
              <svg>
              <use href="${icons}#icon-user"></use>
              </svg>
            </div>
              </div>
            </a>
          </li>
    `;
  }
}

export default new PreviewView();
