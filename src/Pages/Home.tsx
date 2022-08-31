import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Categories from '../components/Categories'
import Sort from '../components/Sort'
import { Skeleton } from '../components/PizzaBlock/Skeleton'
import { Item } from '../types/types'
import PizzaBlock from '../components/PizzaBlock/PizzaBlock'
import { selectFilter, setCategory, setPageNumber } from '../redux/slices/filterSlice'
import { useAppDispatch, useAppSelector, useDebounce } from '../hooks/hooks'
import { Pagination } from '@mui/material'


const Home = () => {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)


  const dispatch = useAppDispatch()

  const filter = useAppSelector(selectFilter)
  const search = useAppSelector(state => state.searchSlice.text)

  const debounceSearch = useDebounce(search, 750)

  const fetchPizzas = () => {
    setIsLoading(true)
    axios.get('https://62fccc276e617f88de9e4d1a.mockapi.io/items',
      filter.category > 0 ?
        {
          params: {
            category: filter.category, sortBy: filter.sort.property,
            search: search,
          },
        } :
        {
          params: {
            sortBy: filter.sort.property, search: search,
            page: filter.page, limit: 5,
          },
        },
    )
      .then((res: { data: React.SetStateAction<never[]> }) => {
        setItems(res.data)
      })
    setIsLoading(false)

  }

  useEffect(() => {
    window.scrollTo(0, 0)
    fetchPizzas()
  }, [debounceSearch, filter.category, filter.sort, filter.page])


  return (
    <div>
      <div className='container'>
        <div className='content__top'>
          <Categories value={filter.category} onClickCategories={
            (i: number) => dispatch(setCategory(i))} />
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
                <PizzaBlock key={obj.id} item={obj} />
              ))
          }
        </div>
        <Pagination className='content__pagination' count={3} page={filter.page}
                    onChange={(ev, val) => dispatch(setPageNumber(val))} />
      </div>
    </div>
  )
}

export default Home