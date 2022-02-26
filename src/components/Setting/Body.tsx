import { nanoid } from '@reduxjs/toolkit'
import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { MainInfoTitle, StyledInput, SubTitleContainer } from './style'
import axios from 'axios'
import { AgendaState } from '@store/meeting/meetingSlice'
import useMeeting from '@store/meeting/useMeeting'
import AgendaInputs from './AgendaInputs'
const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 536px;
    border-radius: 24px;
    padding: 32px 40px 40px;
    box-shadow: 2px 4px 16px 0 rgba(0, 0, 0, 0.08);
    border: solid 1px #f1f1f1;
    background-color: #fff;
`

const GoalConatiner = styled.div`
    margin-top: 36px;
`

const ButtonContainer = styled.div`
    display: flex;
    gap: 24px;
    .cancel_btn {
        width: 320px;
    }
    .submit_btn {
    }
`

const StyledButton = styled.button`
    width: 100%;
    height: 52px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding: 10px 20px;
    border-radius: 12px;
    border: solid 1px #d6d6d7;
    background-color: #fff;
    margin-top: 28px;
    cursor: pointer;
`

const InfoSection = styled.div`
    height: 72px;
    flex-grow: 0;
    display: flex;
    align-items: center;
    border-radius: 12px;
    padding: 0 24px;
    background-color: #fbfbfb;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: normal;
    color: #000;
`

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

function Body() {
    const {
        meet: { meet_title, meet_date, participants },
    } = useMeeting()
    const [meetGoal, setMeetGoal] = useState({
        goal: '',
        validation: {
            error: false,
            message: '',
        },
    })
    const [agendaForms, setAgendaagendaForms] = useState<AgendaForms>({
        1: {
            ...defaultAgendaForm,
            order_number: 1,
            agenda_id: nanoid(),
        },
    })

    const checkTopVaild = () => {
        return true
    }

    const checkMeetGoal = () => {
        if (meetGoal.goal.length == 0) {
            setMeetGoal((prev) => ({
                ...prev,
                validation: { ...prev.validation, error: true },
            }))
            return false
        }
        return true
    }

    const checkValidAgendaForms = (forms: [string, AgendaWithValidation][]) => {
        const isValid =
            forms.filter(
                ([_, value]) =>
                    value.agenda_title === '' || value.setting_time === 0
            ).length > 0
                ? false
                : true
        if (!isValid) {
            changeInvalidAgendaStatus(forms)
            return isValid
        } else {
            return isValid
        }
    }

    const changeInvalidAgendaStatus = (
        forms: [string, AgendaWithValidation][]
    ) => {
        // Deep copy 해야 함
        const vaildEmptyAgendaInputs = JSON.parse(JSON.stringify(forms)).map(
            ([key, value]: [key: string, value: AgendaWithValidation]) => {
                if (value.agenda_title.length == 0) {
                    value.validation.agenda_title.error = true
                }
                if (value.agenda_title.length > 0) {
                    value.validation.agenda_title.error = false
                }
                if (value.setting_time == 0) {
                    value.validation.setting_time.error = true
                }
                if (value.setting_time > 0) {
                    value.validation.setting_time.error = false
                }
                return [key, value]
            }
        )
        setAgendaagendaForms(
            vaildEmptyAgendaInputs.reduce((acc, [key, value]) => {
                acc[key as string] = value
                return acc
            }, {})
        )
    }

    const fetchPostMeet = async (
        sortedAgendas: [string, AgendaWithValidation][]
    ) => {
        try {
            const meetResponse = await axios.post(
                'http://125.6.40.68/api/meet/',
                {
                    meet_title,
                    meet_date,
                    participants,
                    goal: meetGoal,
                    email: 1, // 임시
                    meet_status: '0', // default
                    rm_status: 'N', // default
                },
                { withCredentials: true }
            )
            // validation 처리 해야함
            const { data } = meetResponse
            const agendas = sortedAgendas.slice().map(([_, form]) => ({
                meet_id: data.meet_id,
                agenda_title: form.agenda_title,
                setting_time: form.setting_time,
                order_number: form.order_number,
                agenda_status: '0',
            }))
            const agendasReqests = agendas.map((agenda) =>
                axios.post(
                    'http://125.6.40.68/api/agenda/',
                    { ...agenda },
                    { withCredentials: true }
                )
            )
            // validation 처리
            Promise.all(agendasReqests).then((res) => console.log(res))
        } catch (error) {}
    }
    const onSubmit = async (e) => {
        e.preventDefault()
        const sortedAgendas = Object.entries(agendaForms).sort(
            (a, b) => +a[0] - +b[0]
        )
        const isCheckTopInputsValid = checkTopVaild()
        const isGoalValid = checkMeetGoal()
        const isAgendaFormsValid = checkValidAgendaForms(sortedAgendas)

        if (isCheckTopInputsValid && isGoalValid && isAgendaFormsValid) {
            fetchPostMeet(sortedAgendas)
        }
    }

    return (
        <Container>
            <div>
                <MainInfoTitle>회의 목표 및 AGENDA</MainInfoTitle>
                <GoalConatiner>
                    <SubTitleContainer>회의 목표</SubTitleContainer>
                    <StyledInput
                        placeholder="회의 목료를 입력하세요"
                        value={meetGoal.goal}
                        onChange={(e) => {
                            setMeetGoal((prev) => ({
                                ...prev,
                                goal: e.target.value,
                            }))
                        }}
                        isInValid={meetGoal?.validation?.error}
                    />
                </GoalConatiner>
                <div style={{ marginTop: '32px' }}>
                    <SubTitleContainer>AGENDA</SubTitleContainer>
                    <AgendaInputs
                        agendaForms={agendaForms}
                        setAgendaagendaForms={setAgendaagendaForms}
                    />
                </div>
            </div>
            <InfoSection>
                ✏️ 지금부터 59분안에 회의를 완료할 수 있도록 Agenda를
                설정해보세요!
            </InfoSection>
            <ButtonContainer>
                <StyledButton className="cancel_btn">
                    나중에 할래요
                </StyledButton>
                <StyledButton className="submit_btn" onClick={onSubmit}>
                    지금 바로 시작해요
                </StyledButton>
            </ButtonContainer>
        </Container>
    )
}

export default Body
