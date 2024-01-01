import React from 'react'
import Button from '../components/reusedComponents/Button';
import { useNavigate } from 'react-router-dom';

const Home = () => {

  // Properties
  const navigate = useNavigate()

  const loginDirect = () => {
    navigate('/login')
  }

  return (
    <div style={{textAlign: 'center'}}>
      <div >Home</div>
      <Button name="Login" type="submit" click={loginDirect}></Button>
    </div>
  )
}

export default Home