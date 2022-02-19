import { useEffect } from 'react'
import Meeting from '@components/Meeting'
import useMeetingActions from '@store/meeting/useMeetingActions'
import useMeeting from '@store/meeting/useMeeting'
function MeetingPage({ meet, agendas }: { meet: any; agendas: any }) {
    const { setMeeting } = useMeetingActions()
    const { meet: isInit } = useMeeting()
    useEffect(() => {
        if (!isInit) {
            setMeeting({ meet, agendas })
        }
    }, [])
    return <Meeting />
}

export async function getStaticPaths() {
    const res = await fetch('http://125.6.40.68/api/meet/')
    const posts = await res.json()
    const paths = posts.map((post) => ({
        params: { id: '' + post.meet_id },
    }))

    return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
    const { id } = params
    const resMeet = await fetch(`http://125.6.40.68/api/meet/${id.toString()}`)
    const resAgenda = await fetch(
        `http://125.6.40.68/api/agendas/${id.toString()}/`
    )
    const meet = await resMeet.json()
    const agendas = await resAgenda.json()
    return { props: { meet, agendas } }
}

export default MeetingPage
