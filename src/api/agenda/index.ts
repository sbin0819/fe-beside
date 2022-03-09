import useSWR from 'swr'
import { baseURL } from '..'
import { Cookies } from 'react-cookie'
const cookies = new Cookies()

export const agendasSWR = (id) => {
    const { data: agendasData, mutate: agendaMutate } = useSWR(
        id ? `${baseURL}/api/agenda/?meet_id=${id.toString()}` : null,
        (url) =>
            fetch(url, {
                headers: {
                    Authorization: cookies.get('Authorization'),
                },
            }).then((res) => res.json())
    )

    return { agendasData, agendaMutate }
}
