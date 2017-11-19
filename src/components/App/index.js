import React from 'react'
import { NavLink } from 'redux-first-router-link'
import { Home, Box, FilePlus, User } from 'react-feather';
import { connect } from 'react-redux'

import List from './../List'
import Modal from './../Modal'
import MapView from './../Map'
import Search from './../Search'
import NewRent from './../NewRent'

import { cookieToRedux } from './../../store/actions'

import style from './app.scss'

const Logo = () =>
  <div>
    Logo
  </div>

const Header = ({ page }) =>
  <div className={style.header}>
    <div className={style.nav}>
      <NavLink
        activeClassName={style.activeLink}
        exact={true}
        className={style.link} to={{ type: 'NEW_RENTAL' }}>
        <FilePlus />
        New rental
      </NavLink>
      <NavLink
        activeClassName={style.activeLink}
        className={style.link} to={{ type: 'SHOW_RENT' }}>
        <Box />
        Rents
      </NavLink>
      <NavLink
        activeClassName={style.activeLink}
        className={style.link} to={{ type: 'SHOW_MY_OFFERS' }}>
        <User />
        Rented
    </NavLink>
    </div>
    {(page.indexOf('SHOW_RENT') >= 0 || page === 'SHOW_MY_OFFERS') && <Search className={style.navSearch} />}
  </div>

const HomeView = () =>
  <div>
    <h1>Welcome to Suuh</h1>
  </div>

const getView = (page, ownerId) => {
  switch (page) {
    case 'HOME':
      return <HomeView />
    case 'SHOW_MAP':
      return <Map />
    case 'SHOW_RENT':
    case 'SHOW_RENT_MODAL':
      return <List />
    case 'SHOW_MY_OFFERS':
      return <List filter={{ownerId, available: 0}} />
    case 'NEW_RENTAL':
      return <NewRent />
    default:
      return <List />
  }
}

const App = ({ page, cookieToRedux, ownId}) => {
  cookieToRedux(document.cookie)
  return <div>
    <Header page={page} />
    <div className={style.content}>
      {getView(page, ownId)}
    </div>
    <Modal />
  </div>
}

const mapStateToProps = state => ({
  page: state.location.type,
  ownId: state.user.ownerId
})

const mapDispatchToProps = dispatch => ({
  cookieToRedux: (cookie) => dispatch(cookieToRedux(cookie))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
