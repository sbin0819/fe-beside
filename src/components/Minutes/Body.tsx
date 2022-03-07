import React from 'react'
import {
    BoxContainer,
    TopBox,
    TopBoxColLeft,
    TopBoxColRight,
    AgendaBox,
    AgendaId,
    AgendaTitle,
    AgendaBodyTime,
    ActionItemBox,
    ActionItemText,
    ActionItemEl,
    FixBox,
    ActionUi,
} from './style'

import { Svg } from '@components/common'
import { Calendar, calendarViewBox } from '@svgs/Calendar'
import { People, peopleViewBox } from '@svgs/People'
import { ActionItem, actionItemViewBox } from '@svgs/ActionItem'
import { Pin, pinViewBox } from '@svgs/Pin'
import { Notepad, noteViewBox } from '@svgs/Notepad'

function Body() {
    return (
        <BoxContainer>
            {/* 회의 목적, 소요시간 */}
            <TopBox>
                <TopBoxColLeft>
                    <div className="top-box-title">
                        전체 회의 소요시간 / 목표시간
                    </div>
                    <p className="top-box-emoji">😎</p>
                    <div className="top-box-titme">
                        <span className="big-time">45분</span>
                        <span className="small-time"> / 45분</span>
                    </div>
                    <div className="top-message">
                        목표시간에 딱 맞게 끝났어요!
                    </div>
                </TopBoxColLeft>
                <TopBoxColRight>
                    <div className="top-box-title">회의 목적</div>
                    <div className="top-box-content">
                        오구민 회의 58분 안에 논의사항 모두 결론 내리기
                    </div>
                </TopBoxColRight>
            </TopBox>
            {/* 아젠다 박스 */}
            <AgendaBox>
                <AgendaTitle>
                    <AgendaId>AGENDA 1</AgendaId>
                    <div className="agenda-title">
                        회의 진행 화면 UI 디자인 시안 발표 및 개발 구현 관련
                        논의 하자!
                    </div>
                </AgendaTitle>
                <AgendaBodyTime>
                    <div style={{ fontSize: '35px' }}>🥳</div>
                    <div className="agenda-body-time">
                        27분 <span> / 30분</span>
                    </div>
                    <div className="agenda-body-message">
                        목표시간보다 <span>3분 빨리 끝났어요!</span>
                    </div>
                </AgendaBodyTime>
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
                        <ActionUi>
                            타이머 관련 : png 시컨스로 애니메이션 전달
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
                    <div className="action-middle-title">회의록 목록</div>
                    <ul>
                        <ActionUi>
                            hover시 나오는 버튼 옵션 : 회의록 설정 / 삭제 /
                            회의록 세가지
                        </ActionUi>
                    </ul>
                </FixBox>
            </AgendaBox>
        </BoxContainer>
    )
}

export default Body
