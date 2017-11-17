import React from 'react'
import { connect } from 'react-redux'
import Link from 'redux-first-router-link'

import styles from './list.scss'

const Item = (props) =>
  <div className={styles.item}>
    Item
    {props.children}
  </div>

const List = () =>
  <div className={styles.list}>
    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(i =>
      <Item key={i} props={{ data: 'dummy' }}>
        <div>index: {i}</div>
        <Link 
          to={{
            type: 'SHOW_ITEM_MODAL', 
            payload: {
              itemType: 'rentable',
              itemId: i
            }
          }}>Open</Link>
      </Item>
    )}
  </div>

export default List
