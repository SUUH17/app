import React from 'react'
import { connect } from 'react-redux'

import {  login } from './../../store/actions'

import styles from './login.scss'

const Field = ({ field, label, type, handler }) =>
  <div className={styles.formField}>
    <span>{label}</span>
    <input type={type} onChange={handler(field)} />
  </div>

class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: ''
    }
  }
  handleInput = (key) =>
    event =>
      this.setState({
        [key]: event.target.value
      })
  handleSubmit = () => {
    const { username, password } = this.state
    const { type, payload } = this.props.prev
    if (!!username && !!password) {
      this.props.postLogin(username, password)
        .then(() => this.props.goBack(type, payload))
    }
  }
  render () {
    return (
      <div className={styles.container}>
        <h2>Login</h2>
        <span>Use your eRent credentials</span>
        <div className={styles.loginForm}>
          <Field field="username" type="text" handler={this.handleInput} label="Username" />
          <Field field="password" type="password" handler={this.handleInput} label="Password" />
          <button
            className={styles.button}
            onClick={this.handleSubmit}
          >
            Login
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  prev: state.location.prev
})

const mapDispatchToProps = (dispatch, props) => ({
  postLogin: (username, password) => dispatch(login(username, password)),
  goBack: (type, payload) => dispatch({ type, payload })
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
