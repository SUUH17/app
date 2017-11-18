import React from 'react'
import { connect } from 'react-redux'

import Field from './../Field'
import ItemInfo from './../ItemInfo'

import {  attemptRent } from './../../store/actions'

import style from './rentForm.scss'

class RentForm extends React.Component {
  constructor() {
    super()
    this.state = {

    }
  }
  render () {
    const { itemId, rent, renting, rentingSuccess, rentingFailed } = this.props
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
          onClick={() => rent(itemId)}
        >Accept & Rent
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  itemId: state.location.payload.itemId,
  renting: state.api.renting,
  rentingSuccess: state.api.rentingSuccess,
  rentingFailed: state.api.rentingFailed
})

const mapDispatchToProps = dispatch => ({
  rent: (id) => dispatch(attemptRent(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(RentForm)
