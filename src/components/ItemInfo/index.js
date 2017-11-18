import React from 'react'
import { connect } from 'react-redux'

import { selectItem } from './../../store/selectors'

import style from './itenInfo.scss'

const mapStateToProps = (state, props) => ({
  item: selectItem(state, props)
})

const ItemInfo = ({ itemId, item }) =>
  <div className={style.formField}>
    <label>Item information</label>
    <div className={style.infoTable}>
      <span><strong>Name:</strong> {item.name}</span>
      <span><strong>Location:</strong> {item.location}</span>
      <span><strong>Price:</strong> {item.price + ' €/h'}</span>
      <span><strong>Maximum liability:</strong> {item.collateral + ' €'}</span>
      <span><strong>Available:</strong> {item.available ? 'yes' : 'no'}</span>
      <span><strong>Identifier:</strong> {item.id}</span>
    </div>
  </div>

export default connect(mapStateToProps)(ItemInfo)
