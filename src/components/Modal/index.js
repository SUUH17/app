import React from 'react'
import { connect } from 'react-redux'
import { ArrowLeft, Loader } from 'react-feather'
import classNames from 'classnames'

import Login from './../Login'
import RentForm from './../RentForm'
import { dismissModal, attemptReturn } from '../../store/actions'
import { selectItem } from '../../store/selectors'

import ItemInfo from './../ItemInfo'

import style from './modal.scss'

const LoginModal = ({ dismiss, prev }) =>
  <div>
    <div className={style.modalHeader}>
      <ArrowLeft onClick={() => dismiss(prev)} />
    </div>
    <div className={style.loginContent}>
      <Login />
    </div>
  </div>

const RentModal = ({ dismiss, prev }) =>
  <div className={style.flexContainer}>
    <div className={style.modalHeader}>
      <ArrowLeft onClick={() => dismiss(prev)} />
    </div>
    <div className={style.modalContent}>
      <RentForm />
    </div>
  </div>

const ItemModal = ({ data, dismiss, openRent, ownId, loggedIn, goToLogin, returnItem, prev }) =>
  <div className={style.flexContainer}>
    <div className={style.modalHeader}>
      <ArrowLeft onClick={() => dismiss(prev)} />
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
        {
          (data.ownerId != ownId)
            ? <span className={style.rentOptions}>
              {!!data.available ?
                <button
                  className={style.superRentButton}
                  onClick={() => {
                    if (!loggedIn) {
                      goToLogin({ type: 'SHOW_RENT_FORM', payload: { itemId: data.id } })
                    } else {
                      openRent(data.id)
                    }
                  }}
                >
                  Rent with cRent
                </button> : <span className={style.yourInfo}>
                  Not available
                </span>}
            </span>
            : (<span className={style.yourInfo}>
              Offered by you.
              {!data.available && <div>
                <button
                  className={style.redButton}
                  onClick={() => returnItem(data.id)}
                >
                  Reject
                </button>
                <button
                  className={style.superRentButton}
                  onClick={() => returnItem(data.id)}
                >
                  Return
                  </button>
              </div>}
            </span>)
        }
      </div>
    </div>) : (
        <div className={style.loading}>
          <Loader className={style.spinner} size={60} />
        </div>
      )}
  </div>

const mapItemStateToProps = (state, props) => ({
  data: selectItem(state, props),
  ownId: state.user.ownerId,
  loggedIn: state.user.loggedIn
})

const mapItemDispatchToProps = dispatch => ({
  openRent: (itemId) => dispatch({ type: 'SHOW_RENT_FORM', payload: { itemId } }),
  goToLogin: (onSuccessAction) =>
    dispatch({ type: 'SHOW_LOGIN', payload: onSuccessAction }),
  returnItem: (itemId) => dispatch(attemptReturn(itemId))
})

const RentalItemModal = connect(mapItemStateToProps, mapItemDispatchToProps)(ItemModal)

const ModalContainer = ({ visible, itemId, dismiss, location, prev }) =>
  visible
    ? <div className={style.modalContainer}>
      <div
        className={style.backdrop}
        onClick={() => dismiss(prev)}
      ></div>
      <div className={style.modal}>
        {location === 'SHOW_LOGIN' &&
          <LoginModal dismiss={dismiss} prev={prev} />}
        {location === 'SHOW_RENT' &&
          <RentalItemModal dismiss={dismiss} id={itemId} prev={prev} />}
        {location === 'SHOW_MY_OFFER' &&
          <RentalItemModal dismiss={dismiss} id={itemId} prev={prev} />}
        {location === 'SHOW_RENT_FORM' &&
          <RentModal dismiss={dismiss} prev={prev} />
        }
      </div>
    </div>
    : null

const mapStateToProps = state => ({
  visible: state.modal.visible,
  itemId: state.location.payload.itemId,
  location: state.location.type,
  prev: state.location.prev
})

const mapDispatchToProps = dispatch => ({
  dismiss: ({ type, payload }) => {
    if (type === 'SHOW_LOGIN' || type === 'SHOW_RENT_FORM') {
      dispatch(dismissModal({ type: 'SHOW_RENTS', payload }))
    }
    dispatch(dismissModal({ type, payload }))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalContainer)
