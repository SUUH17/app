import 'whatwg-fetch'

export const closeModal = {
  type: 'CLOSE_MODAL'
}

export const toHome = {
  type: 'HOME'
}

export function dismissModal (action = toHome) {
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
  type: 'SET_ITEMS',
  value: { items }
})

export function getItem (id) {
  return dispatch =>
    fetch(API_BASE + `items/${id}`)
      .then(res => res.json())
      .then(json =>
        dispatch(addItem(json))
      )
}

export function getItems () {
  return dispatch =>
    fetch(API_BASE + 'items/')
      .then(res => res.json())
      .then(json =>
        dispatch(addItems(json))
      )
}
