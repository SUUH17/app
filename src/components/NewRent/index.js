import React from 'react'
import { connect } from 'react-redux'

import { uploadRental } from './../../store/actions'

import styles from './newRent.scss'

class NewRent extends React.Component {
  imageSelected = (e) => {
    const files = e.target.files
    if (this.imagePreview && files[0]) {
      this.imagePreview.setAttribute('src', window.URL.createObjectURL(files[0]))
    }
  }
  submitForm = () => {
    const rentalData = {
      name: '',
      address: '',
      price: '',
      collateral: ''
    }

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
        <h2>Create new rental</h2>
        <div className={styles.rentalForm}>

          <div className={styles.formField}>
            <span>Item name</span>
            <input type="text" placeholder="name" />
          </div>

          <div className={styles.formField}>
            <span>Address</span>
            <input type="text" placeholder="address" />
          </div>

          <div className={styles.formField}>
            <span>Price per hour</span>
            <input type="number" placeholder="price" />
          </div>

          <div className={styles.formField}>
            <span>Collateral</span>
            <input type="number" placeholder="collateral" />
          </div>

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
