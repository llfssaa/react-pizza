import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './scss/app.scss'
import Header from './components/Header'
import Home from './Pages/Home'
import NotFound from './Pages/NotFound'

import PizzaInfo from './Pages/PizzaInfo'

const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */'./Pages/Cart/Cart'))

function App() {
  return (
    <div className='wrapper'>
      <Header />
      <div className='content'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={
            <React.Suspense fallback={<div className='pizza-block__wrapper'>
              <img src='https://i.gifer.com/Uond.gif' alt='' />
            </div>}>
              <Cart />
            </React.Suspense>
          } />
          <Route path='/pizza/:id' element={<PizzaInfo />} />

          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
