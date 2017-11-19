import 'whatwg-fetch'

export const closeModal = {
  type: 'CLOSE_MODAL'
}

export const toHome = {
  type: 'HOME'
}

export function dismissModal (paramAction = toHome) {
  return dispatch => {
    dispatch(closeModal)
    if (!paramAction.type) {
      dispatch({ type: 'SHOW_RENTS' })
    } else {
      dispatch(paramAction)
    }
  }
}

export const setSearch = searchString => ({
  type: 'SET_SEARCH',
  value: searchString
})

export const setFilterByYou = bool => ({
  type: 'SET_FILTER_BY_YOU',
  value: bool
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
    return fetch(API_BASE + `items/${id}`, {
      credentials: 'include',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
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
    dispatch(loadUsers())
    dispatch(startGetItem)
    return fetch(API_BASE + 'items/', {
      credentials: 'include',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
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
      credentials: 'include',
      body: formData
    })
      .then(res => res.json())
      .then(json => {
        if (json.id) {
          dispatch(successImageUpload)
          return json.id
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
            credentials: 'include',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
          })
            .then(res => res.json())
            .then(json => {
              dispatch(successRentalUpload)
              dispatch(getItems())
              setTimeout(() => {
                dispatch({ type: 'SHOW_RENTS' }, 1000)
                window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight)
              })
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

export function login (username, password) {
  return dispatch => {
    dispatch({ type: 'LOGIN_START' })
    return fetch(API_BASE + 'auth/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
      .then(res => res.status === 200)
      .then(yes => {
        if (yes) {
          return dispatch({
            type: 'LOGIN_SUCCESS', value: {
              ownerId: getOwnerId()
            }
          })
        } else {
          return Promise.reject()
        }
      })
      .catch(() => dispatch({ type: 'LOGIN_FAILED' }))
  }
}

export function logout () {
  return dispatch => {
    console.log('logging out')
    return fetch(API_BASE + 'auth/logout', {
      method: 'POST',
      credentials: 'include'
    })
      .then(() => {
        dispatch(checkLogin())
      })
  }
}

export function checkLogin () {
  return dispatch => {
    const ownerId = getOwnerId()
    if (ownerId) {
      console.log('has cookie')
      return Promise.resolve(dispatch({
        type: 'LOGIN_SUCCESS', value: {
          ownerId
        }
      }))
    }
    return Promise.resolve()
  }
}

export function cookieToRedux (cookieString) {
  return dispatch => {
    if (cookieString) {
      const ownerId = cookieString.split('session=')[1]
      dispatch({
        type: 'LOGGED_IN', value: {
          ownerId
        }
      })
    } else {
      dispatch({ type: 'NOT_LOGGED_IN' })
    }
  }
}

const getOwnerId = () => {
  const cookie = document.cookie
  if (cookie) {
    return cookie.split('session=')[1]
  }
}

export const startRentAttempt = {
  type: 'RENT_ATTEMPT_START'
}

export const successRentAttempt = {
  type: 'RENT_ATTEMPT_SUCCESS'
}

export const failedRentAttempt = {
  type: 'RENT_ATTEMPT_FAILED'
}

export function attemptRent (id) {
  return dispatch => {
    dispatch(startRentAttempt)
    // try to rent
    return fetch(API_BASE + `loans/borrow/${id}`, {
      method: 'POST',
      credentials: 'include'
    })
      .then(res => res.status === 200)
      .then(yes => {
        if (yes) {
          setTimeout(() => {
            dispatch(successRentAttempt)
            setTimeout(() => {
              dispatch({ type: 'SHOW_RENTS' })
            }, 1000)
            dispatch(getItems())
          }, 2000)
        } else {
          dispatch(failedRentAttempt)
        }
      })
      .catch(err => {
        console.log(err)
        dispatch(failedRentAttempt)
      })
  }
}

export function attemptReturn (id) {
  return dispatch => {
    dispatch(startRentAttempt)
    return fetch(API_BASE + `loans/return/${id}`, {
      method: 'POST',
      credentials: 'include'
    })
      .then(res => res.status === 200)
      .then(yes => {
        if (yes) {
          setTimeout(() => {
            dispatch(successRentAttempt)
            setTimeout(() => {
              dispatch({ type: 'SHOW_MY_OFFERS' })
            }, 1000)
            dispatch(getItems())
          }, 2000)
        } else {
          dispatch(failedRentAttempt)
        }
      })
      .catch(err => {
        console.log(err)
        dispatch(failedRentAttempt)
      })
  }
}

export function loadUsers () {
  return dispatch => {
    return fetch(API_BASE + 'users', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(users => {
        dispatch({ type: 'SET_USERS', value: users })
      })
      .catch(err => {
        console.log(err)
      })
  }
}
