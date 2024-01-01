import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import './App.css'
import Navbar from './components/navbar/Navbar'
import Signup from './pages/signup/Signup'
import ForgetPass from './pages/forgetpassword/ForgetPass';
import UserInfo from './pages/userInfo/UserInfo';
import Employees from './pages/employees/Employees';
import Claim from './pages/claim/Claim';
import Login from './pages/login/Login';
import ErrorPage from './pages/errorPage/ErrorPage';
import Category from './pages/category/Category'
import Departments from './pages/departments/Departments'
import { useEffect, useState } from 'react';
import AddClaim from './pages/claim/AddClaim';
import ViewClaimAdmin from './pages/claim/ViewClaimAdmin';
import Dashboard from './pages/dashboard/Dashboard';
import ViewClaimManger from './pages/claim/ViewClaimManger';

function App() {
  const userDetail = JSON.parse(localStorage.getItem('user'));
  const [role, setRole] = useState(localStorage.getItem('user'))

  return (

    <div>
      {/* <Navbar /> */}
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Login setRole={setRole} />} />
          <Route exact path='/sign-up' element={<Signup />} />
          {userDetail?.role === 'ADMIN' ? (
            <Route exact path='/dashboard/' element={<Dashboard />}>
              <Route exact path='userinfo' element={<UserInfo />} />
              <Route exact path='categories' element={<Category />} />
              <Route exact path='departments' element={<Departments />} />
              <Route exact path='employees' element={<Employees />} />
              <Route exact path='claim' element={<Claim />} />
              {/* <Route exact path='addClaim' element={<AddClaim />} />  */}
              <Route exact path='adminClaims' element={<ViewClaimAdmin />} />
            </Route>
          ) : (
            <Route exact path='/login' element={<Login />} />
          )
          }

          {userDetail?.role === 'EMPLOYEE' ? (
            <Route exact path='/dashboard/' element={<Dashboard />}>
              <Route exact path='userinfo' element={<UserInfo />} />
              <Route exact path='claim' element={<Claim />} />
              <Route exact path='addClaim' element={<AddClaim />} />
            </Route>
          ) : (
            <Route exact path='/' element={<Login setRole={setRole} />} />
          )
          }

          {userDetail?.role === 'MANAGER' ? (
            <Route exact path='/dashboard/' element={<Dashboard />}>
              <Route exact path='userinfo' element={<UserInfo />} />
              <Route exact path='claim' element={<Claim />} />
              <Route exact path='addClaim' element={<AddClaim />} />
              <Route exact path='managerClaims' element={<ViewClaimManger />} />
            </Route>
          ) : (
            <Route exact path='/' element={<Login setRole={setRole} />} />
          )
          }
          <Route exact path='/*' element={<ErrorPage />} />
          <Route exact path='/forgetPass' element={<ForgetPass />} />
        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default App;
