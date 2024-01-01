import React from 'react'
import './NavbarStyle.css'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

  const navigate = useNavigate()

  const refreshStorage = () => {
    localStorage.clear()
    navigate('/')
  }

  return (
    <div className='navbar'>
      <p className='logoText'>Reimbursement Portal</p>
      <div>
        <p className='logout' onClick={refreshStorage}>Logout</p>
      </div>
    </div>
  )
}

export default Navbar