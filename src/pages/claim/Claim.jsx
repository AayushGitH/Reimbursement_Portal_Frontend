import React, { useEffect, useState } from 'react'
// import './ClaimStyle.css'
import styles from './ClaimCss.module.css';
import Button from '../../components/reusedComponents/Button'
import { getAllClaimsForSpecificUser, getAllClaimsForSpecificUserByStatus, getClaims, saveClaim } from '../../services/claim_service';

const Claim = () => {
  const [claims, setClaims] = useState([]);
  const [claimModal, setClaimModal] = useState(false)
  const [viewClaimModal, setViewClaimModal] = useState(false)
  const [name, setName] = useState('')
  const [accepted, setAccepted] = useState(false)

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem('user'))
    setName(user.name)
    viewClaimModalToggle()
  }, [])

  const getParticularClaims = () => {
    getAllClaimsForSpecificUser(localStorage.getItem('loggedEmail')).then((resp) => {
      console.log(resp.data)
      setClaims(resp.data);
    }, (error) => {
      console.log(error)
    })
  }

  const getParticularClaimsByStatus = (status) => {
    getAllClaimsForSpecificUserByStatus(localStorage.getItem('loggedEmail'),status).then((resp) => {
      console.log(resp.data)
      setClaims(resp.data);
    }, (error) => {
      console.log(error)
    })
  }

  const viewClaimModalToggle = () => {
    setClaimModal(false)
    // getClaims(localStorage.getItem('loggedEmail')).then((resp) => {
    //   console.log(resp.data)
    //   setClaims(resp.data);
    // }, (error) => {
    //   console.log(error)
    // })
    getParticularClaims()
    setViewClaimModal(!viewClaimModal)
  }

  const setClaimStatusView = (status) => {
    console.log("Status ", status)
    if (status === "Pending") {
      setClaims(claims.filter((claim) => claim?.status === "PENDING"))
    }
    if (status === "Accepted") {
      setClaims(claims.filter((claim) => claim?.status === "ACCEPTED"))
    }
    if (status === "Rejected") {
      setClaims(claims.filter((claim) => claim?.status === "REJECTED"))
    }
    if (status === "All") {
      setClaims(claims)
    }
  }

  const viewInvoice = (image) => {
    console.log(image)
    const imagUrl = `/assets/reimbursements/${image}`;
    window.open(imagUrl, "_blank");
  }

  const columns = ['Expense Type', 'Amount', 'Issued Date', 'Currency', 'Status', 'Action']

  return (
    <div className={styles.claimContainer}>

      <div className={styles.btnSection}>
        <Button color={'yellow'} name='All' click={() => getParticularClaims()} fc={'black'} pl={'60px'} pr={'60px'} mr={'5px'}></Button>
        <Button color={'red'} name='Pending' click={() => getParticularClaimsByStatus("Pending")} pl={'60px'} pr={'60px'} mr={'5px'}></Button>
        <Button color={'blue'} name='Accepted' click={() => getParticularClaimsByStatus("Accepted")} pl={'60px'} pr={'60px'} mr={'5px'}></Button>
        <Button color={'green'} name='Rejected' click={() => getParticularClaimsByStatus("Rejected")} pl={'60px'} pr={'60px'}></Button>
      </div>
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
                    <span className={styles.card_value}>{name}</span>
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
              <div className={styles.row}>
                <div className={styles.col_12}>
                  <p className={styles.card_text}>
                    Comment:
                    <span className={styles.card_value}>{claim.statusDescription}</span>
                  </p>
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.col_6}>
                  <Button name={claim.status} fs={'16px'} disabled={'disabled'}></Button>
                </div>
                <div className={styles.col_6}>
                  <Button name="View invoice" color={'green'} fs={'16px'} click={() => viewInvoice(claim.documentUrl)}></Button>
                </div>
              </div>
            </div>
          </div>
        )
      })
      }
    </div>
  )
}

export default Claim