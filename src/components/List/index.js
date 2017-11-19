import React from 'react'
import { connect } from 'react-redux'
import Link from 'redux-first-router-link'

import { getFilteredItems } from './../../store/selectors'
import { setFilterByYou } from './../../store/actions'

import Search from './../Search'

import styles from './list.scss'

const Item = ({ data, openItem }) =>
  <div
    className={styles.item}
    onClick={() => openItem(data.id)}
  >
    <div className={styles.imageContainer}>
      <img 
        className={styles.image} 
        src={API_BASE + `images/${data.imageId}`}
        style={{
          filter: !data.available ? 'blur(10px)' : undefined
        }}
      />
      {!data.available && <span>RENTED</span>}
    </div>
    <div className={styles.infoContainer}>
      <h4>{data.name}</h4>
      <span className={styles.price}>{data.price + ' €/h'}</span>
      <div>{data.location}</div>
    </div>
  </div>

const List = ({ searchString, filteredItems, openItem, setFilter, filter }) =>
  <div>
    <Search className={styles.listSearch} />
    { false && <div className={styles.setFilter}>
        <button>Others</button>
        <button>Mine</button>
    </div> }
    <div className={styles.list}>
      {(filteredItems ||  [])
        .filter(item => {
          if (!item || !filter || !filter.ownerId) {
            return item
          }
          return item.ownerId == filter.ownerId
        })
        .map(item => 
        <Item key={item.id} data={item} openItem={openItem} />)}
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
  }),
  setFilter: bool => dispatch({
    type: 'SET_FILTER_BY_YOU',
    value: bool
  })
})

export default connect(mapStateToProps, mapDispatchToProps)(List)
