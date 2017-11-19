import React from 'react'
import { connect } from 'react-redux'

import { logout as logoutAction, login } from './../../store/actions'

import style from './profile.scss'

const getUserNameById = (users, id) => {
  const filtered = (users || []).filter(u =>
    u.id == id
  )
  if (filtered && filtered[0]) {
    return filtered[0].firstName + ' ' + filtered[0].lastName
  }
  return ''
}

const ProfileView = ({ userId, users, logout, login }) =>
  <div className={style.container}>
    <h2>Profile</h2>
    <div className={style.formField}>
      <label>
        {userId ? `Logged in as ${getUserNameById(users, userId)}` : 'Please log in using your cRent credentials'}
      </label>
    </div>
    {userId && <button className={style.cancelButton} onClick={logout}>Logout</button>}
    {!userId && <button className={style.button} onClick={() => login({type: 'HOME'})}>Login</button>}

  </div>

const mapStateToProps = state => ({
  userId: state.user.ownerId,
  users: state.user.users
})

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutAction),
  login: (onSuccessAction) => dispatch({ type: 'SHOW_LOGIN', payload: onSuccessAction })
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileView)
