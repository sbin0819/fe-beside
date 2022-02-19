import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { Svg } from '@components/common'
import { Power, powerViewBox } from '@svgs/Power'
import CloseMeetingModal from './CloseMeetingModal'
import useMeeting from '@store/meeting/useMeeting'
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
    const { meet } = useMeeting()
    const [isCloseMeeting, setIsCloseMeeting] = useState(false)
    const handleCloseMeeting = () => setIsCloseMeeting(false)

    return (
        <>
            {isCloseMeeting && (
                <CloseMeetingModal onClose={handleCloseMeeting} />
            )}
            <Container>
                <div className="meeting_title">{meet?.meet_title}</div>
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