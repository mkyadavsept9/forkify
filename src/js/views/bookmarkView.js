import View from './view';
import icons from 'url:../../img/icons.svg';
import PreviewView from './previewView';

class BookmarkView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No Bookmarks. Find new recipe and bookmark it :)';
  _message = '';

  addBookmarHandler(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    return this._data
      .map(bookmark => PreviewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarkView();
