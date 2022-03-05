import useSWR from 'swr'

export const agendasAPI = (id) => {
    const { data: agendasData, mutate: agendaMutate } = useSWR(
        id ? `http://localhost:8000/api/agenda/?meet_id=${id.toString()}` : null
    )

    return { agendasData, agendaMutate }
}
