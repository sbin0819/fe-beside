import useSWR from 'swr'
import { baseURL } from '..'

export const agendasSWR = (id) => {
    const { data: agendasData, mutate: agendaMutate } = useSWR(
        id ? `${baseURL}/api/agenda/?meet_id=${id.toString()}` : null
    )

    return { agendasData, agendaMutate }
}
