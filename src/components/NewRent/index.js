import React from 'react'
import {  connect } from 'react-redux'

import {  uploadRental } from './../../store/actions'

import styles from './newRent.scss'

const Field = ({ field, label, type, handler }) =>
  <div className={styles.formField}>
    <span>{label}</span>
    <input type={type} onChange={handler(field)} />
  </div>

class NewRent extends React.Component {
  constructor() {
    super()
    this.state = {
      name: undefined,
      address: undefined,
      price: undefined,
      collateral: undefined
    }
  }
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
  submitForm = () => {
    const rentalData = this.state

    if (this.imageSelector) {
      const files = this.imageSelector.files
      console.log(files)
      if (files[0]) {
        const file = files[0]
        this.props.submitRental(rentalData, file)
      }
    }
  }
  render () {
    return (
      <div className={styles.container}>
        {JSON.stringify(this.state)}
        <h2>Create new rental</h2>
        <div className={styles.rentalForm}>

          <Field field="name" type="text" label="Item name" handler={this.handleInput} />

          <Field field="address" type="text" label="Address" handler={this.handleInput} />

          <Field field="price" type="number" label="Price per hour" handler={this.handleInput} />

          <Field field="collateral" type="number" label="Collateral" handler={this.handleInput} />

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
            >
              Cancel
            </button>

            <button
              className={styles.button}
              onClick={this.submitForm}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  submitRental: (data, imageFile) => dispatch(uploadRental(data, imageFile))
})

export default connect(null, mapDispatchToProps)(NewRent)
