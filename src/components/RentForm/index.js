import React from 'react'

import style from './rentForm.scss'

const Form = () =>
  <div className={style.rentalForm}>
    rent asld jlskfj 
  </div>

class RentForm extends React.Component {
  render () {
    return (
      <div className={style.container}>
        <button
          className={style.rentButton}
        >
          Rent
        </button>
      </div>
    )
  }
}

export default RentForm
