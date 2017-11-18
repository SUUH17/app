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

export const startImageUpload = {
  type: 'IMAGE_UPLOAD_START'
}

export const successImageUpload = {
  type: 'IMAGE_UPLOAD_SUCCESS'
}

export const failedImageUpload = {
  type: 'IMAGE_UPLOAD_FAILED'
}

export function uploadImage (file) {
  return dispatch => {
    const formData = new FormData()
    formData.append('image', file)
    dispatch(startImageUpload)
    return fetch(API_DATA + 'images/', {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(json => {
        dispatch(successImageUpload)
        console.log(json)
        // return image id
        return true
      })
      .catch(err => {
        dispatch(failedImageUpload)
        return Promise.reject()
      })
  }
}

export const startRentalUpload = {
  type: 'RENTAL_UPLOAD_START'
}

export const successRentalUpload = {
  type: 'RENTAL_UPLOAD_SUCCESS'
}

export const failedRentalUpload = {
  type: 'RENTAL_UPLOAD_FAILED'
}

export function uploadRental (data, file) {
  return dispatch => {
    // first upload image
    // if successfull, continue to upload rental
    dispatch(uploadImage(file))
      .then(res => {
        if (res) {
          console.log(res)
          // res should be image id
          // upload rental item with image id
          const imageId = '0'
          const item = {
            ...data,
            imageId
          }
          dispatch(startRentalUpload)
          fetch(API_BASE + 'items/', {
            method: 'POST',
            body: item
          })
            .then(res => res.json())
            .then(json => {
              const item = json
              dispatch(successRentalUpload)
              dispatch(addItem(item))
            })
            .catch(dispatch(failedRentalUpload))
        }
      })
      .catch(err => {
        console.log(err)
        console.log('cant upload rental')
      })
  }
}