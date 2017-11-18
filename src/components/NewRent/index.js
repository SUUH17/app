import React from 'react'
import { connect } from 'react-redux'

import Field from './../Field'

import { uploadRental } from './../../store/actions'

import styles from './newRent.scss'

class NewRent extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      location: '',
      price: 0,
      collateral: 0
    }
  }
  getValue = (key) =>
    this.state[key]
  handleInput = (key) =>
    event =>
      this.setState({
        [key]: event.target.value
      })
  imageSelected = (e) => {
    const files = e.target.files
    if (this.imagePreview && files[0]) {
      this.imagePreview.setAttribute('src', window.URL.createObjectURL(files[0]))
    }
  }
  clearForm = () => {
    console.log('clearform')
    this.setState({
      name: '',
      location: '',
      price: 0,
      collateral: 0
    })
  }
  submitForm = () => {
    const rentalData = this.state
    // const loggedIn = false

    if (this.imageSelector) {
      const files = this.imageSelector.files
      console.log(files)
      if (files[0]) {
        const file = files[0]
        // if (!loggedIn) {
        //   this.props.promptLogin(this.props.submitRental(rentalData, file))
        // } else {
        this.props.submitRental(rentalData, file)
        // }
      }
    }
  }
  canSubmit = () => {
    const { name, location, price, collateral } = this.state
    const files = this.imageSelector && this.imageSelector.files.length >= 0
    return
    files
      && !!name
      && !!location
      && !!price
      && !!collateral
  }
  render () {
    const { name, location, price, collateral } = this.state
    const { loggedIn, uploading, uploadError, uploadSuccess } = this.props
    return (
      <div className={styles.container}>
        {!loggedIn
          ? (
            <div>
              <h2>Please login first</h2>
              <button className={styles.button} onClick={this.props.promptLogin}>Login</button>
            </div>
          )
          : (
            <div>
              <h2>Create new rental</h2>
              <div className={styles.rentalForm}>

                <Field field="name" type="text" label="Item name" handler={this.handleInput} state={name} />

                <Field field="location" type="text" label="Address" handler={this.handleInput} state={location} />

                <Field field="price" type="number" label="Price per hour" handler={this.handleInput} state={price} />

                <Field field="collateral" type="number" label="Collateral" handler={this.handleInput} state={collateral} />

                <div className={styles.formField}>
                  <span>Image</span>
                  <img
                    className={styles.imagePreview}
                    ref={ref => { this.imagePreview = ref }}>
                  </img>
                  <input
                    type="file"
                    accept="image/png, image/jpeg"
                    ref={ref => { this.imageSelector = ref }}
                    onChange={this.imageSelected}
                  />
                </div>

                <div className={styles.buttons}>
                  <button
                    className={styles.cancelButton}
                    onClick={this.clearForm}
                  >
                    Cancel
                </button>

                  <button
                    className={styles.button + ((uploadSuccess) ? ' ' + styles.greenButton : '')}
                    onClick={this.submitForm}
                  disabled={!this.canSubmit}
                  >
                    {uploading 
                      ? 'Uploading'
                      :  uploadSuccess
                        ? 'Success'
                        : 'Create'
                    }
                  </button>
              </div>
            </div>
            </div>
          )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn,
  uploading: state.api.uploading,
  uploadError: state.api.uploadError,
  uploadSuccess: state.api.uploadSuccess
})

const mapDispatchToProps = dispatch => ({
  submitRental: (data, imageFile) => dispatch(uploadRental(data, imageFile)),
  promptLogin: () => dispatch({ type: 'SHOW_LOGIN' })
})

export default connect(mapStateToProps, mapDispatchToProps)(NewRent)
