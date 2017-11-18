import fetch from 'whatwg-fetch'

export const closeModal = {
  type: 'CLOSE_MODAL'
}

export const toHome = {
  type: 'HOME'
}

export function dismissModal(action = toHome) {
  return dispatch => {
    dispatch(closeModal)
    dispatch(action)
  }
}

export const setSearch = searchString => ({
  type: 'SET_SEARCH',
  value: searchString
})

export const addItem = (item) => ({
  type: 'ADD_ITEM',
  value: { item }
})

export const addItems = (items) => ({
  type: 'ADD_ITEMS',
  value: { items }
})

export function getItem(id) {
  // load from api @ localhost:5000/item/:id
  return fetch(API_BASE + `items/${id}`)
    .then(res => res.json())
    .then(json => 
      console.log(json)
      // dispatch(addItem(item))
    )
}

export function getItems() {
  // load from api @ localhost:5000/item/:id
  return fetch(API_BASE + 'items/')
    .then(res => res.json())
    .then(json => 
      console.log(json)
      // dispatch(addItems(items))
    )
}
