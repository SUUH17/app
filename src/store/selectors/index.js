import { createSelector } from 'reselect'

const getSearchString = state => state.search.searchString

const getItems = state => state.api.items

export const getFilteredItems = createSelector(
  [getSearchString, getItems],
  (searchString, items) =>
    items.filter(item => {
      console.log(searchString, item)
      return !searchString || item.name.toLowerCase().indexOf(searchString.toLowerCase()) >= 0
    })
)
