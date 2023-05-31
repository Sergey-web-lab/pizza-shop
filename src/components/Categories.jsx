import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId } from '../redux/slices/filterSlice';


const Categories = () => {

  const categoryId = useSelector((state) => state.filter.categoryId);
  const dispatch = useDispatch();

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  function onClickCategorie(i) {
    dispatch(setCategoryId(i))
  }

  return (
    <div className="categories">
      <ul>
        {categories.map((value, i) => (
          <li
            key={i}
            onClick={() => onClickCategorie(i)}
            className={categoryId === i ? 'active' : ''}>{value}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Categories;