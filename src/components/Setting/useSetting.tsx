import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { AgendaState, MeetState } from '@store/meeting/meetingSlice'
import { nanoid } from '@reduxjs/toolkit'

interface Form {
    value: string
    error: boolean
    message: string
}

interface MeetForm {
    meet_title: Form
    meet_date: Form
    participants: Form
    goal: Form
}

type PickedAgenda = Pick<
    AgendaState,
    'agenda_id' | 'agenda_title' | 'setting_time' | 'order_number'
>

interface AgendaWithValidation extends PickedAgenda {
    validation: {
        agenda_title?: { error?: boolean; message?: string }
        setting_time?: { error?: boolean; message?: string }
    }
}

export interface AgendaForms {
    [key: string]: AgendaWithValidation
}

const defaultAgendaForm = {
    // agenda_id: nanoid(),
    // order_number: 1,
    agenda_title: '',
    setting_time: 0,
    validation: {
        agenda_title: {
            error: false,
            message: '',
        },
        setting_time: {
            error: false,
            message: '',
        },
    },
}

function useSetting() {
    const router = useRouter()
    const { id } = router.query

    const { data: meetData } = useSWR<MeetState>(
        id ? `http://125.6.40.68/api/meet/${id.toString()}` : null
    )
    const { data: agendasData } = useSWR(
        id ? `http://125.6.40.68/api/agendas/${id.toString()}/` : null
    )
    const [meetForm, setMeetForm] = useState<MeetForm>({
        meet_title: { value: '', error: false, message: '' },
        meet_date: { value: '', error: false, message: '' },
        participants: { value: '', error: false, message: '' },
        goal: { value: '', error: false, message: '' },
    })
    const [agendaForms, setAgendagendaForms] = useState<AgendaForms>({
        1: {
            ...defaultAgendaForm,
            order_number: 1,
            agenda_id: nanoid(),
        },
    })

    // meeDate에 status 값과 같은 validation이 필요하다
    useEffect(() => {
        if (meetData) {
            setMeetForm((prev) => ({
                meet_title: {
                    value: meetData?.meet_title,
                    error: false,
                    message: '',
                },
                meet_date: {
                    value: meetData?.meet_date,
                    error: false,
                    message: '',
                },
                participants: {
                    value: meetData?.participants,
                    error: false,
                    message: '',
                },
                goal: { value: meetData?.goal, error: false, message: '' },
            }))
        }
    }, [meetData])

    useEffect(() => {
        if (agendasData) {
            const newAgendasForm = agendasData.reduce((acc, curr) => {
                acc[curr.order_number] = curr
                return acc
            }, {})
            setAgendagendaForms(newAgendasForm)
        }
    }, [agendasData])

    return { meetForm, setMeetForm, agendaForms, setAgendagendaForms }
}

export default useSetting
