import useSWR from 'swr'
import { baseURL } from '..'
import { Cookies } from 'react-cookie'
const cookies = new Cookies()

export const actionsSWR = (id) => {
    const { data: actionsData, mutate: agendaMutate } = useSWR(
        id ? `${baseURL}/api/action/?agenda_id=${id.toString()}` : null,
        (url) =>
            fetch(url, {
                headers: {
                    Authorization: cookies.get('Authorization'),
                },
            }).then((res) => res.json())
    )

    return { actionsData, agendaMutate }
}
