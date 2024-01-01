import React, { useEffect, useState } from 'react'
import './LoginStyle.css'
import { useNavigate } from 'react-router-dom';
import Button from '../../components/reusedComponents/Button';
import Input from '../../components/reusedComponents/Input';
import base64 from 'base-64'
import { login } from '../../services/home_service';

const Login = ({setRole}) => {

  const [loginCredentials, setLoginCredentials] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('user')) {
      let user = JSON.parse(localStorage.getItem('user'))
      console.log(user.role)
      if(user !== null && user.role === 'ADMIN') {
        navigate('/dashboard/userinfo')
      } else if(user !== null && user.role === 'EMPLOYEE') {
        navigate('/dashboard/userinfo')
      }
    }
  }, [navigate])

  const signupNavigate = () => {
    navigate('/sign-up')
  }

  const handleChange = (event, property) => {
    setLoginCredentials({ ...loginCredentials, [property]: event.target.value })
  }

  const loginSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {}
    const emailPattern = /^[A-Za-z0-9._%+-]+@nucleusTeq.com$/i;
    if (!loginCredentials.email) {
      validationErrors.email = "Email is required"
    } else if (!emailPattern.test(loginCredentials.email)) {
      validationErrors.email = "Email is not valid"
    }

    if (!loginCredentials.password) {
      validationErrors.password = "Password is required"
    }

    setErrors(validationErrors);
    const encryptedPassword = base64.encode(loginCredentials.password)
    setLoginCredentials(
      loginCredentials.password = encryptedPassword
    )

    if (Object.keys(validationErrors).length === 0) {

      login(loginCredentials).then((resp) => {
        setRole(resp?.data?.role)
        console.log('Logged in user email is', resp.data.email)
        console.log('Logged in user email is', resp.data.role)
        if (resp?.data?.role === 'ADMIN') {
          console.log("i am the admin ")
          localStorage.setItem('role', true)
        }

        localStorage.setItem('user', JSON.stringify(resp?.data))
        localStorage.setItem('loggedEmail', resp?.data?.email)
        console.log(localStorage.getItem('user'))

        alert('Successfully logged in')
        navigate('/dashboard/userinfo')
      }).catch((error) => {
        console.log(error)
        error?.response?.data ? alert(error.response.data) : alert('Server is not responding..')
        setLoginCredentials({ email: '', password: '' });
        navigate('/')
      })
    } else {
      navigate('/')
    }
  }

  return (
    <div className="login_container">
      <form onSubmit={loginSubmit} className='loginForm'>
        <h2>Login</h2>
        <div className="login-form-control">
          <h4>Email *</h4>
          <div>
            <div>
              {/* <input type="email" placeholder='Fill Email Id' value={loginCredentials.email} onChange={(e) => { handleChange(e, "email") }} required /> */}
              <Input type="email" placeholder='Fill Email Id' value={loginCredentials.email} changes={(e) => { handleChange(e, "email") }} />
            </div>
            {errors.email && <small>* {errors.email}</small>}
          </div>
        </div>
        <div className="login-form-control">
          <h4>Password *</h4>
          <div>
            <div>
              {/* <input type="password" placeholder='Fill Password here' value={loginCredentials.password} onChange={(e) => { handleChange(e, "password") }} required /> */}
              <Input type="password" placeholder='Fill Password here' value={loginCredentials.password} changes={(e) => { handleChange(e, "password") }} required />
            </div>
            {errors.password && <small>* {errors.password}</small>}
          </div>
        </div>
        <Button name="Login" type="submit"></Button>
        <div className="grid-container">
          <p>Don't have account? <a onClick={signupNavigate}>Sign up</a></p>
        </div>
      </form>
    </div>
  )
}

export default Login