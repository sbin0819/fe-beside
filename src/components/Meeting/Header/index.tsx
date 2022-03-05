import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { Svg } from '@components/common'
import { Power, powerViewBox } from '@svgs/Power'
import { Calendar, calendarViewBox } from '@svgs/Calendar'
import { People, peopleViewBox } from '@svgs/People'
import CloseMeetingModal from './CloseMeetingModal'
import useMeeting from '@store/meeting/useMeeting'
import moment from 'moment'
export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    line-height: 1.5;
    font-family: Pretendard;
    margin-bottom: 24px;

    .meeting_title {
        font-size: 28px;
        font-weight: bold;
        color: #000;
    }
    .meeting_control {
        display: flex;
        align-items: center;
        gap: 20px;
        font-size: 16px;
        font-weight: 500;
        line-height: 1.5;
        color: #000;
        .meeting_control_info {
            color: #87878b;
            cursor: pointer;
            width: 80px;
            padding: 4px 12px;
            :hover {
                border-radius: 12px;
                background: #fff;
                color: #000;
            }
        }
        .meeting_control_power {
            display: flex;
            align-self: center;
            cursor: pointer;
            svg {
                padding-right: 4px;
            }
        }
    }
`

const MeetingInfo = styled.div`
    position: absolute;
    width: 524px;
    height: 40px;
    flex-grow: 0;
    padding: 10px 16px 10px 20px;
    border-radius: 12px;
    background-color: #3c3c43;
    color: #fff;
    right: 0;
    top: -40px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.43;
    letter-spacing: normal;
    color: #fff;
    .inner_info {
        display: flex;
        align-items: center;
        svg {
            background: gold;
        }
        .date {
            display: flex;
            align-items: center;
            font-size: 14px;
            gap: 9px;
        }
        .participants {
            display: flex;
            align-items: center;
            font-size: 14px;
            gap: 9px;
            margin-left: 22px;
        }
    }
`
const Poly = styled.div`
    position: absolute;
    top: 0px;
    left: 5px;
    width: 14px;
    height: 8px;
    flex-grow: 0;
    margin: 40px 137px 0 373px;
    transform: rotate(-180deg);
    /* background-color: #3c3c43; */
    border-bottom: 8px solid #3c3c43;
    border-top: 10px solid transparent;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
`

function Header() {
    const { meet, agendas } = useMeeting()
    const [isCloseMeeting, setIsCloseMeeting] = useState(false)
    const handleCloseMeeting = () => setIsCloseMeeting(false)
    const [isShowInfo, setIsShowInfo] = useState(false)
    return (
        <>
            {isCloseMeeting && (
                <CloseMeetingModal onClose={handleCloseMeeting} />
            )}
            <Container>
                <div className="meeting_title">{meet?.meet_title}</div>
                <div className="meeting_control">
                    {isShowInfo && (
                        <div>
                            <MeetingInfo>
                                <div className="inner_info">
                                    <div className="date">
                                        <Svg
                                            viewBox={calendarViewBox}
                                            width={'20'}
                                            height={'18'}
                                        >
                                            <Calendar />
                                        </Svg>
                                        {moment(meet?.meet_date).format(
                                            'YYYY-MM-DD'
                                        )}
                                    </div>
                                    <div className="participants">
                                        <Svg
                                            viewBox={peopleViewBox}
                                            width={'16'}
                                            height={'16'}
                                        >
                                            <People />
                                        </Svg>
                                        {meet.participants.replace(/\,/g, ', ')}
                                    </div>
                                </div>
                                <Poly className="poly"></Poly>
                            </MeetingInfo>
                        </div>
                    )}
                    <div
                        className="meeting_control_info"
                        onMouseEnter={() => setIsShowInfo(true)}
                        onMouseLeave={() => setIsShowInfo(false)}
                    >
                        회의정보
                    </div>
                    <div className="meeting_control_power">
                        <div>
                            <Svg
                                viewBox={powerViewBox}
                                width={'20'}
                                height={'20'}
                            >
                                <Power />
                            </Svg>
                        </div>
                        <div onClick={() => setIsCloseMeeting(true)}>
                            회의종료
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Header
