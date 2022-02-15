import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { Svg } from '@components/common'
import { Power, powerViewBox } from '@svgs/Power'
import CloseMeetingModal from './CloseMeetingModal'
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
        gap: 32px;
        font-size: 16px;
        font-weight: 500;
        line-height: 1.5;
        color: #000;
        .meeting_control_info {
            color: #87878b;
            cursor: pointer;
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

function Header() {
    const [isCloseMeeting, setIsCloseMeeting] = useState(false)
    const handleCloseMeeting = () => {}

    return (
        <>
            <Container>
                <div className="meeting_title">회의 제목</div>
                <div className="meeting_control">
                    <div className="meeting_control_info">회의정보</div>
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
                        <div>회의종료</div>
                    </div>
                </div>
            </Container>
            <CloseMeetingModal />
        </>
    )
}

export default Header
