import React from 'react'
import { connect } from 'react-redux'
import { XCircle as CrossIcon } from 'react-feather'

import { setSearch } from './../../store/actions'

import style from './search.scss'

const Search = ({ className, searchString, setSearchString }) =>
  <div className={style.searchInput + ' ' + className}>
    <input type="text" placeholder="search..." value={searchString} onChange={e => setSearchString(e.target.value)} />
    <CrossIcon 
      className={style.cross} 
      style={{ opacity: !searchString ? 0 : 1 }}
      onClick={() => setSearchString('')}/>
  </div>

const mapStateToProps = state => ({
  searchString: state.search.searchString
})

const mapDispatchToProps = dispatch => ({
  setSearchString: string => dispatch(setSearch(string))
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)
