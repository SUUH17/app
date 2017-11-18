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

export const user = (state = { ownerId: '', loggedIn: false, error: false }, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        loggedIn: false,
        error: false
      }
    case 'LOGIN_SUCCESS':
    case 'LOGGED_IN':
      return {
        ...state,
        ownerId: action.value.ownerId,
        loggedIn: true,
        error: false
      }
    case 'LOGIN_FAILED':
    case 'NOT_LOGGED_IN':
      return {
        ...state,
        ownerId: undefined,
        loggedIn: false,
        error: true
      }
    default:
      return state
  }
}

export const modal = (state = { visible: false }, action) => {
  switch (action.type) {
    case 'SHOW_RENT_MODAL':
    case 'SHOW_LOGIN':
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

export const api = (state = { items: [], loading: false, error: false }, action) => {
  switch (action.type) {
    case 'GET_ITEM_START':
      return {
        ...state,
        loading: true,
        error: false
      }
    case 'GET_ITEM_SUCCESS':
      return {
        ...state,
        loading: false,
        error: false
      }
    case 'GET_ITEM_FAILED':
      return {
        ...state,
        loading: false,
        error: true
      }
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
