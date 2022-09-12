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
import { Link } from 'react-router-dom'


const Home = () => {

  const items = useAppSelector(state => state.pizzasSlice.items)

  const dispatch = useAppDispatch()

  const filter = useAppSelector(selectFilter)
  const search = useAppSelector(state => state.filterSlice.search)
  const debounceSearch = useDebounce(search, 750)
  const status = useAppSelector(state => state.pizzasSlice.status)

  const pizzas = items.map((obj: Item) => (
    <Link key={obj.id} to={`pizza/${obj.id}`}>
      <PizzaBlock item={obj} />
    </Link>
  ))
  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ))


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
        {status === 'ERROR' ? (
          <div className='content__error'>
            <h2>Something went wrong 😕</h2>
            <p>Unfortunately, it was not possible to get pizzas. Please try again later</p>
          </div>
        ) : (
          <div className='content__items'>{status === 'LOADING' ? skeletons : pizzas} </div>
        )}

        <Pagination className='content__pagination' count={3} page={filter.page}
                    onChange={(ev, val) => dispatch(setPageNumber(val))} />
      </div>
    </div>
  )
}

export default Home