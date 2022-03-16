import React, { useEffect, useState } from 'react'
import {
    BoxContainer,
    TopBox,
    TopBoxColLeft,
    TopBoxColRight,
    AgendaBox,
    AgendaId,
    AgendaTitle,
    AgendaBodyGoodTime,
    AgendaBodyBadTime,
    ActionItemBox,
    ActionItemText,
    ActionItemEl,
    FixBox,
    ActionUi,
    ButtonBox,
    MeetDelete,
} from './style'

import { Svg, TextArea } from '@components/common'
import { Calendar, calendarViewBox } from '@svgs/Calendar'
import { People, peopleViewBox } from '@svgs/People'
import { ActionItem, actionItemViewBox } from '@svgs/ActionItem'
import { Pin, pinViewBox } from '@svgs/Pin'
import { Notepad, noteViewBox } from '@svgs/Notepad'
import { agendasSWR } from '@api/agenda'
import { meetSWR } from '@api/meet'
import { actionsSWR } from '@api/actions'
import { useRouter } from 'next/router'
import axios from '@axios'
import { baseURL } from '@api/index'
import BodyAgenda from './BodyAgenda'
import BodyAction from './BodyAction'
import useMeeting from '@store/meeting/useMeeting'
import useMeetingActions from '@store/meeting/useMeetingActions'
import { AgendaState } from '@store/meeting/meetingSlice'

function Body() {
    const router = useRouter()
    const { id } = router.query
    const { meetData, meetMutate } = meetSWR(id)
    const { agendasData } = agendasSWR(id)
    // const { actionsData } = actionsSWR(id)
    const { agendas, agendaCursor } = useMeeting()
    const [activeAgenda, setActiveAgenda] = useState<AgendaState>(null)
    const [areaForm, setAreaForm] = useState({ discussion: '', decisions: '', agenda_title: '' })
    const { setForm } = useMeetingActions()
    const [agendaTitle, setAgendaTitle] = useState('')

    const { actionsData } = actionsSWR(activeAgenda?.agenda_id)

    const removeBtn = (meet_id: number) => {
        axios
            .patch(`${baseURL}/api/meet/`, {
                rm_status: 'W',
                meet_id: meet_id,
            })
            .then(() => {
                meetMutate()
            })
    }
    useEffect(() => {
        if (Array.isArray(agendas)) {
            setActiveAgenda(agendas[agendaCursor])
        }
    }, [agendaCursor, activeAgenda])
    useEffect(() => {
        if (activeAgenda) {
            setAreaForm({
                discussion: activeAgenda?.discussion,
                decisions: activeAgenda?.decisions,
                agenda_title: activeAgenda?.agenda_title,
            })
        }
    }, [activeAgenda])

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
    const onPatchAgenda = async () => {
        console.log('agendasData', agendasData)
        for (let i = 0; i < agendasData.length; i++) {
            // console.log('aaaaaa', agendasData)
            // await axios
            //     .patch(`${baseURL}/api/agenda/${agendasData?.[i]?.agenda_id}/`, {
            //         discussion: areaForm.discussion,
            //         decisions: areaForm.decisions,
            //     })
            //     .then((res) => {
            //         console.log('check --- ', agendasData?.[i].agenda_id)
            //         console.log('결과 확인', res)
            //     })
        }
    }

    useEffect(() => {
        // console.log('===', agendasData)
        // for (let i = 0; i < agendasData.length; i++) {
        //     console.log('===11', agendasData[i]?.progress_time)
        //     console.log('===2', agendasData[i]?.progress_time)
        // }
        // Math.floor(datas?.progress_time / 60)
    }, [])

    return (
        <BoxContainer>
            {/* 회의 목적, 소요시간 */}
            <TopBox>
                <TopBoxColLeft>
                    <div className="top-box-title">전체 회의 소요시간 / 목표시간</div>
                    <p className="top-box-emoji">😎</p>
                    <div className="top-box-titme">
                        <span className="big-time">45분</span>
                        <span className="small-time"> / 45분</span>
                    </div>
                    <div className="top-message">목표시간에 딱 맞게 끝났어요!</div>
                </TopBoxColLeft>
                <TopBoxColRight>
                    <div className="top-box-title">회의 목적</div>
                    <div className="top-box-content">{meetData?.[0].goal}</div>
                </TopBoxColRight>
            </TopBox>
            {/* 아젠다 박스 */}
            {agendasData &&
                agendasData?.map((datas, index) => {
                    return (
                        <AgendaBox key={datas.agenda_id}>
                            <AgendaTitle>
                                <AgendaId>AGENDA {datas?.order_number}</AgendaId>
                                <div className="agenda-title">
                                    <TextArea
                                        name="agenda_title"
                                        onChange={onChange}
                                        className="test11"
                                        value={areaForm?.agenda_title || datas?.agenda_title}
                                    />
                                    {/* {datas?.agenda_title} */}
                                </div>
                            </AgendaTitle>
                            {datas?.progress_time <= datas?.setting_time ? (
                                <AgendaBodyGoodTime>
                                    <div style={{ fontSize: '35px' }}>🥳</div>
                                    <div className="agenda-body-time">
                                        {Math.floor(datas?.progress_time / 60)}분{' '}
                                        <span> / {Math.floor(datas?.setting_time / 60)}분</span>
                                    </div>

                                    <div className="agenda-body-good-message">
                                        목표시간보다{' '}
                                        <span>
                                            {Math.floor(datas?.setting_time / 60) -
                                                Math.floor(datas?.progress_time / 60)}
                                            분 빨리 끝났어요!
                                        </span>
                                    </div>
                                </AgendaBodyGoodTime>
                            ) : (
                                <AgendaBodyBadTime>
                                    <div style={{ fontSize: '35px' }}>🥵</div>
                                    <div className="agenda-body-time">
                                        {Math.floor(datas?.progress_time / 60)}분{' '}
                                        <span> / {Math.floor(datas?.setting_time / 60)}분</span>
                                    </div>

                                    <div className="agenda-body-bad-message">
                                        목표시간보다{' '}
                                        <span>
                                            {Math.floor(datas?.progress_time / 60) -
                                                Math.floor(datas?.setting_time / 60)}
                                            분 늦게 끝났어요!
                                        </span>
                                    </div>
                                </AgendaBodyBadTime>
                            )}
                            <ActionItemBox>
                                <ActionItemText>
                                    <Svg
                                        viewBox={actionItemViewBox}
                                        width={'20'}
                                        height={'20'}
                                        style={{
                                            marginRight: '7px',
                                            paddingTop: '5px',
                                        }}
                                    >
                                        <ActionItem />
                                    </Svg>
                                    액션 아이템
                                </ActionItemText>
                                <BodyAction actionsDatas={datas?.agenda_id} />
                            </ActionItemBox>
                            <FixBox>
                                <ActionItemText>
                                    <Svg
                                        viewBox={pinViewBox}
                                        width={'20'}
                                        height={'20'}
                                        style={{
                                            marginRight: '7px',
                                            paddingTop: '5px',
                                        }}
                                    >
                                        <Pin />
                                    </Svg>
                                    결정된 사항
                                </ActionItemText>
                                {/* <div className="action-middle-title">{datas?.decisions}</div> */}
                                <ul>
                                    <ActionUi>
                                        <TextArea
                                            name="discussion"
                                            value={areaForm?.discussion || datas?.discussion}
                                            onChange={onChange}
                                            row={
                                                areaForm?.discussion === null
                                                    ? 1
                                                    : areaForm?.discussion?.split('\n').length + 1
                                            }
                                        />
                                    </ActionUi>
                                </ul>
                            </FixBox>
                            <FixBox>
                                <ActionItemText>
                                    <Svg
                                        viewBox={noteViewBox}
                                        width={'20'}
                                        height={'20'}
                                        style={{
                                            marginRight: '7px',
                                            paddingTop: '5px',
                                        }}
                                    >
                                        <Notepad />
                                    </Svg>
                                    논의 내용
                                </ActionItemText>
                                {/* <div className="action-middle-title">{datas?.discussion}</div> */}
                                <ul>
                                    <ActionUi>
                                        {' '}
                                        <TextArea
                                            name="decisions"
                                            value={areaForm?.decisions || datas?.decisions}
                                            onChange={onChange}
                                            row={
                                                areaForm?.decisions === null
                                                    ? 1
                                                    : areaForm?.decisions?.split('\n').length + 1
                                            }
                                        />
                                    </ActionUi>
                                </ul>
                                {/* <BodyAgenda datas={agendasData} /> */}
                            </FixBox>
                        </AgendaBox>
                    )
                })}
            <MeetDelete
                onClick={() => {
                    removeBtn(meetData?.[0].meet_id)
                    router.push('/')
                }}
            >
                회의록 삭제
            </MeetDelete>
            <ButtonBox>
                <button className="cancel-btn" onClick={() => router.push(`/`)}>
                    취소
                </button>
                <button
                    className="okay-btn"
                    onClick={() => {
                        onPatchAgenda()
                        // router.push(`/`)
                    }}
                >
                    저장
                </button>
            </ButtonBox>
        </BoxContainer>
    )
}

export default Body
