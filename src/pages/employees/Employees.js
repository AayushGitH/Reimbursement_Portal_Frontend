import React, { useEffect, useRef, useState } from 'react'
import './EmployeeStyle.css'
import { assignEmployee, getEmployees } from '../../services/employee_service'
import Button from '../../components/reusedComponents/Button';
import Input from '../../components/reusedComponents/Input'
import Table from '../../components/reusedComponents/Table'
import { useNavigate } from 'react-router-dom';

const Employees = () => {

  const [employees, setEmployees] = useState([])
  const [managers, setManagers] = useState([])
  const [assignManagers, setAssignManagers] = useState([])
  const [employeesflag, setEmployeesFlag] = useState(false)
  const [managersflag, setManagersFlag] = useState(false)
  const [assignModal, setAssignModal] = useState(false)
  const navigate = useNavigate()
  const managerButton = useRef(null)
  const sdeButton = useRef(null)
  const [assignObj, setAssignObj] = useState({
    email: '',
    managerEmail: ''
  })
  const [activeBtn, setActiveBtn] = useState(true);

  useEffect(() => {
    fetchEmployee("EMPLOYEE")
    fetchManager()
  }, [])

  const fetchEmployee = (empType) => {
    setActiveBtn(!activeBtn);
    getEmployees(empType).then((resp) => {
      setEmployeesFlag(true)
      setManagersFlag(false)
      console.log(resp.data)
      setEmployees(resp.data)
      // fetchEmployee(empType)
    }, (error) => {
      console.log(error)
    })
  }

  const fetchManager = () => {
    getEmployees("MANAGER").then((resp) => {
      console.log(resp.data)
      setManagersFlag(true)
      setEmployeesFlag(false)
      setManagers(resp.data)
    }, (error) => {
      console.log(error)
    })
  }

  const assignMngForm = (e) => {
    e.preventDefault();
    assignEmployee(assignObj.email, assignObj.managerEmail).then((resp) => {
      console.log(resp.data)
      setAssignModal(!assignModal)
      navigate('/dashboard/employees')
    }, (error) => {
      console.log(error)
    })
    console.log(assignObj)
  }

  const assignModaltoggle = (name, department) => {
    console.log(name)
    console.log(department)
    // setAssignManagers([])
    for (var i = 0; i < managers.length; i++) {
      if (managers[i].department.departmentName === department) {
        assignManagers.push(managers[i]);
      }
    }
    console.log(assignManagers)
    setAssignObj({
      email: name
    })

    // setAssignManagers([])
    setAssignModal(!assignModal)
  }

  const closeAssignModal = () => {
    setAssignManagers([])
    setAssignModal(!assignModal)
  }


  const handleChange = (event, property) => {
    setAssignObj({ ...assignObj, [property]: event.target.value })
  }

  const columns = ['Name', 'Email', 'Contact', 'DOJ', 'Manager', 'Actions']
  const managerColumns = ['Name', 'Email', 'Contact', 'DOJ']

  return (
    <div className='employee-container'>
      <h3>List of employees -</h3>

      <div className='top'>
        <Button className='sde-btn' pl={'20px'} pr={'20px'} id='sde' ref={sdeButton} click={() => fetchEmployee('EMPLOYEE')} name={'SDE'}></Button>
        <Button className='man-btn' id='sde' ref={managerButton} click={() => fetchManager()} color='purple' name={'Manager'} ml='5px' mr='30px'></Button>
      </div>
      {assignModal &&
        <div className="category-container">
          <form onSubmit={assignMngForm} className='categoryForm'>
            <div className="category-form-control">
              <div>
                <h4>Employee *</h4>
                <div>
                  <Input type="text" value={assignObj.email} disabled={'disabled'} placeholder="The name of the employee" changes={(e) => handleChange(e, "email")} required={'required'} />
                </div>
              </div>
              <div>
                <h4>Manager *</h4>
                <div>
                  <select name="managerName" id="managerName" onChange={(e) => handleChange(e, "managerEmail")} required>
                    <option value={0} >--Select Manager--</option>
                    {

                      assignManagers.map((opts) => (
                        <option value={opts.email} key={opts.name}>
                          {opts.name}
                        </option>
                      ))
                    }
                  </select>
                </div>
              </div>
            </div>
            <div className='form-btn'>
              <Button name="Save" type="submit" ></Button>
              <Button name="Close" ml={'5px'} color={'red'} click={closeAssignModal}></Button>
            </div>

          </form>
        </div>
      }
      {employeesflag &&

        <Table columns={columns} data={employees.map((employee) => ({
          'Name': employee.name,
          'Email': employee.email,
          'DOJ': employee.joiningDate,
          'Contact': employee.contact,
          'Manager': employee.managerId,
          'Actions': <>
            <button className='delete-btn' onClick={() => { assignModaltoggle(employee.email, employee.department.departmentName) }}>Assign</button>
          </>
        }))} />
      }
      {managersflag &&
        <Table columns={managerColumns} data={employees.map((employee) => ({
          'Name': employee.name,
          'Email': employee.email,
          'DOJ': employee.joiningDate,
          'Contact': employee.contact
        }))} />
      }
    </div>
  )
}

export default Employees