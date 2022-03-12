import React, { useEffect } from 'react'
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

function Body() {
    const router = useRouter()
    const id = 4
    const { agendasData } = agendasSWR(id)
    const { meetData, meetMutate } = meetSWR(id)
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
        console.log('agendasData', agendasData)
        console.log('확인', meetData?.goal)
        console.log('actionsData', actionsData)
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
                agendasData.map((datas) => {
                    return (
                        <AgendaBox key={datas.agenda_id}>
                            <AgendaTitle>
                                <AgendaId>AGENDA {datas?.agenda_id}</AgendaId>
                                <div className="agenda-title">{datas?.agenda_title}</div>
                            </AgendaTitle>
                            {datas?.progress_time <= datas?.setting_time ? (
                                <AgendaBodyGoodTime>
                                    <div style={{ fontSize: '35px' }}>🥳</div>
                                    <div className="agenda-body-time">
                                        {datas?.progress_time}분{' '}
                                        <span> / {datas?.setting_time}분</span>
                                    </div>

                                    <div className="agenda-body-good-message">
                                        목표시간보다{' '}
                                        <span>
                                            {datas?.setting_time - datas?.progress_time}분 빨리
                                            끝났어요!
                                        </span>
                                    </div>
                                </AgendaBodyGoodTime>
                            ) : (
                                <AgendaBodyBadTime>
                                    <div style={{ fontSize: '35px' }}>🥵</div>
                                    <div className="agenda-body-time">
                                        {datas?.progress_time}분{' '}
                                        <span> / {datas?.setting_time}분</span>
                                    </div>

                                    <div className="agenda-body-bad-message">
                                        목표시간보다{' '}
                                        <span>
                                            {datas?.progress_time - datas?.setting_time}분 늦게
                                            끝났어요!
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
                                <ActionItemEl>
                                    <div className="action-item-title">
                                        회의 진행 화면 UI 피드백 반영 후 개발팀 공유
                                    </div>
                                    <div className="action-item-member">
                                        <Svg
                                            viewBox={peopleViewBox}
                                            width={'15'}
                                            height={'15'}
                                            style={{
                                                marginRight: '15px',
                                            }}
                                        >
                                            <People />
                                        </Svg>
                                        김철수, 안철수, 오철수
                                    </div>
                                    <div className="action-item-time">
                                        {' '}
                                        <Svg
                                            viewBox={calendarViewBox}
                                            width={'15'}
                                            height={'15'}
                                            style={{ marginRight: '15px' }}
                                        >
                                            <Calendar />
                                        </Svg>
                                        20-02-11
                                    </div>
                                </ActionItemEl>
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
                                <div className="action-middle-title">회의 진행 화면</div>
                                <ul>
                                    <ActionUi>타이머 관련 : png 시컨스로 애니메이션 전달</ActionUi>
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
                                <div className="action-middle-title">회의록 목록</div>
                                <ul>
                                    <ActionUi>
                                        hover시 나오는 버튼 옵션 : 회의록 설정 / 삭제 / 회의록
                                        세가지
                                    </ActionUi>
                                </ul>
                            </FixBox>
                        </AgendaBox>
                    )
                })}
            <MeetDelete
                onClick={() => {
                    removeBtn(id)
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
