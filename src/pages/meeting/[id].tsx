import { useEffect } from 'react'
import Meeting from '@components/Meeting'
import useMeetingActions from '@store/meeting/useMeetingActions'
function MeetingPage({ meet, agendas }: { meet: any; agendas: any }) {
    const { setMeeting } = useMeetingActions()
    useEffect(() => {
        setMeeting({ meet, agendas })
    }, [])
    return <Meeting />
}

export async function getStaticPaths() {
    const res = await fetch('http://125.6.40.68/api/meet/')
    const posts = await res.json()
    const paths = posts.map((post) => ({
        params: { id: post.meet_id },
    }))

    return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
    const { id } = params
    const resMeet = await fetch(`http://125.6.40.68/api/meet/${id}`)
    const resAgenda = await fetch(`http://125.6.40.68/api/agenda/`)
    const meet = await resMeet.json()
    const agendas = await resAgenda.json()
    const filteredAgenda = agendas.filter((el) => el.meet_id == id)

    return { props: { meet, agendas: filteredAgenda } }
}

export default MeetingPage
