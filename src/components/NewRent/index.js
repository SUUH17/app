import React from 'react'

import styles from './newRent.scss'

const NewRent = () =>
  <div className={styles.container}>
    <h2>Create new rental</h2>
    <div className={styles.rentalForm}>

      <div className={styles.formField}>
        <span>Item name</span>
        <input type="text" placeholder="name" />
      </div>

      <div className={styles.formField}>
        <span>Address</span>
        <input type="text" placeholder="address" />
      </div>

      <div className={styles.formField}>
        <span>Price per hour</span>
        <input type="number" placeholder="price" />
      </div>

      <div className={styles.formField}>
        <span>Collateral</span>
        <input type="number" placeholder="collateral" />
      </div>
    </div>

    <button className={styles.button}>Create</button>
  </div>

export default NewRent

/**
 * 
 * 
    Address
    Picture
    Price per hour
    Collateral
 */