import useSWR from 'swr'
import { baseURL } from '../api/index'
import { Cookies } from 'react-cookie'

const cookies = new Cookies()

export const userSWR = () => {
    const { data: userData, mutate: userMutate } = useSWR(
        `${baseURL}/api/user/`,
        (url) =>
            fetch(url, {
                headers: {
                    Authorization: cookies.get('Authorization'),
                },
            }).then((res) => res.json())
    )
    return { userData, userMutate }
}
