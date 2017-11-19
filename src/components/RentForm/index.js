import React from 'react'
import { connect } from 'react-redux'
import { Loader } from 'react-feather'

import Field from './../Field'
import ItemInfo from './../ItemInfo'

import { getItemById } from './../../store/selectors'
import { attemptRent } from './../../store/actions'

import style from './rentForm.scss'

const getUserNameById = (users, id) => {
  const filtered = (users || []).filter(u =>
    u.id == id
  )
  if (filtered && filtered[0]) {
    return filtered[0].firstName + ' ' + filtered[0].lastName
  }
  return ''
}
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
    const { itemId, rent, renting, rentingSuccess, rentingFailed, loggedIn, ownId, users, item } = this.props
    const rentee = getUserNameById(users, item.ownerId)
    const renter = getUserNameById(users, ownId)

    return (
      <div className={style.container}>
        <h2>cRent</h2>
        <h3>
          This Agreement is entered into between <b className={style.rentee}>{rentee}</b> (“Rentee”) and <b className={style.renter}>{renter}</b> (“Renter”) (collectively the “Parties”) and outlines the respective rights and obligations of the Parties relating to the rental of the item.
        </h3>
        <div className={style.rentalForm}>
          <div className={style.formField}>
            <label>Parties</label>
            <div className={style.parties}>
              <span><strong>Rentee:{' '}</strong>{rentee}</span>
              <span><strong>Renter:{' '}</strong>{renter}</span>
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
  users: state.user.users,
  ownId: state.user.ownerId,
  itemId: state.location.payload.itemId,
  item: getItemById(state, { id: state.location.payload.itemId }),
  renting: state.api.renting,
  loggedIn: state.user.loggedIn,
  rentingSuccess: state.api.rentingSuccess,
  rentingFailed: state.api.rentingFailed,
})

const mapDispatchToProps = dispatch => ({
  rent: (id) => dispatch(attemptRent(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(RentForm)
