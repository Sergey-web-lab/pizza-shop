import './SearchInp.scss'
import { useState, useRef, useContext } from 'react';
import { SearchContext } from '../../App';

const SearchInp = () => {

  const { searchValue, setSearchValue } = useContext(SearchContext);

  const inputRef = useRef();

  const handleClick = () => {
    setSearchValue('');
    inputRef.current.focus();
  }

  return (
    <div className="text-field">
      <div className="text-field__group">
        <input
          placeholder='Введите название пиццы'
          value={searchValue}
          ref={inputRef}
          onChange={(e) => setSearchValue(e.target.value)}
          className="text-field__input"
          id="search"
          name="search" />
        {/* <button className="text-field__btn" type="button">Найти</button> */}
        <img onClick={() => handleClick()} className='text-field__del' src="img/cross.svg" alt="cross" />
      </div>
    </div>
  );
}

export default SearchInp;