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

export const meetsYSWR = () => {
    const { data: meetYdata, mutate: meetYmutate } = useSWR(
        `${baseURL}/api/meet/?rm_status=y`,
        (url) =>
            fetch(url, {
                headers: {
                    Authorization: cookies.get('Authorization'),
                },
            }).then((res) => res.json())
    )
    return { meetYdata, meetYmutate }
}

export const meetsWSWR = () => {
    const { data: meetWdata, mutate: meetWmutate } = useSWR(
        `${baseURL}/api/meet/?rm_status=w`,
        (url) =>
            fetch(url, {
                headers: {
                    Authorization: cookies.get('Authorization'),
                },
            }).then((res) => res.json())
    )
    return { meetWdata, meetWmutate }
}
