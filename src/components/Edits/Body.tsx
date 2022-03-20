import React, { useEffect, useState } from 'react'
import {
    BoxContainer,
    TitleText,
    TitleSubText,
    TopBox,
    TopBoxColLeft,
    TopBoxColRight,
    AgendaBox,
    AgendaId,
    AgendaTitle,
    AgendaBodyGoodTime,
    AgendaBodyBadTime,
    BoxTopContainer,
    ActionItemBox,
    ActionItemText,
    ActionItemEl,
    FixBox,
    ActionUi,
    ButtonBox,
    MeetDelete,
    ChartBox,
    ResultText,
} from './style'
import styled from 'styled-components'
import moment from 'moment'
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
import { AgendaState, MeetState } from '@store/meeting/meetingSlice'
import CheckList from '@components/CheckList'

const StyledDateInput = styled.div<{ isValue?: boolean }>`
    position: relative;
    input[type='date'] {
        color: ${({ isValue }) => (isValue ? 'inherit' : '#c0c0c2')};
    }
    input[type='date'] {
    }
    input[type='date']::-webkit-inner-spin-button,
    input[type='date']::-webkit-calendar-picker-indicator {
        background: transparent;
        bottom: 0;
        color: transparent;
        cursor: pointer;
        height: auto;
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
        width: auto;
    }
`

function Body() {
    const router = useRouter()
    const { id } = router.query
    const { meetData, meetMutate } = meetSWR(id)
    const { agendasData } = agendasSWR(id)
    // const { actionsData } = actionsSWR(id)
    const { agendas, agendaCursor } = useMeeting()
    const [activeMeet, setActiveMeet] = useState<MeetState>(null)
    const [activeAgenda, setActiveAgenda] = useState<AgendaState>(null)
    const [areaForm, setAreaForm] = useState({
        discussion: '',
        decisions: '',
        agenda_title: '',
        meet_title: '',
        goal: '',
    })
    const { setForm } = useMeetingActions()
    const [agendaTitle, setAgendaTitle] = useState('')

    const [isOpen, setIsOpen] = useState(false)
    const handleClose = () => setIsOpen(false)
    const [checkDatas, setCheckDatas] = useState(null)

    const { actionsData } = actionsSWR(activeAgenda?.agenda_id)

    useEffect(() => {
        if (Array.isArray(agendas)) {
            setActiveAgenda(agendas[agendaCursor])
        } else if (Array.isArray(agendas)) {
            setActiveMeet(agendas[agendaCursor])
        }
    }, [agendaCursor, activeAgenda])
    useEffect(() => {
        if (activeAgenda && activeMeet) {
            setAreaForm({
                discussion: activeAgenda?.discussion,
                decisions: activeAgenda?.decisions,
                agenda_title: activeAgenda?.agenda_title,
                meet_title: activeMeet?.meet_title,
                goal: activeMeet?.goal,
            })
            // console.log('aaaa', activeAgenda?.discussion)
        }
    }, [activeAgenda])

    const [inputs, setInputs] = useState({
        agenda_title: '',
        discussion: '',
        decisions: '',
    })

    const onChange = (e) => {
        const { value, name } = e.target
        let rValue = value.replace(/\- /gi, ' · ')
        setAreaForm((prev) => ({ ...prev, [name]: rValue }))
        const newAgenda = {
            ...activeAgenda,
            ...activeMeet,
            [name]: rValue,
        }
        setForm({ agendaCursor, newAgenda })
    }
    const onPatchAgenda = async () => {
        // console.log('agendasData', agendasData)
        for (let i = 0; i < agendasData.length; i++) {
            // console.log('aaaaaa', agendasData)
            await axios
                .patch(`${baseURL}/api/meet/${id}/`, {
                    meet_title: areaForm.meet_title,
                    goal: areaForm.goal,
                })
                .then((res) => {
                    // console.log('meet update', res)
                })

            await axios
                .patch(`${baseURL}/api/agenda/${agendasData?.[i]?.agenda_id}/`, {
                    agenda_title: areaForm.agenda_title,
                    discussion: areaForm.discussion,
                    decisions: areaForm.decisions,
                })
                .then((res) => {
                    // console.log('check --- ', agendasData?.[i].agenda_id)
                    // console.log('결과 확인', res)
                })
        }
    }
    function progressTimeSum() {
        let sum = 0
        for (let i = 0; i < agendasData?.length; i++) {
            sum += Number(agendasData[i]?.progress_time)
        }
        return Math.floor(sum / 60)
    }
    function settiongTimeSum() {
        let sum = 0
        for (let i = 0; i < agendasData?.length; i++) {
            sum += agendasData[i]?.setting_time
        }
        return Math.floor(sum / 60)
    }

    function timeText() {
        if (progressTimeSum() > settiongTimeSum()) {
            return <div style={{ color: '#e24646' }}>다음번에는 목표시간을 지켜보세요!</div>
        } else if (progressTimeSum() < settiongTimeSum()) {
            return <div>목표 시간보다 빨리 끝났어요!</div>
        } else if (progressTimeSum() === settiongTimeSum()) {
            return <div>목표시간에 딱 맞게 끝났어요!</div>
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
        <>
            {isOpen && <CheckList onClose={handleClose} />}
            <BoxTopContainer>
                <div style={{ float: 'left' }}>
                    <TitleText>
                        <TextArea
                            name="meet_title"
                            onChange={onChange}
                            className="meet-titile-class"
                            value={areaForm?.meet_title || meetData?.[0].meet_title}
                        />
                    </TitleText>
                    <TitleSubText style={{ marginBottom: '12px' }}>
                        <Svg viewBox={calendarViewBox} width={'15'} height={'15'} style={{ marginRight: '15px' }}>
                            <Calendar />
                        </Svg>
                        {moment(meetData?.meet_date).format('YYYY-MM-DD')}
                        {/* <StyledDateInput isValue={meetData?.meet_date ? true : false}>
                            <input
                                type="date"
                                // data-placeholder="마감기한"
                                min={moment(new Date()).format('YYYY-MM-DD')}
                                value={moment(meetData?.meet_date).format('YYYY-MM-DD')}
                                name="meet_id"
                                onChange={(e) => {
                                    // onChange(e, meetData?.meet_id, idx)
                                }}
                            />
                        </StyledDateInput> */}
                    </TitleSubText>
                    <TitleSubText>
                        <Svg viewBox={peopleViewBox} width={'15'} height={'15'} style={{ marginRight: '15px' }}>
                            <People />
                        </Svg>
                        {meetData?.[0].participants}
                    </TitleSubText>
                </div>

                <ChartBox onClick={() => setIsOpen(true)}>
                    회의 자가진단 결과
                    <ResultText>점</ResultText>
                </ChartBox>
            </BoxTopContainer>
            <BoxContainer>
                {/* 회의 목적, 소요시간 */}
                <TopBox>
                    <TopBoxColLeft>
                        <div className="top-box-title">전체 회의 소요시간 / 목표시간</div>
                        <p className="top-box-emoji">
                            {' '}
                            <img src="/image/assets/icon/Full.png" style={{ width: '72px', height: '72px' }} />
                        </p>
                        <div className="top-box-titme">
                            <span className="big-time">{progressTimeSum()}분</span>
                            <span className="small-time"> / {settiongTimeSum()}분</span>
                        </div>
                        <div className="top-message">{timeText()}</div>
                    </TopBoxColLeft>
                    <TopBoxColRight>
                        <div className="top-box-title">회의 목적</div>
                        {/* <div className="top-box-content">{meetData?.[0].goal}</div> */}
                        <div className="top-box-content">
                            <TextArea
                                name="goal"
                                onChange={onChange}
                                className="top-box-content"
                                value={areaForm?.goal || meetData?.[0].goal}
                            />
                        </div>
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
                                        <div style={{ fontSize: '35px' }}>
                                            {' '}
                                            <img
                                                src="/image/assets/icon/Success_mini.png"
                                                style={{ width: '32px', height: '32px' }}
                                            />
                                        </div>
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
                                        <div style={{ fontSize: '35px' }}>
                                            <img
                                                src="/image/assets/icon/Fail_mini.png"
                                                style={{ width: '32px', height: '32px' }}
                                            />
                                        </div>
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
        </>
    )
}

export default Body
