import React from 'react'
import { connect } from 'react-redux'

import style from './modal.scss'

const Modal = ({ visible, modalContent }) =>
  <div className={style.modalContainer}>
    {visible
      ? <div className={style.modal}>
          Inside modal
          {JSON.stringify(modalContent)}
        </div>
      : null}
  </div>

const mapStateToProps = state => ({
  visible: state.modal.visible,
  modalContent: {
    itemType: state.location.payload.itemType,
    itemId: state.location.payload.itemId
  }
})

export default connect(mapStateToProps)(Modal)
