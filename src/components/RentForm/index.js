import React from 'react'
import { connect } from 'react-redux'
import { Loader } from 'react-feather'

import Field from './../Field'
import ItemInfo from './../ItemInfo'

import { attemptRent } from './../../store/actions'

import style from './rentForm.scss'

class RentForm extends React.Component {
  constructor() {
    super()
    this.state = {
      checked: false
    }
  }
  onChecked = (e) => {
    this.setState({ checked: e.target.checked })
  }
  render () {
    const { itemId, rent, renting, rentingSuccess, rentingFailed, loggedIn } = this.props
    return (
      <div className={style.container}>
        <h2>cRent</h2>
        <h3>
          This Agreement is entered into between [ITEM OWNER] (“Rentee”) and [RENTER] (“Renter”) (collectively the “Parties”) and outlines the respective rights and obligations of the Parties relating to the rental of the item.
        </h3>
        <div className={style.rentalForm}>
          <div className={style.formField}>
            <label>Parties</label>
            <div className={style.parties}>
              <span><strong>Rentee:{' '}</strong>Matti Parkkila</span>
              <span><strong>Renter:{' '}</strong>Aleksi Jokela</span>
            </div>
          </div>

          <ItemInfo id={itemId} />

          <div className={style.acceptance}>
            <input
              type="checkbox"
              checked={this.state.checked}
              onChange={this.onChecked}
            />
            <label>I accept the terms of this agreement.</label>
          </div>

        </div>
        <div className={style.rentAction}>
          {renting && <Loader />}
          <button
            className={style.rentButton}
            onClick={() => rent(itemId)}
            disabled={!this.state.checked}
          >
            {renting && 'Renting...'}
            {rentingSuccess && 'Success'}
            {rentingFailed && 'Renting failed'}
            {(!renting && !rentingSuccess && !rentingFailed) && 'Rent'}
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  itemId: state.location.payload.itemId,
  renting: state.api.renting,
  loggedIn: state.user.loggedIn,
  rentingSuccess: state.api.rentingSuccess,
  rentingFailed: state.api.rentingFailed
})

const mapDispatchToProps = dispatch => ({
  rent: (id) => dispatch(attemptRent(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(RentForm)
