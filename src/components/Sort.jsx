import { useState, useEffect, useRef } from "react";


const Sort = ({ value, onChangeSort }) => {

  const [open, setOpen] = useState(false);
  const sortList = [
    { name: 'популярности (+)', sortProp: 'rating' },
    { name: 'популярности (-)', sortProp: '-rating' },
    { name: 'цене (+)', sortProp: 'price' },
    { name: 'цене (-)', sortProp: '-price' },
    { name: 'алфавиту (+)', sortProp: 'title' },
    { name: 'алфавиту (-)', sortProp: '-title' },
  ];
  const sortEl = useRef();

  const setSelectedVal = (obj) => {
    onChangeSort(obj);
  }

  useEffect(() => {

    const bodyHandleClick = (e) => {
      if (!e.composedPath().includes(sortEl.current)) {
        setOpen(false);
      }
    }

    document.body.addEventListener('click', bodyHandleClick);

    return () => {
      document.body.removeEventListener('click', bodyHandleClick);
    }
  }, []);

  return (
    <div ref={sortEl} onClick={() => setOpen(!open)}
      className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        {/* <span>{sortList[value].name}</span> */}
        <span>{value.name}</span>
      </div>
      {open &&
        <div className="sort__popup">
          <ul>
            {sortList.map((obj, i) => (
              <li
                key={obj.name}
                onClick={() => setSelectedVal(obj)}
                className={value.sortProp === obj.sortProp ? 'active' : ''}>{obj.name}</li>
            ))}
          </ul>
        </div>
      }
    </div>
  )
}

export default Sort;