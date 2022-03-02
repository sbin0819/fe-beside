import axios from 'axios'
import { Cookies } from 'react-cookie'
const cookies = new Cookies()

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.headers.common['Authorization'] = cookies.get('Authorization')
axios.defaults.withCredentials = true

export default axios
