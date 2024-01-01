import axios from 'axios';
import base_url from '../api/apiurl';

export const register = (data) => {
    return axios.post(`${base_url}/home/register`,data)
}

export const login = (credentials) => {
    return axios.post(`${base_url}/home/login`,credentials)
}