import React from 'react'

import { Link } from 'react-router-dom'

import '../styling/footer.css'

import companyLogo from '../images/Site Images/company_logo_2.png'

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-left">
        <Link to='/' style={{textDecoration: 'none'}}><img src={companyLogo} alt="" /></Link>
      </div>
      <div className="footer-right">
        <ul className='footer-help-links' style={{ color: 'white' }}>
          <li><Link to='/' style={{textDecoration: 'none', color: 'white'}}>support@deepbluepursuits.com</Link></li>
          <li><Link to='/' style={{textDecoration: 'none', color: 'white'}}>Privacy & Terms</Link></li>
          <li><Link to='/' style={{textDecoration: 'none', color: 'white'}}>Help Center</Link></li>
        </ul>
        <div className="footer-socials-container">
            <Link><i className="fa-brands fa-instagram fa-xl"></i></Link>
            <Link><i className="fa-brands fa-facebook fa-xl"></i></Link>
            <Link><i className="fa-brands fa-twitter fa-xl"></i></Link>
        </div>
      </div>
    </div>
  )
}

export default Footer