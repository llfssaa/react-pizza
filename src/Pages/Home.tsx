import React, { useEffect } from 'react'
import Categories from '../components/Categories'
import Sort from '../components/Sort'
import { Skeleton } from '../components/PizzaBlock/Skeleton'
import { Item } from '../types/types'
import PizzaBlock from '../components/PizzaBlock/PizzaBlock'
import { selectFilter, setCategory, setPageNumber } from '../redux/slices/filterSlice'
import { useAppDispatch, useAppSelector, useDebounce } from '../hooks/hooks'
import { Pagination } from '@mui/material'
import { fetchPizzas } from '../redux/slices/pizzasSlice'


const Home = () => {

  const items = useAppSelector(state => state.pizzasSlice.items)

  const dispatch = useAppDispatch()

  const filter = useAppSelector(selectFilter)
  const search = useAppSelector(state => state.searchSlice.text)
  const debounceSearch = useDebounce(search, 750)
  const status = useAppSelector(state => state.pizzasSlice.status)


  const getPizzas = () => {
    const category = filter.category
    const sortBy = filter.sort.property
    const page = filter.page
    dispatch(fetchPizzas({
      sortBy,
      category,
      search,
      page,
    }))
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    getPizzas()
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
            status === 'LOADING' ? [...new Array(6)].map((_, index) => (
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