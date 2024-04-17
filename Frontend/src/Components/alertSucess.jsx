import React from 'react'
import { Alert } from 'react-bootstrap'
import './../Styles/componentStyles.css'
const AlertSucess = () => {
  return (
    <div >
        <Alert variant='success' dismissible className='alertsucess' >
            
            <p>Success </p>
        </Alert>
    </div>
  )
}

export default AlertSucess