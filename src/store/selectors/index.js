import { createSelector } from 'reselect'
import { getItem } from '../actions/index';

const getSearchString = state => state.search.searchString

const getItems = state => state.api.items

export const getItemById = (state, props) => {
  const items = state.api.items
  const filtered = items.filter(it =>
    it.id === props.id
  )
  return filtered[0] || {}
}

export const getFilteredItems = createSelector(
  [getSearchString, getItems],
  (searchString, items) =>
    items.filter(item =>
      !searchString || itemMatch(item, searchString)
    )
)

export const selectItem = createSelector(
  [getItemById],
  item => item
)

const itemMatch = (i, s) => {
  if (s) {
    return i.name.toLowerCase().indexOf(s.toLowerCase()) >= 0
    || i.location.toLowerCase().indexOf(s.toLowerCase()) >= 0
  }
}

const getUsers = state => state.user.users

export const getUserById = (state, props) => {
  const filtered = getUsers(state).filter(it =>
    it.id === props.ownerId
  )
  return filtered[0] || {}
}
