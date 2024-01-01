import axios from 'axios';
import base_url from '../api/apiurl';

export const saveClaim = (claim,file,email) => {
    const formData = new FormData();
    formData.append("claim", JSON.stringify(claim))
    formData.append("file", file.file)
    console.log('the file in the service is ', file)
    console.log( JSON.stringify(claim))
    return axios.post(`${base_url}/claim/create/${email}`,formData,{
    headers: {
        "Content-Type": "multipart/form-data",
      }})
}

export const getClaims = (email) => {
  return axios.get(`${base_url}/claim/viewClaims/${email}`)
}

export const getAllClaims = (status) => {
  return axios.get(`${base_url}/claim/getClaimsByStatus/${status}`)
}

export const getAllClaimsForSpecificUser = (email) => {
  return axios.get(`${base_url}/claim/viewClaims/${email}`)
}

export const getAllClaimsForSpecificUserByStatus = (email,status) => {
  return axios.get(`${base_url}/claim/viewClaimsStatus/${email}/${status}`)
}

export const getAllClaimsForAdmin = () => {
  return axios.get(`${base_url}/claim/getAllClaims`)
}

export const updateClaim = (id,comment) => {
  console.log(comment , ' is my comment')
  return axios.put(`${base_url}/claim/updateClaim/${id}/${comment}`)
}


