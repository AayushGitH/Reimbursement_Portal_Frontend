import React, { useEffect, useState } from 'react'
import './DashboardStyle.css'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar';

const Dashboard = () => {
  const [admin, setAdmin] = useState(false);
  const [userName, setUserName] = useState('')
  const navigate = useNavigate()

  useEffect(() => {

    let user = JSON.parse(localStorage.getItem('user'))
    console.log(user?.role)
    if (user?.role === 'ADMIN') {
      setAdmin(true)
      setUserName(localStorage.getItem('user').name)
    }
  }, [])

  const refreshStorage = () => {
    localStorage.clear()
  }

  const viewClaim = () => {
    let user = JSON.parse(localStorage.getItem('user'))
    console.log(user?.role)
    if(user.role === 'EMPLOYEE') {
      console.log('I am employee navigate')
      navigate('/dashboard/claim')
    } else if(user.role === 'ADMIN') {
      navigate('/dashboard/adminClaims')
    }
  }

  return (
    <div className="dashboard-container">
      <Navbar />
      <div className="container">
        <div className="left">
          <div>
            <p className='text'>{userName}</p>
          </div>
          <div>
            {admin &&
              <div>
                <Link to='categories' className='toggleBars'>Categories</Link>
              </div>
            }
          </div>
          <div>
            {admin &&
              <div>
                {/* <FcDepartment /> */}
                <Link to='departments' className='toggleBars'>Departments</Link>
              </div>
            }
          </div>
          <div>
            {admin &&
              <div>
                <Link to='employees' className='toggleBars'>Employees</Link>
              </div>
            }
          </div>
          <div>
          </div>
          {!admin &&
            <div>
              <Link to='addClaim' className='toggleBars'>Add claim</Link>
            </div>
          }
          <div>
          </div>
            <div>
              <div onClick={()=>viewClaim()} className='toggleBars' style={{cursor:'pointer'}}>View claim</div>
            </div>
          <div>
          </div>
          <div>
            <Link to='/' onClick={refreshStorage} className='toggleBars logout'>Logout</Link>
          </div>
        </div>
        <div className="right">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Dashboard