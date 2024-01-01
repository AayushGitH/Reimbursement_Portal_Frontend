import React, { useEffect, useState } from 'react'
import { getAllDepartments, saveDepartment } from '../../services/department_service'
import Button from '../../components/reusedComponents/Button';
import './DepartmentStyle.css'
import { useNavigate } from 'react-router-dom';
import Input from '../../components/reusedComponents/Input'
import Table from '../../components/reusedComponents/Table'

const Departments = () => {

  // Properties
  const [departments, setDepartments] = useState([])
  const [department, setDepartment] = useState({})
  const [deptModal, setdeptModal] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    departmentApiCall()
  }, [])

  const departmentApiCall = () => {
    getAllDepartments().then((response) => {
      console.log(response.data)
      setDepartments(response.data)
    }, (error) => {
      console.log('No departments in the database')
    })
  }

  const saveDepartmentForm = (e) => {
    e.preventDefault();
    setDepartment({
      ...department.departmentName = department.departmentName.toUpperCase()
    })
    saveDepartment(department).then((resp) => {
      console.log('Successfully added the department')
      alert('Successfully added the department')
      // navigate('/departments')
      departmentApiCall()
      depttoggledeptModal()
    }, (error) => {
      alert(error.response.data)
      console.log('Some unexpected error occurred')
    })
  }

  const handleChange = (event, property) => {
    setDepartment({ ...department, [property]: event.target.value })
  }

  const depttoggledeptModal = () => {
    setdeptModal(!deptModal)
  }

  const adddeptdeptModal = () => {
    setdeptModal(!deptModal)
  }

  const columns = ['Department']

  return (
    <div>
      <div className='department'>
        <h3>List of departments -</h3>

        <div className='top'>
          <Button className='add-btn' name="Add Department" color="purple" click={adddeptdeptModal}></Button>
          {/* <button className='add-btn' onClick={adddeptdeptModal}>Add Department</button> */}
        </div>

        {deptModal &&
          <div className="department-container">
            <form className='departmentForm' onSubmit={saveDepartmentForm}>
              <div className="department-form-control">
                <h4>Department Name *</h4>
                <div>
                  <Input type="text" placeholder="Fill Department name" changes={(e) => handleChange(e, "departmentName")} required={'required'} />
                </div>
              </div>

              <div className='form-btn'>
                <Button name="Save" type="submit"></Button>
                <Button name="Close" color={'red'} ml={'5px'} click={depttoggledeptModal}></Button>
              </div>


            </form>
          </div>
        }
        <div className='cat-table'>

          <Table columns={columns} data={departments.map((department) => ({
            'Department': department.departmentName
          }))} />
        </div>
      </div>
    </div>
  )
}

export default Departments