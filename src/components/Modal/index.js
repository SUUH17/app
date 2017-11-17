import React from 'react'
import { connect } from 'react-redux'

import { closeModal } from '../../store/actions'

import style from './modal.scss'

const Modal = ({ visible, modalContent, dismiss }) =>
  visible
    ? <div className={style.modalContainer}>
        <div 
          className={style.backdrop}
          onClick={dismiss}
        ></div>
        <div className={style.modal}>
        Inside modal
        {JSON.stringify(modalContent)}
      </div>
    </div>
    : null

const mapStateToProps = state => ({
  visible: state.modal.visible,
  modalContent: {
    itemType: state.location.payload.itemType,
    itemId: state.location.payload.itemId
  }
})

const mapDispatchToProps = dispatch => ({
  dismiss: () => dispatch(closeModal)
})

export default connect(mapStateToProps, mapDispatchToProps)(Modal)
