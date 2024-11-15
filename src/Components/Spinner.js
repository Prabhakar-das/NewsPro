import React, { Component } from 'react'
import loading from './loading.gif.gif'
export class Spinner extends Component {
  render() {
    return (
      <div className='center'>
        <img src={loading} alt="loading" />
      </div>
    )
  }
}

export default Spinner
