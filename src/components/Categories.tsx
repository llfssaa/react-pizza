import React from 'react'

type CategoriesProps = {
  value: number;
  onClickCategories: (val: number) => void;
}
const categoriesList = ['All', 'Meat', 'Vegetarian', 'Grill', 'Hot', 'Calzone']

export const Categories: React.FC<CategoriesProps> = ({ value, onClickCategories }) => {
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


