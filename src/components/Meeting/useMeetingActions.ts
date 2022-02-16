import React, { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { meetingActions } from '@store/meeting/meetingSlice'

export default function useMeetingActions() {
    const dispatch = useDispatch()
    return useMemo(
        () => bindActionCreators(meetingActions, dispatch),
        [dispatch]
    )
}
