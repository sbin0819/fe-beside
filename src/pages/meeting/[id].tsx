import { useEffect } from 'react'
import Meeting from '@components/Meeting'
import useMeetingActions from '@store/meeting/useMeetingActions'
import axios from '@axios'
// import { useRouter } from 'next/router'
// import useSWR from 'swr'
function MeetingPage({ meet, agendas }: { meet: any; agendas: any }) {
    const { setMeeting } = useMeetingActions()
    useEffect(() => {
        setMeeting({ meet, agendas })
    }, [])
    return <Meeting />
}

export async function getStaticPaths() {
    const res = await fetch('http://localhost:8000/api/meet/', {
        headers: {
            Authorization:
                'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6InVzZXIxQGdtYWlsLmNvbSIsImV4cCI6MTY0NjczMzU3NCwiZW1haWwiOiJ1c2VyMUBnbWFpbC5jb20ifQ.dkVpKFIgU6KW56ppBkzPbD2cxXP7hIASC4-I05u7VaA',
        },
    })
    const posts = await res.json()
    const paths = posts?.map((post) => ({
        params: { id: '' + post.meet_id },
    }))

    return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
    const { id } = params
    const resMeet = await fetch(
        `http://localhost:8000/api/meet/${id.toString()}`,
        {
            headers: {
                Authorization:
                    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6InVzZXIxQGdtYWlsLmNvbSIsImV4cCI6MTY0NjczMzU3NCwiZW1haWwiOiJ1c2VyMUBnbWFpbC5jb20ifQ.dkVpKFIgU6KW56ppBkzPbD2cxXP7hIASC4-I05u7VaA',
            },
        }
    )
    const resAgenda = await fetch(
        `http://localhost:8000/api/agendas/${id.toString()}/`,

        {
            headers: {
                Authorization:
                    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6InVzZXIxQGdtYWlsLmNvbSIsImV4cCI6MTY0NjczMzU3NCwiZW1haWwiOiJ1c2VyMUBnbWFpbC5jb20ifQ.dkVpKFIgU6KW56ppBkzPbD2cxXP7hIASC4-I05u7VaA',
            },
        }
    )

    const meet = await resMeet.json()
    const agendas = await resAgenda.json()
    return { props: { meet, agendas } }
}

export default MeetingPage
