import useSWR from 'swr'
import { baseURL } from '..'
import { Cookies } from 'react-cookie'

const cookies = new Cookies()

export const userSWR = () => {
    const { data: userData, mutate: userMutate } = useSWR(`${baseURL}/api/user/`, (url) =>
        fetch(url, {
            headers: {
                Authorization: cookies.get('Authorization'),
            },
        }).then((res) => res.json())
    )
    return { userData, userMutate }
}
export const emojiSWR = (id) => {
    const { data: emojiData, mutate: emojiMutate } = useSWR(id ? `${baseURL}/api/emoji/${id}/` : null, (url) =>
        fetch(url, {
            headers: {
                Authorization: cookies.get('Authorization'),
            },
        }).then((res) => res.json())
    )
    return { emojiData, emojiMutate }
}
