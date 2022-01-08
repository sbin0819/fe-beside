import useSWR from 'swr'
import axios from 'axios'

export const apiGetTest = () => {
    const { data, isValidating, error } = useSWR(
        'http://localhost:8000/api',
        (url) => axios.get(url)
    )

    return { data, isValidating, error }
}
