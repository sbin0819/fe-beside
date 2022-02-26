import { nanoid } from '@reduxjs/toolkit'
import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { MainInfoTitle, StyledInput, SubTitleContainer } from './style'
import axios from 'axios'
import { AgendaState } from '@store/meeting/meetingSlice'
import useMeeting from '@store/meeting/useMeeting'
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
const AgendaContainer = styled.div`
    /* margin-top: 32px; */
    gap: 24px;
    .agenda_inputs {
        display: flex;
        /* justify-content: space-between; */
        .agenda_input {
            width: 832px;
            margin-right: 24px;
        }
        .time_input {
            width: 168px;
        }
    }
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

const AgendaAddContainer = styled.div`
    display: inline-block;
    margin: 16px 0 32px;
    padding-left: 20px;
    height: 20px;
    font-family: Pretendard;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.43;
    letter-spacing: normal;
    text-align: left;
    color: rgba(60, 60, 67, 0.6);
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
export interface AgendaForms {
    [key: string]: PickedAgenda
}

function Body() {
    const { meet } = useMeeting()
    const [agendaForms, setAgendaagendaForms] = useState<AgendaForms>({
        1: {
            agenda_id: nanoid(),
            agenda_title: '',
            setting_time: 0,
            order_number: 1,
        },
    })

    const onSubmit = async (e) => {
        // meet validation 문제가 발생할 수 있음
        // meet 과 agenda api 가 따로 놀기 때문에 전체적인 filter가 필요함
        e.preventDefault()
        try {
            const meetResponse = await axios.post(
                'http://125.6.40.68/api/meet/',
                {
                    email: 1,
                    meet_title: '테스트  2',
                    meet_date: '2022-02-21T16:20:00+09:00',
                    meet_status: '0',
                    rm_status: 'N',
                    participants: '인범,수빈,다현,대영',
                    goal: '맛난걸 고르자',
                    last_time: '2022-02-19T16:19:34.730678+09:00',
                },
                { withCredentials: true }
            )
            // validation 처리 해야함
            const { data } = meetResponse
            const agendas = Object.entries(agendaForms)
                .sort((a, b) => +a[0] - +b[0])
                .map(([_, form]) => ({
                    meet_id: data.meet_id,
                    agenda_title: form.agenda_title,
                    setting_time: form.setting_time,
                    order_number: form.order_number,
                    agenda_status: '0',
                }))

            let agendasReqests = agendas.map((agenda) =>
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

    return (
        <Container>
            <div>
                <MainInfoTitle>회의 목표 및 AGENDA</MainInfoTitle>
                <GoalConatiner>
                    <SubTitleContainer>회의 목표</SubTitleContainer>
                    <StyledInput placeholder="회의 목료를 입력하세요" />
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

function AgendaInputs({
    agendaForms,
    setAgendaagendaForms,
}: {
    agendaForms: AgendaForms
    setAgendaagendaForms: any
}) {
    const formOrderRef = useRef(1)

    const onChange = (e, order_number) => {
        const { name, value, type } = e.target
        setAgendaagendaForms((prev) => ({
            ...prev,
            [order_number]: {
                ...prev[order_number],
                [name]: type === 'text' ? value : value === '' ? '' : +value,
            },
        }))
    }
    const onDelete = (order_number) => () => {
        const newForm = Object.entries(agendaForms).reduce((acc, curr) => {
            const [key, obj] = curr
            if (obj.order_number == order_number) {
                return acc
            }
            if (+key > +order_number) {
                const newOrder = +key - 1
                obj.order_number = newOrder
                acc[newOrder] = obj
                return acc
            }
            acc[key] = obj
            return acc
        }, {})
        // formOrderRef 초기화
        formOrderRef.current = Object.keys(agendaForms).length - 1
        setAgendaagendaForms(newForm)
    }

    const addAgendaInput = () => {
        // next order_number
        formOrderRef.current = Object.keys(agendaForms).length + 1
        setAgendaagendaForms((prev) => ({
            ...prev,
            [formOrderRef.current]: {
                agenda_id: nanoid(),
                agenda_title: '',
                setting_time: 0,
                order_number: formOrderRef.current,
            },
        }))
    }

    return (
        <>
            {Object.entries(agendaForms)
                .sort((a, b) => +a[0] - +b[0])
                .map(([k, form]) => (
                    <React.Fragment key={form.agenda_id}>
                        <AgendaContainer>
                            <div className="agenda_inputs">
                                <StyledInput
                                    type="text"
                                    className="agenda_input"
                                    name="agenda_title"
                                    placeholder="AGENDA"
                                    value={form.agenda_title}
                                    onChange={(e) =>
                                        onChange(e, form.order_number)
                                    }
                                />
                                <StyledInput
                                    className="time_input"
                                    type="text"
                                    name="setting_time"
                                    placeholder="목표시간"
                                    value={
                                        parseInt(
                                            form.setting_time
                                                .toString()
                                                .replace(/(^0+)/, '')
                                        ) || ''
                                    }
                                    onChange={(e) =>
                                        onChange(e, form.order_number)
                                    }
                                />
                            </div>
                        </AgendaContainer>
                        <AgendaAddContainer onClick={addAgendaInput}>
                            + 액션 아이템 추가
                        </AgendaAddContainer>
                    </React.Fragment>
                ))}
        </>
    )
}

export default Body
