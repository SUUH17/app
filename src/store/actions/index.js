export const closeModal = {
  type: 'CLOSE_MODAL'
}

export const toHome = {
  type: 'HOME'
}

export function dismissModal() {
  return dispatch => {
    dispatch(closeModal)
    dispatch(toHome)
  }
}
