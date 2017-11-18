import React from 'react'
import Link from 'redux-first-router-link'
import { Home, Map, Box } from 'react-feather';
import { connect } from 'react-redux'

import List from './../List'
import Modal from './../Modal'
import MapView from './../Map'
import Search from './../Search'

import style from './app.scss'

const Logo = () =>
  <div>
    Logo
  </div>

const Header = () =>
  <div className={style.header}>
    <div className={style.nav}>
      <Link className={style.link} to='/'>
        <Home />
        Home
      </Link>
      <Link className={style.link} to='/rent/'>
          <Box />
          Rent
        </Link>
      <Link className={style.link} to='/map'>
        <Map />
        Map
      </Link>
    </div>
    <Search className={style.navSearch} />
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
    case 'SHOW_RENT':
    case 'SHOW_RENT_MODAL':
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
