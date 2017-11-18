import React from 'react'
import { connect } from 'react-redux'
import { ArrowLeft } from 'react-feather'
import classNames from 'classnames'

import { dismissModal } from '../../store/actions'

import style from './modal.scss'

const Modal = ({dismiss, content}) =>
  <div className={style.modal}>
    <div className={style.modalHeader}>
      <ArrowLeft onClick={dismiss} />
    </div>
    <div className={style.modalContent}>
      Inside modal
      {JSON.stringify(content)}
      dsjkh lhg ifhgik fglkh lkfdghli gfdh' fgdh for (let h fgdh fgh gfdh 
    </div>
  </div>

const ModalContainer = ({ visible, modalContent, dismiss }) =>
  visible
    ? <div className={style.modalContainer}>
        <div 
          className={style.backdrop}
          onClick={dismiss}
        ></div>
        <Modal content={modalContent} dismiss={dismiss} />
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
  dismiss: () => dispatch(dismissModal({type: 'SHOW_RENT'}))
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalContainer)
