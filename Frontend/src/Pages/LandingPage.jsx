import React from 'react'
import {Container} from 'react-bootstrap'
import { SlSocialTwitter, SlSocialLinkedin, SlSocialInstagram,SlControlPlay } from 'react-icons/sl'
import '../Styles/ladingPageStyle.css'

const Landingpage = () => {
  return (
    <div>
        <LHeader />
        <Introbody />
        <Footer />
    </div>
  )
}

export const LHeader = () => {
    return (
      <div className='header'>
           <span>Student Login</span>
           <span>Admin Login</span>
           <span>COE/Dean </span>
      </div>
      
    )
  }



  export const Introbody = () => {
    return (
      <>
          {/* <img src={Clgphoto} className='clgphoto'/> */}
          
          <h2 >Mission</h2> 
          <ul>
              <li>To maintain excellent infrastructure and highly qualified and dedicated faculty.</li>
              <li>To provide a conducive environment with an ambiance of humanity, wisdom, creativity, and team spirit.</li>
              <li>To promote the values of ethical behavior and commitment to the society.</li>
              <li>To partner with academic, industrial, and government entities to attain collaborative research.</li>
          </ul>
          
      </>
    )
  }
export const Footer = () => {
    return (
      <>
                      <Container className='contact'>
                          <h3>Contact us :</h3>
                      <br />
                      <pre>
                      The Principal,  <br />
                      National Engineering College, (Autonomous) <br />
                      K.R.Nagar, Kovilpatti, <br />
                      Thoothukudi (Dt) - 62850304632 – 222 502; <br />
                      Fax : 232749 93859 76674, 93859 76684 <br />
                      principal@nec.edu.in <br />
                      </pre>
                  
                      </Container>
                      
                      <Container className='socialmedia'>
                      <SlSocialInstagram    className='mediaicon'/>
                      <SlSocialTwitter    className='mediaicon'/>
                      <SlSocialLinkedin    className='mediaicon'/>
                      <SlControlPlay    className='mediaicon'/>
                      </Container>
                      <Container className='right'>
                      &#169; NATIONAL ENGINEERING COLLEGE | ALL RIGHTS RESERVED
                      </Container>
      </>
    )
  }


  export default Landingpage