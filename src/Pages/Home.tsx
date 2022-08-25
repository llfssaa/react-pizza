import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Categories from '../components/Categories'
import Sort from '../components/Sort'
import { Skeleton } from '../components/PizzaBlock/Skeleton'
import { Item } from '../types/types'
import PizzaBlock from '../components/PizzaBlock/PizzaBlock'
import { selectFilter, setCategoryId } from '../redux/slices/filterSlice'
import { useAppDispatch, useAppSelector, useDebounce } from '../hooks/hooks'


const Home = () => {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  /* const [categoryId, setCategoryId] = useState(0)*/
  /* const [sortItems, setSortItems] = useState({ name: 'popularity', property: 'rating' })*/

  const filter = useAppSelector(selectFilter)
  const dispatch = useAppDispatch()
  const search = useAppSelector(state => state.searchSlice.text)
  const debounceSearch = useDebounce(search, 750)


  useEffect(() => {
    setIsLoading(true)
    axios.get('https://62fccc276e617f88de9e4d1a.mockapi.io/items',
      filter.categoryId > 0 ?
        { params: { category: filter.categoryId, sortBy: filter.sort.property, search: search } } :
        { params: { sortBy: filter.sort.property, search: search } },
    )
      .then((res: { data: React.SetStateAction<never[]> }) => {
        setItems(res.data)
      })
    setIsLoading(false)
    window.scrollTo(0, 0)
  }, [debounceSearch, filter.categoryId, filter.sort])
  return (
    <div>
      <div className='container'>
        <div className='content__top'>
          <Categories value={filter.categoryId} onClickCategories={
            (i: number) => dispatch(setCategoryId(i))} />
          <Sort />
        </div>
        <h2 className='content__title'>Все пиццы</h2>
        <div className='content__items'>
          {
            isLoading ? [...new Array(6)].map((_, index) => (
                <Skeleton key={index} />
              ))
              :

              items.map((obj: Item) => (
                <PizzaBlock key={obj.id} {...obj} />
              ))
          }
        </div>
      </div>
    </div>
  )
}

export default Home