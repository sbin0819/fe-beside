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

import { Svg } from '@components/common'
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

function Body() {
    const router = useRouter()
    const { id } = router.query
    const { meetData, meetMutate } = meetSWR(id)
    const { agendasData } = agendasSWR(id)
    const { actionsData } = actionsSWR(id)

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
                                <div className="agenda-title">{datas?.agenda_title}</div>
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
                                    <ActionUi>{datas?.decisions}</ActionUi>
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
                                    <ActionUi>{datas?.decisions}</ActionUi>
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
                <button className="cancel-btn">수정</button>
                <button className="okay-btn" onClick={() => router.push('/')}>
                    확인
                </button>
            </ButtonBox>
        </BoxContainer>
    )
}

export default Body
