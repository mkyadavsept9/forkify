import * as model from './model';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultView from './views/resultView';
import paginationView from './views/paginationView';
import bookmarkView from './views/bookmarkView';
import addRecipeView from './views/addRecipeView';
import { MODAL_CLOSE_SEC } from './config';

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.loadingSpinner();

    // Loading recipe
    await model.loadRecipe(id);

    // Rendering recipe
    recipeView.render(model.state.recipe);
    resultView.update(model.getSearchResultsPage());
    bookmarkView.update(model.state.bookmarks);
  } catch (err) {
    recipeView.renderErrorMessage(err);
  }
};

const controlSearchResults = async function () {
  try {
    resultView.loadingSpinner();
    const query = searchView.getQuery();
    await model.loadSearchResults(query);
    resultView.render(model.getSearchResultsPage());
    paginationView.render(model.state.search);
  } catch (err) {
    resultView.renderErrorMessage(err);
  }
};

const controlPagination = function (gotoPage) {
  model.state.search.page = gotoPage;
  resultView.render(model.getSearchResultsPage(gotoPage));
  paginationView.render(model.state.search);
};

const controlServings = function (newServing) {
  model.updateServings(newServing);
  recipeView.update(model.state.recipe);
};

const controlBookmark = function () {
  // Add and delete bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else {
    model.deleteBookmark(model.state.recipe.id);
  }

  //Creating Bookmark
  recipeView.update(model.state.recipe);

  //Rendering Bookmark
  bookmarkView.render(model.state.bookmarks);
};

const controlBookmarkHandler = function () {
  bookmarkView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // loading spinner
    addRecipeView.loadingSpinner();
    // uploading data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);
    // rendering uploaded recipe
    recipeView.render(model.state.recipe);
    // success message
    addRecipeView.renderMessage();
    //bookmarking recipe
    bookmarkView.render(model.state.bookmarks);

    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    setTimeout(function () {
      addRecipeView._toogleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error('💥', err);
    addRecipeView.renderErrorMessage(err.message);
  }
};

const init = function () {
  bookmarkView.addBookmarHandler(controlBookmarkHandler);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView._addHandlerUpload(controlAddRecipe);
};

init();
