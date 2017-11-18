import React from 'react'
import { connect } from 'react-redux'
import { ArrowLeft } from 'react-feather'
import classNames from 'classnames'

import Login from './../Login'
import { dismissModal } from '../../store/actions'

import style from './modal.scss'

const Modal = ({ dismiss, content, location }) =>
  <div className={style.modal}>
    <div className={style.modalHeader}>
      <ArrowLeft onClick={dismiss} />
    </div>
    <div className={style.modalContent}>
      { location === 'SHOW_LOGIN' && <Login /> }
    </div>
  </div>

const ModalContainer = ({ visible, modalContent, dismiss, location }) =>
  visible
    ? <div className={style.modalContainer}>
      <div
        className={style.backdrop}
        onClick={dismiss}
      ></div>
      <Modal content={modalContent} dismiss={dismiss} location={location} />
    </div>
    : null

const mapStateToProps = state => ({
  visible: state.modal.visible,
  modalContent: {
    itemType: state.location.payload.itemType,
    itemId: state.location.payload.itemId
  },
  location: state.location.type
})

const mapDispatchToProps = dispatch => ({
  dismiss: () => dispatch(dismissModal({ type: 'SHOW_RENT' }))
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalContainer)
