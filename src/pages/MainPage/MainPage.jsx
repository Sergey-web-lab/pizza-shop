import Sort from '../../components/Sort';
import Categories from '../../components/Categories';
import PizzaBlock from '../../components/PizzaBlock';
import { useEffect, useState, useRef, useContext } from 'react';
import MyLoader from '../../UI/MyLoader';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { setItems } from '../../redux/slices/itemsSlice';
import Pagination from '../../Pagination';
import { SearchContext } from '../../App';


const MainPage = () => {

  const { searchValue } = useContext(SearchContext);

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState({
    name: 'цене (+)', sortProp: 'price'
  });

  const categoryId = useSelector((state) => state.filter.categoryId);
  const items = useSelector((state) => state.items.items);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);

    const search = searchValue ? `&search=${searchValue}` : '';

    axios.get(`https://6467dda560c8cb9a2c9ed9e1.mockapi.io/items?page=${currentPage}&limit=4&${categoryId > 0 ? `category=${categoryId}` : ''
      }&sortBy=${sortType.sortProp.replace('-', '')
      }&order=${sortType.sortProp.includes('-') ? 'desc' : 'asc'
      }${search}`)
      .then(({ data }) => {
        dispatch(setItems(data))
        setIsLoading(false);
      })
      .catch((err) => {
        console.log('ERROR', err)
        setIsLoading(false);
      })
    window.scrollTo(0, 0);

  }, [categoryId, sortType, currentPage]);

  useEffect(() => {
    if (isMounted) {
      const queryString = qs.stringify({
        categoryId
      })
      navigate(`?${queryString}`);
    }
    setIsMounted(true);
  }, [categoryId, sortType, currentPage]);

  const pizzas = items.filter(obj => {
    if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
      return true;
    }
    return false;
  }).map(obj => <PizzaBlock key={obj.id} {...obj} />)

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort value={sortType} onChangeSort={(obj) => setSortType(obj)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <MyLoader key={index} />)
          // : items.map((props) =>
          //   <PizzaBlock key={props.id} {...props} />)
          : pizzas
        }
      </div>
      <Pagination onChangePage={number => setCurrentPage(number)} />
    </>
  );
}

export default MainPage;