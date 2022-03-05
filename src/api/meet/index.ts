import useSWR from 'swr'

export const meetSWR = (id) => {
    const { data: meetData, mutate: meetMutate } = useSWR(
        id ? `http://localhost:8000/api/meet/?meet_id=${id}` : null
    )
    return { meetData, meetMutate }
}
