import { createSlice } from '@reduxjs/toolkit'

export interface MeetState {
    email?: string
    meet_id?: string | number
    meet_title?: string
    meet_date?: string
    meet_status?: string
    rm_status?: string
    participants?: string
    goal?: string
    last_time?: String
}
export interface AgendaState {
    meet_id?: String | number
    agenda_id?: string | number
    agenda_title?: string
    agenda_status?: string
    discussion?: string
    decisions?: string
    setting_time?: number
    progress_time?: number
    order_number?: number
}

export interface MeetStateWithValidation extends MeetState {
    validation: any
}

export interface MeetingState {
    meet?: MeetState
    agendas?: AgendaState[]
    agendaCursor?: number
}

const initialState = {
    meet: {
        meet_title: '',
        meet_date: '',
        participants: '',
        goal: '',
    },
    agendas: [],
    agendaCursor: 0,
}

export const meetingSlice = createSlice({
    name: 'meeting',
    initialState: initialState as MeetingState,
    reducers: {
        ressetMeeting: (state) => {
            state.meet = {
                meet_title: '',
                meet_date: '',
                participants: '',
            }
            state.agendas = []
            state.agendaCursor = 0
        },
        setMeeting: (state, { payload: { meet, agendas } }) => {
            state.meet = meet
            state.agendas = agendas
        },
        setMeetTitle: (state, { payload: { meet_title } }) => {
            state.meet.meet_title = meet_title
        },
        setMeetDate: (state, { payload: { meet_date } }) => {
            state.meet.meet_date = meet_date
        },
        setMeetParticipants: (state, { payload: { participants } }) => {
            state.meet.participants = participants
        },
        getMeeting: (state) => {
            return state
        },
        setAgendaCursor: (state, { payload: { agendaCursor } }) => {
            state.agendaCursor = agendaCursor
        },
        setForm: (state, { payload: { agendaCursor, newAgenda } }) => {
            if (state.agendas[agendaCursor]) {
                state.agendas[agendaCursor] = { ...newAgenda }
            }
        },
    },
})

export const meetingActions = meetingSlice.actions
export default meetingSlice.reducer
