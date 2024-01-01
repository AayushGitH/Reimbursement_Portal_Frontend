import React, { useEffect, useState } from 'react'
import './SigninStyle.css'
import { gethome, register } from '../../services/home_service'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/reusedComponents/Button'
import Input from '../../components/reusedComponents/Input'
import base64 from 'base-64'
import { getAllDepartments } from '../../services/department_service';

const Signin = () => {
  const navigate = useNavigate()
  const [errors, setErrors] = useState({})
  const [department, setDepartment] = useState(0)
  const [secretQuestion, setSecretQuestion] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [currentDate, setCDate] = useState('');
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    contact: '',
    managerid: '',
    secretAnswer: '',
    joiningDate: '',
    department: {
      departmentId: 0
    }
  })
  const [departments, setDepartments] = useState([])

  useEffect(() => {

    // Current date
    let tdate = new Date();
    let tda = tdate.getDate();
    let tmo = String(tdate.getMonth() + 1).padStart(2, '0');
    let tye = tdate.getFullYear();
    let currentDate = `${tye}-${tmo}-${tda}`;
    console.log('Current date is ', currentDate)
    setCDate(currentDate);

    getAllDepartments().then(
      (resp) => {
        setDepartments(resp.data)
      })
      .catch((error) => {
        console.log(error.response.data)
      })
  }, [])

  const handleChange = (event, property) => {
    setData({ ...data, [property]: event.target.value })
  }

  const checkErrors = () => {
    const validationErrors = {}
    if (!data.name) {
      validationErrors.name = "User name is required"
    } else if (data.name.length < 5) {
      validationErrors.name = "Name must contain atleast 5 characters"
    }
    const emailPattern = /^[A-Za-z0-9._%+-]+@nucleusTeq.com$/i;
    if (!data.email) {
      validationErrors.email = "Email is required"
    } else if (!emailPattern.test(data.email)) {
      validationErrors.email = "Email is not valid"
    }
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i;
    if (!data.password) {
      validationErrors.password = "Password is required"
    } else if (!passwordPattern.test(data.password)) {
      validationErrors.password = "Password must be minimum of 8 characters and atleast one uppercase letter, one lowercase letter, one number and special character"
    }
    const contactPattern = /^[0-9]{10,}/i;
    if (!data.contact) {
      validationErrors.contact = "Contact is required"
    } else if (data.contact.length < 10 || data.contact.length > 10) {
      validationErrors.contact = "Contact must be of 10 numbers"
    } else if (!contactPattern.test(data.contact)) {
      validationErrors.contact = "Contact must be in digits form"
    }
    if (!data.joiningDate) {
      validationErrors.joiningDate = "Joining date is required"
    }
    if (!department) {
      validationErrors.department = 'Department is required'
    }
    if (!data.role) {
      validationErrors.role = "Designation is required"
    }
    if (!data.secretAnswer) {
      validationErrors.secretAnswer = "Secret answer is required"
    }
    if (!secretQuestion) {
      validationErrors.secretQuestion = "Secret question is required"
    }
    if (!confirmPass.confirmPass) {
      validationErrors.confirmPass = "Confirm password is required"
    } else if (confirmPass.confirmPass !== data.password) {
      validationErrors.confirmPass = "Password not matched with confirm password"
    }
    setErrors(validationErrors)
    return Object.keys(validationErrors).length === 0;
  }

  const signUpForm = (event) => {
    if (checkErrors()) {
      let obj = data;
      obj.department.departmentId = department.department
      obj.password = base64.encode(data.password)
      register(data).then((resp) => {
        alert('Successfully registered user !!')
        navigate('/')
      }).catch((error) => {
        alert(error.response.data)
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    signUpForm(e);
    console.log(data);
  }

  const loginDirect = () => {
    navigate('/login')
  }

  return (
    <div className="container">
      <form className='signupform'>
        <h2>Registration form</h2>
        <div className="form-control">
          <h4>Name :</h4>
          <div>
            <div>
              <Input type="text" placeholder="Enter name here" value={data.name} changes={(e) => handleChange(e, "name")} />
            </div>
            {errors.name && <small>* {errors.name}</small>}
          </div>
        </div>
        <div className="form-control">
          <h4>Email :</h4>
          <div>
            <div>
              <Input type="email" placeholder="example@nucleusTeq.com" value={data.email} changes={(e) => { handleChange(e, "email") }} />
            </div>
            {errors.email && <small>* {errors.email}</small>}
          </div>
        </div>
        <div className="form-control">
          <h4>Contact :</h4>
          <div>
            <div>
              <Input type="text" placeholder="- - - - - - - -" value={data.contact} changes={(e) => handleChange(e, "contact")} />
            </div>
            {errors.contact && <small>* {errors.contact}</small>}
          </div>
        </div>
        <div className="form-control">
          <h4>DOJ :</h4>
          <div>
            <div>
              <Input type="date" max={currentDate} placeholder="Date of Joining" value={data.joiningDate} changes={(e) => handleChange(e, "joiningDate")} />
            </div>
            {errors.joiningDate && <small>* {errors.joiningDate}</small>}
          </div>
        </div>
        <div className="form-control">
          <h4>Department :</h4>
          <div>
            <div>
              <select name="department" id="department" onChange={(e) => { setDepartment({ ...department, department: e.target.value }) }}>
                <option value={0} >--Select Department--</option>
                {departments.map((opts) => (
                    <option value={opts.departmentId} key={opts.departmentId}>
                      {opts.departmentName}
                    </option>
                  ))
                }
              </select>
            </div>
            {errors.joiningDate && <small>* {errors.joiningDate}</small>}
          </div>
        </div>
        <div className="form-control">
          <h4>Designation :</h4>
          <div>
            <div>
              <select name="" value={data.role} id="" onChange={(e) => handleChange(e, "role")}>
                <option value={'Select your designation'}>--Select your designation--</option>
                <option value={'MANAGER'} >Manager</option>
                <option value={'EMPLOYEE'} >Employee</option>
              </select>
            </div>
            {errors.role && <small>* {errors.role}</small>}
          </div>
        </div>
        <div className="form-control">
          <h4>Secret question :</h4>
          <div>
            <div>
              <select name="" id="" value={secretQuestion.secretQuestion} onChange={(e) => { setSecretQuestion({ ...secretQuestion, secretQuestion: e.target.value }) }}>
                <option selected value="Select the question type">--Select the question type--</option>
                <option value="Who is your favorite singer">Who is your favorite singer</option>
                <option value="Who is your childhood friend">Who is your childhood friend</option>
                <option value="What is your nickname">What is your nickname</option>
              </select>
            </div>
            {errors.secretQuestion && <small>* {errors.secretQuestion}</small>}
          </div>
        </div>
        <div className="form-control">
          <h4>Answer :</h4>
          <div>
            <div>
              <Input type="password" value={data.secretAnswer} placeholder="- - - - - - - -" changes={(e) => handleChange(e, "secretAnswer")} />
            </div>
            {errors.secretAnswer && <small>* {errors.secretAnswer}</small>}
          </div>
        </div>
        <div className="form-control">
          <h4>Password :</h4>
          <div>
            <div>
              <Input type="password" value={data.password} placeholder="- - - - - - - - - -" changes={(e) => handleChange(e, "password")} />
            </div>
            {errors.password && <small>* {errors.password}</small>}
          </div>
        </div>
        <div className="form-control">
          <h4>Confirm password :</h4>
          <div>
            <div>
              <Input type="password" placeholder="- - - - - - - - - -" changes={(e) => { setConfirmPass({ ...confirmPass, confirmPass: e.target.value }) }}></Input>
            </div>
            {errors.confirmPass && <small>* {errors.confirmPass}</small>}
          </div>
        </div>
        <div className="loginBtn">
          <Button type="submit" className='btn' name="Register" click={(e) => { handleSubmit(e) }}></Button>
        </div>
        <div className='loginurl'>
          <p>Already have id <a onClick={loginDirect}>Login</a></p>
        </div>
      </form>
    </div>
  )
}

export default Signin