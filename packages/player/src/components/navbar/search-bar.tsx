import React, { useEffect } from 'react';
import utils from '../../utils';
import * as _css from './_navbar.scss';

const css = utils.css.removeMapPrefix(_css);

export const SearchBar = ({
  searchTerm,
  setSearchTerm,
  confirmedSearchTerm,
  setConfirmedSearchTerm,
}) => {
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyDown = (event) => {
    switch (event.code) {
      case 'Enter':
        doSearch();
        break;
      case 'Escape':
        clearSearch(event);
        break;
      default:
        break;
    }
  };

  const doSearch = () => {
    setConfirmedSearchTerm(searchTerm);
  };

  const clearSearch = (e) => {
    if (
      e.target.classList[0] === 'input' ||
      e.target.classList[0] === 'owlui-clear' ||
      e.target.classList[0] === 'material-symbols-outlined'
    ) {
      e.preventDefault();
      e.target.blur();
      setSearchTerm('');
      setConfirmedSearchTerm('');
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
  }, [searchTerm]);

  return (
    <div className={css.searchBar}>
      <span className="material-symbols-outlined">search</span>

      <div className={css.searchTerm}>
        <input
          type="text"
          placeholder="Search glossary..."
          value={searchTerm}
          onChange={handleChange}
        />
      </div>

      {confirmedSearchTerm !== '' ? (
        <button
          className={css.clear}
          onClick={(e) => {
            clearSearch(e);
          }}
          aria-label="Clear Search"
          title="Clear Search"
        >
          <span className="material-symbols-outlined icons">close</span>
        </button>
      ) : null}
    </div>
  );
};

export default {
  SearchBar,
};
