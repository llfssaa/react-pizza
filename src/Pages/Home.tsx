import React, { useEffect, useState } from 'react'
import Categories from '../components/Categories'
import Sort from '../components/Sort'
import { Skeleton } from '../components/PizzaBlock/Skeleton'
import { Item } from '../types/types'
import PizzaBlock from '../components/PizzaBlock/PizzaBlock'


const Home = () => {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    fetch('https://62fccc276e617f88de9e4d1a.mockapi.io/items')
      .then(res => {
        return res.json()
      })
      .then((data) => {
        setItems(data)
        setIsLoading(false)
      })

  }, [])
  return (
    <div>
      <div className='content__top'>
        <Categories />
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
  )
}

export default Home