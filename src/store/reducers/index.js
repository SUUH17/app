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

export const user = (state = { ownerId: '', loggedIn: false, error: false, users: []}, action) => {
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
    case 'LOGGED_OUT':
    case 'NOT_LOGGED_IN':
      return {
        ...state,
        ownerId: undefined,
        loggedIn: false,
        error: true
      }
    case 'SET_USERS':
      return {
        ...state,
        users: action.value
      }
    default:
      return state
  }
}

export const modal = (state = { visible: false }, action) => {
  switch (action.type) {
    case 'SHOW_RENT':
    case 'SHOW_LOGIN':
    case 'SHOW_RENT_FORM':
    case 'SHOW_MY_OFFER':
      return {
        ...state,
        visible: true
      }
    case 'SHOW_RENTS':
    case 'SHOW_MY_OFFERS':
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
    case 'SET_FILTER_BY_YOU':
      return {
        ...state,
        filterOwn: action.value
      }
    default:
      return state
  }
}

export const api = (state = { 
    items: [],
    apiLoading: false,
    apiError: false,
    uploading: false,
    uploadError: false,
    uploadSuccess: false,
    renting: false,
    rentingError: false,
    rentingSuccess: false
  }, action) => {
  switch (action.type) {
    case 'GET_ITEM_START':
      return {
        ...state,
        apiLoading: true,
        apiError: false
      }
    case 'GET_ITEM_SUCCESS':
      return {
        ...state,
        apiLoading: false,
        apiError: false
      }
    case 'GET_ITEM_FAILED':
      return {
        ...state,
        apiLoading: false,
        apiError: true
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
    case 'SHOW_RENTS':
    case 'SHOW_MY_OFFERS':
      return {
        ...state,
        uploading: false,
        uploadError: false,
        uploadSuccess: false
      }
    case 'RENTAL_UPLOAD_START':
      return {
        ...state,
        uploading: true,
        uploadError: false,
        uploadSuccess: false
      }
    case 'RENTAL_UPLOAD_SUCCESS':
      return {
        ...state,
        uploading: false,
        uploadError: false,
        uploadSuccess: true
      }
    case 'RENTAL_UPLOAD_FAILED':
      return {
        ...state,
        uploading: false,
        uploadError: true,
        uploadSuccess: false
      }
    case 'RENT_ATTEMPT_START':
      return {
        ...state,
        renting: true,
        rentingError: false,
        rentingSuccess: false
      }
    case 'RENT_ATTEMPT_SUCCESS':
      return {
        ...state,
        renting: false,
        rentingError: false,
        rentingSuccess: true
      }
    case 'RENT_ATTEMPT_FAILED':
      return {
        ...state,
        renting: false,
        rentingError: true,
        rentingSuccess: false
      }
    default:
      return state
  }
}
