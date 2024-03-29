import useSWR from 'swr'
import { baseURL } from '..'

import { Cookies } from 'react-cookie'
const cookies = new Cookies()

export const meetSWR = (id) => {
    const { data: meetData, mutate: meetMutate } = useSWR(
        id ? `${baseURL}/api/meet/?meet_id=${id}` : null,
        (url) =>
            fetch(url, {
                headers: {
                    Authorization: cookies.get('Authorization'),
                },
            }).then((res) => res.json())
    )
    return { meetData, meetMutate }
}

export const meetsSWR = () => {
    const { data, error } = useSWR(`${baseURL}/api/meet/`, (url) =>
        fetch(url, {
            headers: {
                Authorization: cookies.get('Authorization'),
            },
        }).then((res) => res.json())
    )
    return { data, error }
}

export const meetsNSWR = () => {
    const { data: meetNdata, mutate: meetNmutate } = useSWR(
        `${baseURL}/api/meet/?rm_status=N`,
        (url) =>
            fetch(url, {
                headers: {
                    Authorization: cookies.get('Authorization'),
                },
            }).then((res) => res.json())
    )
    return { meetNdata, meetNmutate }
}

export const meetsWSWR = () => {
    const { data: meetWdata, mutate: meetWmutate } = useSWR(
        `${baseURL}/api/meet/?rm_status=W`,
        (url) =>
            fetch(url, {
                headers: {
                    Authorization: cookies.get('Authorization'),
                },
            }).then((res) => res.json())
    )
    return { meetWdata, meetWmutate }
}
