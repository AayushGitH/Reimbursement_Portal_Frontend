import axios from 'axios';
import base_url from '../api/apiurl';

export const getAllDepartments = () => {
    return axios.get(`${base_url}/department/getAll`)
}

export const saveDepartment = (data) => {
    return axios.post(`${base_url}/department/create`,data)
}