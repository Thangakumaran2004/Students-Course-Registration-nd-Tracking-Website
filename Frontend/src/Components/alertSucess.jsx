import React from 'react'
import { Alert } from 'react-bootstrap'
import './../Styles/componentStyles.css'
const AlertSucess = (props) => {
  return (
    <div >
        <Alert variant='success' dismissible className='alertsucess' >
            
            <p>Success {props.message}</p>
        </Alert>
    </div>
  )
}

export default AlertSucess