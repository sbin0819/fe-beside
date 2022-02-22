import React, { useEffect } from 'react'
import Setting from '@components/Setting'
import useMeetingActions from '@store/meeting/useMeetingActions'

function SettingPage({ meet, agends }: { meet: any; agends: any }) {
    const { setMeeting } = useMeetingActions()
    useEffect(() => {
        setMeeting({ meet, agends })
    }, [])
    return <Setting />
}

export default SettingPage

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
    // if (true) {
    //     return {
    //         redirect: {
    //             destination: '/',
    //         },
    //     }
    // }
    return { props: { meet, agendas } }
}
