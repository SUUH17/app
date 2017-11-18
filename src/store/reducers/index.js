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

export const search = (state = { searchString: 'moi' }, action) => {
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

const initialApi = {
  items: [
    {
      name: 'Vasara'
    },
    {
      name: 'Iso vasara'
    },
    {
      name: 'Vanha vasara'
    },
    {
      name: 'Hammer'
    },
    {
      name: 'Nuija'
    },
    {
      name: 'Porakone'
    },
    {
      name: 'Akkuporakone'
    },
    {
      name: 'Drill'
    },
    {
      name: 'Pneumatic drill'
    }
  ].map((i, idx) => ({ ...i, id: idx }))
}

export const api = (state = initialApi, action) => {
  return state
}
