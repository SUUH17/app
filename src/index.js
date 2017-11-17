import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import store from './store'

const App = () =>
  <div>
    Main app moi siisti juttu
  </div>

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
