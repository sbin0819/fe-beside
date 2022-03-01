import React from 'react'
import { Svg } from '@components/common'
import { Dropdown, dropdownViewBox } from '@svgs/Dropdown'
import styled from 'styled-components'
import useMeeting from '@store/meeting/useMeeting'

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 656px;
    height: 72px;
    padding: 0 24px;
    flex-grow: 0;
    border-radius: 24px;
    box-shadow: 2px 4px 16px 0 rgba(0, 0, 0, 0.08);
    border: solid 1px #f1f1f1;
    background: #fff;
    .agenda_order {
        font-family: Pretendard;
        font-size: 14px;
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.43;
        letter-spacing: normal;
        text-align: left;
        color: #87878b;
        margin-right: 12px;
    }
    .agenda_desc {
        font-family: Pretendard;
        font-size: 16px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.5;
        letter-spacing: normal;
        text-align: left;
        color: #000;
    }
    .summary_progress {
        display: flex;
        align-items: center;
        .agenda_type {
            font-weight: bold;
            font-stretch: normal;
            font-style: normal;
            line-height: normal;
            letter-spacing: normal;
            text-align: left;
            color: #f79058;
            margin-right: 26px;
        }
    }
`
function MeetingSummary() {
    const { meet, agendas } = useMeeting()
    console.log(meet)
    return (
        <Container>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <div className="agenda_order">AGENDA1</div>
                <div className="agenda_desc">{meet.goal}</div>
            </div>
            <div className="summary_progress">
                <div className="agenda_type">진행중</div>
                <div>
                    <Svg viewBox={dropdownViewBox} width={'20'} height={'18'}>
                        <Dropdown />
                    </Svg>
                </div>
            </div>
        </Container>
    )
}

export default MeetingSummary
