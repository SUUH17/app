import React from 'react'
import Link from 'redux-first-router-link'
import { Home, Map, Box } from 'react-feather';
import { connect } from 'react-redux'

import List from './../List'
import Modal from './../Modal'
import MapView from './../Map'

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

const HomeView = () =>
  <div>
    <h1>Welcome to Suuh</h1>
  </div>

const getView = (page) => {
  switch (page) {
    case 'HOME':
      return <HomeView />
    case 'SHOW_MAP':
      return <Map />
    case 'SHOW_ITEMS':
      return <List />
    default:
      return <HomeView />
  }
}

const App = ({page}) => {
  return <div>
    <Header />
    <div className={style.content}>
      { getView(page) }
    </div>
    <Modal />
  </div>
}

const mapStateToProps = state => ({
  page: state.location.type
})

export default  connect(mapStateToProps)(App)
