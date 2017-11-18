import React from 'react'
import { connect } from 'react-redux'
import { ArrowLeft, Loader } from 'react-feather'
import classNames from 'classnames'

import Login from './../Login'
import RentForm from './../RentForm'
import { dismissModal } from '../../store/actions'
import { selectItem } from '../../store/selectors'

import ItemInfo from './../ItemInfo'

import style from './modal.scss'

const LoginModal = ({ dismiss }) =>
  <div>
    <div className={style.modalHeader}>
      <ArrowLeft onClick={dismiss} />
    </div>
    <div className={style.loginContent}>
      <Login />
    </div>
  </div>

const RentModal = ({ dismiss }) =>
  <div className={style.flexContainer}>
    <div className={style.modalHeader}>
      <ArrowLeft onClick={dismiss} />
    </div>
    <div className={style.modalContent}>
      <RentForm />
    </div>
  </div>

const ItemModal = ({ data, dismiss, openRent, ownId }) =>
  <div className={style.flexContainer}>
    <div className={style.modalHeader}>
      <ArrowLeft onClick={dismiss} />
    </div>
    {data.id ? (<div className={style.modalContent}>
      <div
        className={style.imageContainer}
        style={{
          backgroundImage: `url(${API_BASE}images/${data.imageId})`
        }}
      >
      </div>
      <div className={style.infoContainer}>
        <div className={style.infoHeader}>
          <h2>{data.name}</h2>
          <span className={style.price}>{data.price + ' €/h'}</span>
        </div>
        <ItemInfo id={data.id} />
        { (data.ownerId != ownId) ? <button
          className={style.superRentButton}
          onClick={() => openRent(data.id)}
        >
          Rent
      </button> : <span className={style.yourInfo}>Offered by you</span> }
      </div>
    </div>) : (
        <div className={style.loading}>
          <Loader className={style.spinner} size={60} />
        </div>
      )}
  </div>

const mapItemStateToProps = (state, props) => ({
  data: selectItem(state, props),
  ownId: state.user.ownerId
})

const mapItemDispatchToProps = dispatch => ({
  openRent: (itemId) => dispatch({ type: 'SHOW_RENT_FORM', payload: { itemId } })
})

const RentalItemModal = connect(mapItemStateToProps, mapItemDispatchToProps)(ItemModal)

const ModalContainer = ({ visible, itemId, dismiss, location }) =>
  visible
    ? <div className={style.modalContainer}>
      <div
        className={style.backdrop}
        onClick={dismiss}
      ></div>
      <div className={style.modal}>
        {location === 'SHOW_LOGIN' &&
          <LoginModal dismiss={dismiss} />}
        {location === 'SHOW_RENT_MODAL' &&
          <RentalItemModal dismiss={dismiss} id={itemId} />}
        {location === 'SHOW_RENT_FORM' && 
          <RentModal dismiss={dismiss} />
        }
      </div>
    </div>
    : null

const mapStateToProps = state => ({
  visible: state.modal.visible,
  itemId: state.location.payload.itemId,
  location: state.location.type
})

const mapDispatchToProps = dispatch => ({
  dismiss: () => dispatch(dismissModal({ type: 'SHOW_RENT' }))
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalContainer)
