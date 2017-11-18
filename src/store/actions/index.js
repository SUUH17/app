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
