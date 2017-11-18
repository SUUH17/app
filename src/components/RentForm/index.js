import React from 'react'

import Field from './../Field'

import style from './rentForm.scss'

const Form = () =>
  <div className={style.rentalForm}>
    rent asld jlskfj
  </div>

class RentForm extends React.Component {
  constructor() {
    super()
    this.state = {

    }
  }
  render () {
    return (
      <div className={style.container}>
        <div className={style.rentalForm}>
          <div className={style.formField}>
            <span></span>
          </div>
        </div>
        <button
          className={style.rentButton}
        >Accept
        </button>
      </div>
    )
  }
}

export default RentForm
