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

export const startGetItem = {
  type: 'GET_ITEM_START'
}

export const successGetItem = {
  type: 'GET_ITEM_SUCCESS'
}

export const failedGetItem = {
  type: 'GET_ITEM_FAILED'
}

export function getItem (id) {
  return dispatch => {
    dispatch(startGetItem)
    return fetch(API_BASE + `items/${id}`)
      .then(res => res.json())
      .then(json => {
        dispatch(successGetItem)
        dispatch(addItem(json))
      })
      .catch(err => {
        dispatch(failedGetItem)
      })
  }
}

export function getItems () {
  return dispatch => {
    dispatch(startGetItem)
    return fetch(API_BASE + 'items/')
      .then(res => res.json())
      .then(json => {
        dispatch(successGetItem)
        dispatch(addItems(json))
      })
      .catch(err => {
        dispatch(failedGetItem)
      })
  }
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
    return fetch(API_BASE + 'images/', {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(json => {
        if (json._id) {
          dispatch(successImageUpload)
          return json._id
        }
        return null
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
  console.log(data)
  return dispatch => {
    // first upload image
    // if successfull, continue to upload rental
    dispatch(uploadImage(file))
      .then(imageId => {
        if (!!imageId) {
          const item = {
            ...data,
            imageId
          }
          dispatch(startRentalUpload)
          fetch(API_BASE + 'items/', {
            method: 'POST',
            body: JSON.stringify(item)
          })
            .then(res => res.json())
            .then(json => {
              dispatch(successRentalUpload)
              dispatch(getItems())
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