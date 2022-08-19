import React, { useState } from 'react'

const Categories = () => {
  const categoriesList = ['All', 'Meat', 'Vegetarian', 'Grill', 'Hot', 'Calzone']
  const [activeIndex, setActiveIndex] = useState(0)
  return (
    <div className='categories'>
      <ul>
        {categoriesList.map((value, i) => (
          <li key={i} onClick={() => setActiveIndex(i)} className={activeIndex === i ? 'active' : ''}>
            {value}
          </li>
        ))}

      </ul>
    </div>
  )
}

export default Categories