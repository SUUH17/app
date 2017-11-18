import React from 'react'
import { connect } from 'react-redux'

import Field from './../Field'
import ItemInfo from './../ItemInfo'

import style from './rentForm.scss'

class RentForm extends React.Component {
  constructor() {
    super()
    this.state = {

    }
  }
  render () {
    const {  itemId } = this.props
    return (
      <div className={style.container}>
        <h2>Rent</h2>
        <h3>Accept conditions</h3>
        <div className={style.rentalForm}>
          <div className={style.formField}>
            <label>Parties</label>
            <div className={style.parties}>
              <span><strong>Rentee:{' '}</strong>Matti Parkkila</span>
              <span><strong>Renter:{' '}</strong>Aleksi Jokela</span>
            </div>
          </div>

          <ItemInfo id={itemId} />

        </div>
        <button
          className={style.rentButton}
        >Accept
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  itemId: state.location.payload.itemId
})

export default connect(mapStateToProps)(RentForm)
