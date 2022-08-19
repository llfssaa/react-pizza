import React from 'react'
import s from './NotFoundBlock.module.scss'

export const NotFoundBlock: React.FC = () => {
  return (
    <div className={s.root}>
      <h1>
        <span>😕</span>
        <br />
        Nothing found
      </h1>
      <p className={s.description}>
        Sorry, this page is not available in our online store.
      </p>
    </div>
  )
}

