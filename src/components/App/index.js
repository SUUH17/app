import React from 'react'
import Link from 'redux-first-router-link'
import { Home, Map, Box } from 'react-feather';

import List from './../List'

import style from './app.scss'

const Logo = () =>
  <div>
    Logo
  </div>

const Header = () =>
  <div className={style.header}>
    <Link className={style.link} to='/'>
      <Home />
      Home
    </Link>
    <Link className={style.link} to='/items/'>
      <Box />
      Rent
    </Link>
    <Link className={style.link} to='/map'>
      <Map />
      Map
    </Link>
  </div>

const App = () =>
  <div>
    <Header />
    <div className={style.content}>
      <List />
    </div>
  </div>

export default App
