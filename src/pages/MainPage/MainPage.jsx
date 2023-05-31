import Sort from '../../components/Sort';
import Categories from '../../components/Categories';
import PizzaBlock from '../../components/PizzaBlock';
import { useEffect, useState, useRef } from 'react';
import MyLoader from '../../UI/MyLoader';
import { useSelector } from 'react-redux';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';


const MainPage = () => {

  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  // const isMounted = useRef(false);

  const categoryId = useSelector((state) => state.filter.categoryId);

  useEffect(() => {
    setIsLoading(true);
    axios.get(`https://6467dda560c8cb9a2c9ed9e1.mockapi.io/items?category=${categoryId}`)
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      })
    window.scrollTo(0, 0);

  }, [categoryId]);

  useEffect(() => {
    if (isMounted) {
      const queryString = qs.stringify({
        categoryId
      })
      navigate(`?${queryString}`);
    }
    setIsMounted(true);
  }, [categoryId]);

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <MyLoader key={index} />)
          : items.map((props) =>
            <PizzaBlock key={props.id} {...props} />)
        }
      </div>
    </>
  );
}

export default MainPage;