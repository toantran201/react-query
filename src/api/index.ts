import axios from 'axios'
//
import { BASE_URL } from '~/constants/url'

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
})

export default axiosClient
