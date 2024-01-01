import axios from 'axios';
import base_url from '../api/apiurl';

export const getEmployees = (empType) => {
    return axios.get(`${base_url}/employee/get/${empType}`)
}

export const assignEmployee = (name,managerName) => {
    return axios.post(`${base_url}/employee/assign/${name}/${managerName}`)
}