import { createSelector } from 'reselect'
import { getItem } from '../actions/index';

const getSearchString = state => state.search.searchString

const getItems = state => state.api.items

const getItemById = (state, props) => {
  console.log(state, props)
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
