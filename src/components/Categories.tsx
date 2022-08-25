import React from 'react'


const Categories = ({ value, onClickCategories }: any) => {
  const categoriesList = ['All', 'Meat', 'Vegetarian', 'Grill', 'Hot', 'Calzone']

  return (
    <div className='categories'>
      <ul>
        {categoriesList.map((categoryName, i) => (
          <li key={i} onClick={() => onClickCategories(i)} className={value === i ? 'active' : ''}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Categories