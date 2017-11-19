import React from 'react'
import { connect } from 'react-redux'
import Link from 'redux-first-router-link'

import { getFilteredItems } from './../../store/selectors'
import { setFilterByYou } from './../../store/actions'

import Search from './../Search'

import styles from './list.scss'

const Item = ({ data, openItem, prev }) =>
  <div
    className={styles.item}
    onClick={() => {
      console.log(prev)
      let type = 'SHOW_RENTS'
      if (prev.type === 'SHOW_RENTS') {
        type = 'SHOW_RENT'
      } else if (prev.type === 'SHOW_MY_OFFERS') {
        type = 'SHOW_MY_OFFER'
      }
      openItem(data.id, type)
    }}
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

const List = ({ searchString, filteredItems, openItem, setFilter, filter, ownId, prev }) =>
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
          return (item.ownerId == filter.ownerId && item.available == filter.available)
        })
        .map(item => 
        <Item key={item.id} ownId={ownId} data={item} openItem={openItem} prev={prev} />)}
    </div>
  </div>

const mapStateToProps = state => ({
  searchString: state.search.searchString,
  filteredItems: getFilteredItems(state),
  prev: state.location
})

const mapDispatchToProps = dispatch => ({
  openItem: (id, type) => dispatch({
    type,
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
