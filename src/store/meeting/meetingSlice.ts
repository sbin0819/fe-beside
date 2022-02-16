import { createSlice } from '@reduxjs/toolkit'

interface Meet {
    email: string
    meet_id: string
    meet_title: string
    meet_date: string
    status: string
    participants: string
    goal: string
    last_time: String
}
interface Agenda {
    meet_id: String
    agenda_id: string
    agenda_title: string
    discussion: string
    decisions: string
    setting_time: number
    progress_time: number
}

interface IState {
    meet?: Meet
    agendas?: Agenda[]
    agendaCursor: number
}

const initialState = {
    meet: {},
    agendas: [],
    agendaCursor: 0,
}

export const meetingSlice = createSlice({
    name: 'meeting',
    initialState: initialState as IState,
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
    },
})

export const meetingActions = meetingSlice.actions
export default meetingSlice.reducer
