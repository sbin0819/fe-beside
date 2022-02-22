import React from 'react'
import Setting from '@components/Setting'
import useMeetingActions from '@store/meeting/useMeetingActions'

function SettingPage() {
    const { ressetMeeting } = useMeetingActions()
    ressetMeeting()
    return <Setting />
}

export default SettingPage
