import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from '@axios'
import { Svg, TextArea } from '@components/common'
import { Calendar, calendarViewBox } from '@svgs/Calendar'
import { People, peopleViewBox } from '@svgs/People'
import { meetSWR } from '@api/meet'
import moment from 'moment'
import useMeeting from '@store/meeting/useMeeting'
import useMeetingActions from '@store/meeting/useMeetingActions'
import { AgendaState } from '@store/meeting/meetingSlice'

const BoxContainer = styled.div`
    position: absolute;
    transform: translateX(-50%);
    width: 1140px;

    left: 50%;
    top: 70px;
`
const TitleText = styled.h2`
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 24px;
    width: 500px;
    line-height: 1.43;
`
const TitleSubText = styled.p`
    color: #3c3c43;
    width: 500px;
    font-size: 14px;
    line-height: 1.43;
`
const ChartBox = styled.div`
    float: right;
    width: 267px;
    height: 134px;
    flex-grow: 0;
    padding: 28px 32px 25px;
    border-radius: 24px;
    box-shadow: 2px 4px 16px 0 rgba(0, 0, 0, 0.08);
    border: solid 1px #f1f1f1;
    background-color: #fff;
`

function Header() {
    let id = 4
    const { meetData } = meetSWR(id)
    const { agendas, agendaCursor } = useMeeting()
    const [activeAgenda, setActiveAgenda] = useState<AgendaState>(null)
    const { setForm } = useMeetingActions()
    const [areaForm, setAreaForm] = useState({ discussion: '', decisions: '' })

    useEffect(() => {
        if (Array.isArray(agendas)) {
            setActiveAgenda(agendas[agendaCursor])
        }
    }, [agendaCursor, activeAgenda])

    const onChange = (e) => {
        const { value, name } = e.target
        let rValue = value.replace(/\- /gi, ' · ')
        setAreaForm((prev) => ({ ...prev, [name]: rValue }))
        const newAgenda = {
            ...activeAgenda,
            [name]: rValue,
        }
        setForm({ agendaCursor, newAgenda })
    }

    return (
        <BoxContainer>
            <div style={{ float: 'left' }}>
                <TitleText>
                    {/* {meetData?.[0].meet_title} */}
                    <TextArea
                        name="discussion"
                        value={meetData?.[0].meet_title || ''}
                        placeholder="논의할 내용에 대해 작성해주세요."
                        onChange={onChange}
                        row={
                            areaForm?.discussion === null
                                ? 1
                                : areaForm?.discussion?.split('\n').length + 1
                        }
                    />
                </TitleText>
                <TitleSubText style={{ marginBottom: '12px' }}>
                    <Svg
                        viewBox={calendarViewBox}
                        width={'15'}
                        height={'15'}
                        style={{ marginRight: '15px' }}
                    >
                        <Calendar />
                    </Svg>
                    {moment(meetData?.meet_date).format('YYYY-MM-DD')}
                </TitleSubText>
                <TitleSubText>
                    <Svg
                        viewBox={peopleViewBox}
                        width={'15'}
                        height={'15'}
                        style={{ marginRight: '15px' }}
                    >
                        <People />
                    </Svg>
                    {meetData?.[0].participants}
                </TitleSubText>
            </div>
            <ChartBox>회의 자가진단 결과</ChartBox>
        </BoxContainer>
    )
}

export default Header
