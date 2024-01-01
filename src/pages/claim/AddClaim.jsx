import React, { useEffect, useState } from 'react'
import styles from './AddClaimStyle.module.css'
import Input from '../../components/reusedComponents/Input'
import Button from '../../components/reusedComponents/Button'
import photo from '../../assets/imagenotavail.png'
import { getAllCategories } from '../../services/category_service';
import { saveClaim } from '../../services/claim_service'
import { useNavigate } from 'react-router-dom'

const AddClaim = () => {
  useEffect(() => {
    apiCall()
  }, [])

  const apiCall = () => {
    getAllCategories().then((response) => {
      setCategories(response.data)
      console.log(response.data)
    }, (error) => {
      console.log(error.response)
    })
  }
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate()
  const [claim, setClaim] = useState({
    expenseType: '',
    amount: 0,
    currency: '',
    comment: '',
    documenUrl: '',
    expenseDate: ''
  })
  const [file, setFile] = useState(null)
  const [previewImage, setPreviewImage] = useState("")

  const handleChange = (event, property) => {
    setClaim({ ...claim, [property]: event.target.value })
  }

  const onfileChange = (event) => {
    console.log(event.target.files[0])
    setPreviewImage(event.target.files[0])
    setFile({ ...file, file: event.target.files[0] })
  }

  const checkErrors = () => {
    const validationErrors = {}

    if (!claim.amount) {
      validationErrors.amount = 'Claim amount is required'
    }
    if (!claim.expenseType) {
      validationErrors.expenseType = "Expense type is required"
    }
    if (!claim.expenseDate) {
      validationErrors.expenseDate = "Expense date is required"
    }
    if (!claim.currency) {
      validationErrors.currency = "Currency is required"
    }
    if (!claim.comment) {
      validationErrors.comment = "Comment is required"
    }
    let ob = null
    if(claim.amount) {

      for (var i = 0; i < categories.length; i++) {
        if (categories[i].categoryType === claim.expenseType) {
          ob = categories[i]
        }
      }
      if (claim.amount > ob.categoryLimit) {
        errors.amount = "Amount cannot be greater than limit amount"
        validationErrors.amount = "Amount cannot be greater than the limit"
      }
    }

    setErrors(validationErrors)
    return Object.keys(validationErrors).length === 0;
  }

  const addClaim = (e) => {
    e.preventDefault()
    

    let email = localStorage.getItem('loggedEmail')
    if (checkErrors()) {

      saveClaim(claim, file, email).then(
        (resp) => {
          alert(resp.data)
          navigate('/dashboard/claim')
          console.log(resp.data)
        },
        (error) => {
          console.log(error)
        })
    }
  }

  return (
    <div>
      <form className={styles.claimForm} onSubmit={addClaim}>
        <div className={styles.claimLeft}>
          <h2>Add claim</h2>
          <div className={styles.formControl}>
            <h4>Expense type :</h4>
            <div>
              <div>
                <select name="categoryType" id="categoryType" onChange={(e) => { handleChange(e, 'expenseType') }}>
                  <option value={0} >--Select category--</option>
                  {
                    categories.map((opts) => (
                      <option value={opts.categoryType} key={opts.categoryType}>
                        {opts.categoryType}
                      </option>
                    ))
                  }
                </select>
              </div>
              {errors.expenseType && <small>* {errors.expenseType}</small>}
            </div>
          </div>
          <div className="form-control">
            <h4>Amount :</h4>
            <div>
              <div>
                <Input type="number" placeholder="Enter amount" changes={(e) => { handleChange(e, 'amount') }} />
              </div>
              {errors.amount && <small>* {errors.amount}</small>}
            </div>
          </div>
          <div className="form-control">
            <h4>Currency :</h4>
            <div>
              <select className='select' name="" id="" onChange={(e) => { handleChange(e, 'currency') }}>
                <option value={'Select currency'}>--Select currency--</option>
                <option value={'INR'} >INR</option>
                <option value={'Dollar'} >Dollar</option>
              </select>
            </div>
            {errors.currency && <small>* {errors.currency}</small>}
          </div>
          <div className="form-control">
            <h4>Issue date :</h4>
            <div>
              <div>
                <Input type="date" placeholder="Enter name here" changes={(e) => { handleChange(e, 'expenseDate') }} />
              </div>
              {errors.expenseDate && <small>* {errors.expenseDate}</small>}
            </div>
          </div>
          <div className="form-control">
            <h4>Comment :</h4>
            <div>
              <div>
                <textarea name="" id="" placeholder='Write the comment' onChange={(e) => { handleChange(e, 'comment') }} cols="50" rows="1"></textarea>
                {/* <Input type="textarea" placeholder="Enter name here" required={'required'} /> */}
              </div>
              {errors.comment && <small>* {errors.comment}</small>}
            </div>
          </div>
          <div className="form-control">
            <h4>Select file :</h4>
            <div>
              <div>
                <Input type="file" placeholder="Enter name here" changes={(e) => { onfileChange(e) }} />
              </div>
            </div>
          </div>
          <Button type="submit" mt='10px' name="Add claim"></Button>
        </div>
        <div className="claimRight">
          {previewImage ?
            <img src={URL.createObjectURL(previewImage)} width={'500px'} height={'500px'} alt="" />
            :
            <img src={photo} width={'100%'} height={'90%'} alt="" />
          }
        </div>
      </form>
    </div>
  )
}

export default AddClaim