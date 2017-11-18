import React from 'react'
import { connect } from 'react-redux'

import { setSearch } from './../../store/actions'

import style from './search.scss'

const Search = ({ className, searchString, setSearchString }) =>
  <div className={style.searchInput + ' ' + className}>
    <input type="text" placeholder="search..." value={searchString} onChange={e => setSearchString(e.target.value)} />
  </div>

const mapStateToProps = state => ({
  searchString: state.search.searchString
})

const mapDispatchToProps = dispatch => ({
  setSearchString: string => dispatch(setSearch(string))
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)
