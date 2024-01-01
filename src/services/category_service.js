import axios from 'axios';
import base_url from '../api/apiurl';

export const getAllCategories = () => {
    return axios.get(`${base_url}/category/getAll`)
}

export const saveCategory = (data) => {
    return axios.post(`${base_url}/category/create`,data)
}

export const deleteCategoryApi = (categoryType) => {
    return axios.delete(`${base_url}/category/delete/${categoryType}`)
}