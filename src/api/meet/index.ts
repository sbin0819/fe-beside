import useSWR from 'swr'

import { baseURL } from '..'

export const meetSWR = (id) => {
    const { data: meetData, mutate: meetMutate } = useSWR(
        id ? `${baseURL}/api/meet/?meet_id=${id}` : null
    )
    return { meetData, meetMutate }
}

export const meetsSWR = () => {
    const { data, error } = useSWR(`${baseURL}/api/meet/`)
    return { data, error }
}
