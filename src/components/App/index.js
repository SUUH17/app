import React from 'react'
import Link from 'redux-first-router-link'

import List from './../List'

import style from './app.scss'

const Logo = () =>
  <div>
    Home
  </div>

const Header = () =>
  <div className={style.header}>
    <Link className={style.link} to='/'><Logo /></Link>
    <Link className={style.link} to='/items/'>List</Link>
    <Link className={style.link} to='/map'>Map</Link>
  </div>

const App = () =>
  <div>
    <Header />
    <div className={style.content}>
      <List />
    </div>
  </div>

export default App
