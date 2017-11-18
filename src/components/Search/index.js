import React from 'react'

import style from './search.scss'

const Search = ({className}) =>
  <div className={style.searchInput + ' ' + className}>
    <input type="text" placeholder="search..."/>
  </div>

export default Search
