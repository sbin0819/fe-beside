import { createSlice } from '@reduxjs/toolkit'

export interface MeetState {
    email: string
    meet_id: string
    meet_title: string
    meet_date: string
    meet_status: string
    rm_status: string
    participants: string
    goal: string
    last_time: String
}
export interface AgendaState {
    meet_id?: String
    agenda_id?: string
    agenda_title?: string
    discussion?: string
    decisions?: string
    agenda_status?: string
    setting_time?: number
    progress_time?: number
}

export interface MeetingState {
    meet?: MeetState
    agendas?: AgendaState[]
    agendaCursor?: number
}

const initialState = {
    meet: null,
    agendas: [],
    agendaCursor: 0,
}

export const meetingSlice = createSlice({
    name: 'meeting',
    initialState: initialState as MeetingState,
    reducers: {
        setMeeting: (state, { payload: { meet, agendas } }) => {
            state.meet = meet
            state.agendas = agendas
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
