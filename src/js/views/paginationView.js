import icons from 'url:../../img/icons.svg';
import View from './view.js';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', e => {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    const generateNextBtnMarkup = function () {
      return `
        <button data-goto="${
          curPage + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
      `;
    };

    const generatePreviousBtnMarkup = function () {
      return `
        <button data-goto="${
          curPage - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon"> 
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
        </button>
      `;
    };

    // Page 1, there are other pages
    if (curPage === 1 && numPages > 1) {
      return generateNextBtnMarkup();
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return generatePreviousBtnMarkup();
    }

    // Other page
    if (curPage < numPages) {
      return `
      ${generatePreviousBtnMarkup()}
      ${generateNextBtnMarkup()}
      `;
    }

    // Page 1, there are NO pages
    return '';
  }
}

export default new PaginationView();
