import React from 'react'
import { connect } from 'react-redux'
import Link from 'redux-first-router-link'

import { getFilteredItems } from './../../store/selectors'

import Search from './../Search'

import styles from './list.scss'

const Item = ({data}) =>
  <div className={styles.item}>
    Item
    <div>{data.name}</div>
    <Link
      to={{
        type: 'SHOW_RENT_MODAL',
        payload: {
          itemId: data.id
        }
      }}>Open</Link>
  </div>

const List = ({searchString, filteredItems}) =>
  <div>
    <Search className={styles.listSearch} />
    <div className={styles.list}>
      { (filteredItems || []).map(item => <Item data={item} />) }
    </div>
  </div>

const mapStateToProps = state => ({
  searchString: state.search.searchString,
  filteredItems: getFilteredItems(state)
})

export default connect(mapStateToProps)(List)
