import './SearchInp.scss'
import { useState, useRef } from 'react';

const SearchInp = () => {

  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef();

  const handleClick = () => {
    setInputValue('');
    inputRef.current.focus();
  }

  return (
    <div className="text-field">
      <div className="text-field__group">
        <input ref={inputRef} onChange={(e) => setInputValue(e.target.value)} value={inputValue} className="text-field__input" id="search" name="search" />
        <button className="text-field__btn" type="button">Найти</button>
        <img onClick={() => handleClick()} className='text-field__del' src="img/cross.svg" alt="cross" />
      </div>
    </div>
  );
}

export default SearchInp;