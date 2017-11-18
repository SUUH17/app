import React from 'react'
import { connect } from 'react-redux'

import { login } from './../../store/actions'

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
    if (!!username && !!password) {
      this.props.postLogin(username, password)
    }
  }
  render () {
    return (
      <div className={styles.container}>
        <h2>Login</h2>
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

const mapDispatchToProps = dispatch => ({
  postLogin: (username, password) => dispatch(login(username, password))
})

export default connect(null, mapDispatchToProps)(Login)
