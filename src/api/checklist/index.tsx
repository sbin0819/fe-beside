import useSWR from 'swr'
import { baseURL } from '..'

import { Cookies } from 'react-cookie'
const cookies = new Cookies()

export const checkSWR = (id) => {
    const { data: checkData, mutate: checkMutate } = useSWR(
        id ? `${baseURL}/api/selfcheck/${id}/` : null,
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
