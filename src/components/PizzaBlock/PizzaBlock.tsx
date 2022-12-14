import React, { useState } from 'react'
import { Item } from '../../types/types'
import { useAppDispatch } from '../../hooks/hooks'
import { addItem } from '../../redux/slices/cartSlice'
import { Link } from 'react-router-dom'

interface PizzaBlockProps {
  item: Item;
}

const PizzaBlock = (props: PizzaBlockProps): JSX.Element => {

  const dispatch = useAppDispatch()


  const typeNames = ['thin', 'traditional']
  const [count, setCount] = useState(0)
  const [activeSize, setActiveSize] = useState(0)
  const [activeType, setActiveType] = useState(0)
  return (
    <div className='pizza-block__wrapper'>
      <div className='pizza-block'>
        <Link to={`pizza/${props.item.id}`}>
          <img
            className='pizza-block__image'
            src={props.item.imageUrl}
            alt='Pizza'
          />
        </Link>
        <div className='pizza-block__title'>{props.item.name}</div>
        <div className='pizza-block__selector'>
          <ul>
            {props.item.types.map((type: number) => (
              <li key={type}
                  onClick={() => setActiveType(type)}
                  className={activeType === type ? 'active' : ''}
              >
                {typeNames[type]}</li>
            ))}
          </ul>
          <ul>
            {props.item.sizes.map((size, i) => (
              <li key={i} onClick={() => setActiveSize(i)}
                  className={activeSize === i ? 'active' : ''}> {size} </li>
            ))}

          </ul>
        </div>
        <div className='pizza-block__bottom'>
          <div className='pizza-block__price'>от {props.item.price} L</div>
          <div
            onClick={() => {
              setCount(count + 1)
              dispatch(addItem({ ...props.item, type: typeNames[activeType], size: activeSize }))
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
            <i>{count}</i>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PizzaBlock