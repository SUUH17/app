const initialState = {
  dummy: 'dummy',
  modalContent: ''
}

export const test = (state = initialState, action) => {
  switch (action.type) {
    case 'TEST':
      return {
        ...state,
        [action.key]: action.value
      }
    default:
      return state
  }
}

export const modal = (state = { visible: false }, action) => {
  switch (action.type) {
    case 'SHOW_RENT_MODAL':
      return {
        ...state,
        visible: true
      }
    case 'CLOSE_MODAL':
      return {
        ...state,
        visible: false
      }
    default:
      return state
  }
}

export const search = (state = { searchString: '' }, action) => {
  switch (action.type) {
    case 'SET_SEARCH':
      return {
        ...state,
        searchString: action.value
      }
    default:
      return state
  }
}

export const api = (state = { items: [] }, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        items: [
          ...state.items,
          action.value.item
        ]
      }
    case 'SET_ITEMS':
      return {
        ...state,
        items: action.value.items
      }
    default:
      return state
  }
}
