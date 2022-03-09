import useSWR from 'swr'
import { baseURL } from '..'

import { Cookies } from 'react-cookie'
const cookies = new Cookies()

export const checkSWR = () => {
    const { data: checkData, mutate: checkMutate } = useSWR(
        `${baseURL}/api/selfcheck/`,
        (url) =>
            fetch(url, {
                headers: {
                    Authorization: cookies.get('Authorization'),
                },
            }).then((res) => {
                // console.log(res)
                res.json()
            })
    )
    return { checkData, checkMutate }
}
