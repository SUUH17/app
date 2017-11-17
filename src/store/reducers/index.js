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
    case 'SHOW_ITEM_MODAL':
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
