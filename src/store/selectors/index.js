import { createSelector } from 'reselect'
import { getItem } from '../actions/index';

const getSearchString = state => state.search.searchString

const getItems = state => state.api.items

const getItemById = (state, props) => {
  const items = state.api.items
  const filtered = items.filter(it =>
    it._id === props.id
  )
  return filtered[0] || {}
}

export const getFilteredItems = createSelector(
  [getSearchString, getItems],
  (searchString, items) =>
    items.filter(item => {
      return !searchString || (item.available && item.name.toLowerCase().indexOf(searchString.toLowerCase()) >= 0)
    })
)

export const selectItem = createSelector(
  [getItemById],
  item => item
)