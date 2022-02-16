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
    meet: Meet
    agendas: Agenda[]
}

const initialState = {
    meet: {
        email: 'abc@naver.com',
        meet_id: '1',
        meet_title: '우리회의',
        meet_date: '2022-02-10T23:11:00+09:00',
        status: 'Y',
        participants: 'abc',
        goal: '이겨내자!',
        last_time: '2022-02-13T19:55:55.855794+09:00',
    },
    agendas: [
        {
            meet_id: '1',
            agenda_id: '2',
            agenda_title: '부시자!',
            discussion: '어떻게 부실까',
            decisions: '잘부시자',
            setting_time: 200,
            progress_time: 12,
        },
    ],
}

export const meetingSlice = createSlice({
    name: 'meeting',
    initialState: initialState as IState,
    reducers: {
        setMeeting: (state, { payload: { meet, agendas } }) => {
            state.meet = meet
            state.agendas = agendas
        },
        getMeeting: (state) => {},
    },
})

export const meetingActions = meetingSlice.actions
export default meetingSlice.reducer
