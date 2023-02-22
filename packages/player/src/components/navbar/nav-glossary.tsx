import React from 'react';
import utils from '../../utils';
import * as _css from './_navbar.scss';

const css = utils.css.removeMapPrefix(_css);

export const NavGlossary = ({ glossary }) => {
  const sortedGlossary = glossary.sort((a, b) => {
    const textA = a.word.toUpperCase();
    const textB = b.word.toUpperCase();
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  });

  const letterTerms = {};

  sortedGlossary.forEach((glossaryTerm) => {
    let term = glossaryTerm.word;
    let definition = glossaryTerm.definition;

    let termLetter = term[0].toUpperCase();

    if (!letterTerms[termLetter]) {
      letterTerms[termLetter] = {};
    }

    letterTerms[termLetter][term] = definition;
  });

  const letters: JSX.Element[] = [];
  for (let letter in letterTerms) {
    const terms: JSX.Element[] = [];
    const dictTermList = letterTerms[letter];

    for (let word in dictTermList) {
      terms.push(
        <div className={css.glossaryTerm} key={word}>
          <div className={css.word}>{word}</div>
          <div className={css.definition}>{dictTermList[word]}</div>
        </div>
      );
    }

    letters.push(
      <div key={letter}>
        <header>{letter}</header>
        {terms}
      </div>
    );
  }

  return <div className={css.navGlossary}>{letters}</div>;
};

export default {
  NavGlossary,
};
