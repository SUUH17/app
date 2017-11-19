import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { connectRoutes } from 'redux-first-router'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'
import queryString from 'query-string'
import { getItems } from './actions'

import { test, modal, search, api, user } from './reducers'

const history = createHistory()

const routesMap = {
  HOME: '/',
  SHOW_LOGIN: '/login',
  SHOW_RENT: '/rent/:itemId',
  SHOW_RENTS: {
    path: '/rent',
    thunk: getItems()
  },
  SHOW_RENT_FORM: '/rent_item/:itemId',
  NEW_RENTAL: '/new_rent',
  SHOW_MAP: '/map',
  SHOW_MY_OFFER: '/my_offers/:itemId',
  SHOW_MY_OFFERS: {
    path: '/my_offers',
    thunk: getItems()
  }
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
  api,
  user
})

const middlewares = applyMiddleware(routeMiddleware, thunk)

const enhancers = compose(
  routeEnhancer,
  middlewares,
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
)

const store = createStore(rootReducer, enhancers)

export default store
