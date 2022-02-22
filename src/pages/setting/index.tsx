import React, { useEffect } from 'react'
import Setting from '@components/Setting'
import useMeetingActions from '@store/meeting/useMeetingActions'
import { useRouter } from 'next/router'

function SettingPage() {
    const router = useRouter()
    const { ressetMeeting } = useMeetingActions()
    useEffect(() => {
        ressetMeeting()
    }, [router])
    return <Setting />
}

export default SettingPage
