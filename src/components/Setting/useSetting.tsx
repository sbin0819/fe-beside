import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { AgendaState, MeetState } from '@store/meeting/meetingSlice'
import { nanoid } from '@reduxjs/toolkit'
import { agendasSWR } from '@api/agenda'
interface Form {
    value: string
    error: boolean
    message: string
    focus: boolean
}

export interface MeetForm {
    meet_title: Form
    meet_date: Form
    participants: Form
    goal: Form
}

type PickedAgenda = Pick<
    AgendaState,
    'agenda_id' | 'agenda_title' | 'setting_time' | 'order_number'
>

export interface AgendaWithValidation extends PickedAgenda {
    validation: {
        agenda_title?: { error?: boolean; message?: string; focus?: boolean }
        setting_time?: { error?: boolean; message?: string; focus?: boolean }
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
            focus: false,
        },
        setting_time: {
            error: false,
            message: '',
            focus: false,
        },
    },
}

function useSetting() {
    const router = useRouter()
    const { id } = router.query
    const { data: meetData } = useSWR<MeetState>(
        id ? `http://localhost:8000/api/meet/?meet_id=${id.toString()}` : null
    )
    const { agendasData } = agendasSWR(id)
    const [meetForm, setMeetForm] = useState<MeetForm>({
        meet_title: { value: '', error: false, message: '', focus: false },
        meet_date: { value: '', error: false, message: '', focus: false },
        participants: { value: '', error: false, message: '', focus: false },
        goal: { value: '', error: false, message: '', focus: false },
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
                    value: meetData[0]?.meet_title,
                    error: false,
                    message: '',
                    focus: false,
                },
                meet_date: {
                    value: meetData[0]?.meet_date,
                    error: false,
                    message: '',
                    focus: false,
                },
                participants: {
                    value: meetData[0]?.participants,
                    error: false,
                    message: '',
                    focus: false,
                },
                goal: {
                    value: meetData[0]?.goal,
                    error: false,
                    message: '',
                    focus: false,
                },
            }))
        }
    }, [meetData])
    useEffect(() => {
        if (agendasData) {
            const newAgendasForm = agendasData?.reduce((acc, curr) => {
                acc[curr.order_number] = {
                    ...curr,
                    setting_time: curr.setting_time / 60,
                    validation: {
                        agenda_title: {
                            error: false,
                            message: '',
                            focus: false,
                        },
                        setting_time: {
                            error: false,
                            message: '',
                            focus: false,
                        },
                    },
                }
                return acc
            }, {})
            setAgendagendaForms(newAgendasForm)
        }
    }, [agendasData])

    return { meetForm, setMeetForm, agendaForms, setAgendagendaForms }
}

export default useSetting
