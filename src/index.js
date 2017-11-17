import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import Link from 'redux-first-router-link'

import store from './store'

const App = () =>
  <div>
    Main app moi siisti juttu
    
    <Link to='/items/53412'>test</Link>
    <Link to='/'>home</Link>
  </div>

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
