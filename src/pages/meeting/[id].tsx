import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Meeting from '@components/Meeting'
import useMeetingActions from '@store/meeting/useMeetingActions'
import { meetSWR } from '@api/meet'
import { agendasSWR } from '@api/agenda'
function MeetingPage() {
    const router = useRouter()
    const { id } = router.query

    const { meetData } = meetSWR(id)
    const { agendasData } = agendasSWR(id)
    const { setMeeting, ressetMeeting } = useMeetingActions()
    useEffect(() => {
        if (meetData?.length > 0 && agendasData?.length > 0) {
            ressetMeeting()
            setMeeting({ meet: meetData[0], agendas: agendasData })
        }
    }, [meetData, agendasData])
    return <Meeting />
}

export default MeetingPage
