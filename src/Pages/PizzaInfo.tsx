import React, { useEffect, useState } from 'react'
import { addItem } from '../redux/slices/cartSlice'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { Item } from '../types/types'
import { useAppDispatch } from '../hooks/hooks'

const PizzaInfo: React.FC = () => {

  const dispatch = useAppDispatch()
  const { id } = useParams()
  const navigate = useNavigate()
  const [pizza, setPizza] = useState<Item>()

  useEffect(() => {
    async function fetchPizza() {
      try {
        const res = await axios.get('https://62fccc276e617f88de9e4d1a.mockapi.io/items/' + id)
        setPizza(res.data)
      } catch (error) {
        alert('Ooooops! Pizza fetch error :(')
        navigate('/')

      }
    }

    fetchPizza()

  }, [])


  const typeNames = ['thin', 'traditional']
  const [activeSize, setActiveSize] = useState(0)
  const [activeType, setActiveType] = useState(0)

  return (
    <div className='container'>
      {
        pizza ? (
          <div>
            <div className='pizza-info'>
              <div>
                <img
                  className='pizza-block__image'
                  src={pizza.imageUrl}
                  alt='Pizza'
                />
                <div className='pizza-block__title'>{pizza.name}</div>
              </div>
              <div className='pizza-info__selector'>
                <ul>
                  {pizza.types.map((type: number) => (
                    <li key={type}
                        onClick={() => setActiveType(type)}
                        className={activeType === type ? 'active' : ''}
                    >
                      {typeNames[type]}</li>
                  ))}
                </ul>
                <ul>
                  {pizza.sizes.map((size, i) => (
                    <li key={i} onClick={() => setActiveSize(i)}
                        className={activeSize === i ? 'active' : ''}> {size} </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className='pizza-block__bottom'>
              <div className='pizza-block__price'> {pizza.price} L</div>
              <div
                onClick={() => {
                  dispatch(addItem({ ...pizza, type: typeNames[activeType], size: activeSize }))
                }}
                className='button button--outline button--add'>
                <svg
                  width='12'
                  height='12'
                  viewBox='0 0 12 12'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
                    fill='white'
                  />
                </svg>
                <span>Add</span>
              </div>
            </div>
          </div>
        ) : (
          <div className='pizza-block__wrapper'>
            <img src='https://i.gifer.com/Uond.gif' alt='' />
          </div>
        )
      }
      <Link to='/' className='button button--outline button--add go-back-btn'>
        <svg width='8' height='14' viewBox='0 0 8 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path d='M7 13L1 6.93015L6.86175 1' stroke='#D3D3D3' strokeWidth='1.5' strokeLinecap='round'
                strokeLinejoin='round' />
        </svg>

        <span>Come back</span>
      </Link>
    </div>
  )
}

export default PizzaInfo






















