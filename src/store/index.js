import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { connectRoutes } from 'redux-first-router'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import queryString from 'query-string'

import {test, modal, search, api} from './reducers'

const history = createHistory()

const routesMap = {
  HOME: '/',
  SHOW_RENT_MODAL: '/rent/:itemId',
  SHOW_RENT: '/rent',
  SHOW_MAP: '/map'
}

const {
  reducer: routeReducer,
  middleware: routeMiddleware,
  enhancer: routeEnhancer
} = connectRoutes(
    history, 
    routesMap, 
    {
      querySerializer: queryString
    }
  )

const rootReducer = combineReducers({
  location: routeReducer,
  test,
  modal,
  search,
  api
})

const middlewares = applyMiddleware(routeMiddleware, thunk)

const enhancers = compose(
  middlewares,
  routeEnhancer,
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
)

const store = createStore(rootReducer, enhancers)

export default store
