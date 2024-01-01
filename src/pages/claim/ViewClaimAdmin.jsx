import React, { useEffect, useState } from 'react'
import { getAllClaims, getAllClaimsForAdmin, updateClaim } from '../../services/claim_service'
import styles from './ClaimCss.module.css';
import Button from '../../components/reusedComponents/Button'
import Input from '../../components/reusedComponents/Input'

const ViewClaimAdmin = () => {
  useEffect(() => {
    fetchAllClaimsForAdmin()
  }, [])

  const [claims, setClaims] = useState([])
  const [claimId, setClaimId] = useState(0)
  const [comment, setComment] = useState('')
  const [updateModal, setUpdateModal] = useState(false)

  const fetchAllClaims = (status) => {
    getAllClaims(status).then((response) => {
      setClaims(response.data)
      console.log(response.data)

    }, (error) => {
      console.log(error)
    })
  }

  const fetchAllClaimsForAdmin = () => {
    getAllClaimsForAdmin().then((response) => {
      setClaims(response.data)
      console.log(response.data)

    }, (error) => {
      console.log(error)
    })
  }

  const updateStatusModal = (status, id) => {
    if (status === 'Accepted') {
      console.log('The button pressed is - ', status)
      setClaimId(id)
      setComment('Accepted')
      console.log(comment, ' with the id ', id)
      updateClaim(id, status)
      fetchAllClaims('Pending')
    } else {
      setUpdateModal(true)
      setClaimId(id)
      console.log('The button pressed is - ', status)
    }
  }

  const viewInvoice = (image) => {
    const imagUrl = `/assets/reimbursements/${image}`;
    window.open(imagUrl, "_blank");
  }

  const setUpdateStatus = (e) => {
    e.preventDefault()
    console.log(comment, ' with the id ', claimId)
    updateStatusAPI()
  }

  const updateStatusAPI = () => {
    setUpdateModal(false)
    updateClaim(claimId, comment)
    fetchAllClaims('Rejected')
  }

  return (
    <div className={styles.claimContainer}>

      <div className={styles.btnSection}>
        <Button color={'black'} click={() => fetchAllClaimsForAdmin()} name='All' pl={'60px'} pr={'60px'} mr={'5px'}></Button>
        <Button color={'yellow'} fc={'black'} click={() => fetchAllClaims('Pending')} name='Pending' pl={'60px'} pr={'60px'} mr={'5px'}></Button>
        <Button color={'blue'} click={() => fetchAllClaims('Accepted')} name='Accepted' pl={'60px'} pr={'60px'} mr={'5px'}></Button>
        <Button color={'red'} click={() => fetchAllClaims('Rejected')} name='Rejected' pl={'60px'} pr={'60px'}></Button>
      </div>

      {updateModal &&
        <div className={styles.updateModal}>
          <div>
            <form className={styles.updateForm}>
              <div className="category-form-control">
                <p>Give the reason to reject the claim</p>
                <Input type="text" changes={(e) => { setComment(e.target.value) }} placeholder="Enter comment here" />
              </div>
              <div className='form-btn'>
                <Button name={'Update'} mr={'5px'} type={'submit'} click={(e) => setUpdateStatus(e)} pl={'10px'} pr={'10px'} color={'blue'} fs={'16px'}></Button>
                <Button name={'Cancel'} click={() => setUpdateModal(false)} pl={'10px'} pr={'10px'} color={'red'} fs={'16px'}></Button>
              </div>

            </form>
          </div>
          <div>

          </div>
        </div>
      }

      {claims?.map((claim, index) => {
        return (
          <div className={styles.card}>
            <div className={styles.card_header}>
              <h3 className={styles.card_title}>{claim.expenseType}</h3>
            </div>
            <div className={styles.card_body}>
              <div className={styles.row}>
                <div className={styles.col_6}>
                  <p className={styles.card_text}>
                    RequestId:
                    <span className={styles.card_value}>{claim.reimburseId}</span>
                  </p>
                </div>
                <div className={styles.col_6}>
                  <p className={styles.card_text}>
                    Name:
                    <span className={styles.card_value}>{claim.employeeName}</span>
                  </p>
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.col_6}>
                  <p className={styles.card_text}>
                    Bill Amount:
                    <span className={styles.card_value}>{claim.amount}</span>
                  </p>
                </div>
                <div className={styles.col_6}>
                  <p className={styles.card_text}>
                    Invoice Date:
                    <span className={styles.card_value}>{claim.expenseDate}</span>
                  </p>
                </div>
              </div>
              {

                <div className={styles.row}>
                  <div className={styles.col_12}>
                    <p className={styles.card_text}>
                      Comment:
                      <span className={styles.card_value}>{claim.statusDescription}</span>
                    </p>
                  </div>
                </div>
              }
              <div className={styles.row}>
                <div className={styles.col_12} style={{ margin: 'auto' }}>
                  <Button name={'View invoice'} color={'black'} click={() => viewInvoice(claim.documentUrl)} pl={'30px'} pr={'30px'} fs={'16px'}></Button>
                </div>
              </div>
              <div className={styles.row}>
                {claim.status === 'PENDING' &&
                  <div className={styles.col_6}>
                    <Button name={'Accept'} click={() => { updateStatusModal('Accepted', claim.reimburseId) }} pl={'30px'} pr={'30px'} fs={'16px'}></Button>
                  </div>
                }
                {claim.status === 'PENDING' &&
                  <div className={styles.col_6}>
                    <Button name={'Reject'} click={() => { updateStatusModal('Rejected', claim.reimburseId) }} pl={'30px'} pr={'30px'} color={'red'} fs={'16px'}></Button>
                  </div>
                }
              </div>
            </div>
          </div>
        )
      })
      }
    </div>
  )
}

export default ViewClaimAdmin