import React from 'react'

import styles from './field.scss'

const Field = ({ field, label, type, handler, state }) =>
  <div className={styles.formField}>
    <span>{label}</span>
    <input type={type} onChange={handler(field)} value={state} />
  </div>

export default Field
