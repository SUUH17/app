import React from 'react'
import { NavLink } from 'redux-first-router-link'
import { Home, Box, FilePlus, User, Activity } from 'react-feather';
import { connect } from 'react-redux'

import List from './../List'
import Modal from './../Modal'
import MapView from './../Map'
import Search from './../Search'
import NewRent from './../NewRent'
import ProfileView from './../ProfileView'

import { cookieToRedux } from './../../store/actions'

import style from './app.scss'

const Logo = () =>
  <div className={style.logo}>
    CameraRent
  </div>

const Header = ({ page, userId }) =>
  <div className={style.header}>
    <div className={style.nav}>
      { false && <NavLink
        activeClassName={style.activeLink}
        exact={true}
        className={style.link} to={{ type: 'NEW_RENTAL' }}>
        <FilePlus />
        New rental
      </NavLink>}
      <Logo />
      <NavLink
        activeClassName={style.activeLink}
        className={style.link} to={{ type: 'SHOW_RENTS' }}>
        <Box />
        Rents
      </NavLink>
      { userId && <NavLink
        activeClassName={style.activeLink}
        className={style.link} to={{ type: 'SHOW_MY_OFFERS' }}>
        <Activity />
        Rented
      </NavLink> }
      <NavLink
        activeClassName={style.activeLink}
        exact
        className={style.link} to={{ type: 'HOME' }}>
        <User />
        Profile
      </NavLink>
    </div>
    {(page.indexOf('SHOW_RENTS') >= 0 || page === 'SHOW_MY_OFFERS') && <Search className={style.navSearch} />}
  </div>

const getView = (page, ownerId) => {
  switch (page) {
    case 'HOME':
      return <ProfileView />
    case 'SHOW_MAP':
      return <Map />
    case 'SHOW_RENTS':
    case 'SHOW_RENT':
      return <List />
    case 'SHOW_MY_OFFER':
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
    <Header page={page} userId={ownId} />
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
