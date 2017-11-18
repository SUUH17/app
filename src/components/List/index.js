import React from 'react'
import { connect } from 'react-redux'
import Link from 'redux-first-router-link'

import { getFilteredItems } from './../../store/selectors'

import Search from './../Search'

import styles from './list.scss'

const Item = ({ data, openItem }) =>
  <div
    className={styles.item}
    onClick={() => openItem(data._id)}
  >
    <h4>{data.name}</h4>
  </div>

const List = ({ searchString, filteredItems, openItem }) =>
  <div>
    <Search className={styles.listSearch} />
    <div className={styles.list}>
      {(filteredItems ||  []).map(item => 
        <Item key={item._id} data={item} openItem={openItem} />)}
    </div>
  </div>

const mapStateToProps = state => ({
  searchString: state.search.searchString,
  filteredItems: getFilteredItems(state)
})

const mapDispatchToProps = dispatch => ({
  openItem: id => dispatch({
    type: 'SHOW_RENT_MODAL',
    payload: {
      itemId: id
    }
  })
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
