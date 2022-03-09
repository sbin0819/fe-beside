import axios from 'axios'
import { baseURL } from '.'
import { Cookies } from 'react-cookie'
const cookies = new Cookies()

axios.defaults.baseURL = baseURL
axios.defaults.headers.common['Authorization'] = cookies.get('Authorization')
axios.defaults.withCredentials = true

export default axios
