import React from 'react'
import { Svg } from '@components/common'
import { Dropdown, dropdownViewBox } from '@svgs/Dropdown'
import styled from 'styled-components'
import useMeeting from '@store/meeting/useMeeting'
import Image from 'next/image'
const Container = styled.div`
    display: flex;
    align-items: center;
    width: 656px;
    height: 72px;
    padding: 0 24px;
    flex-grow: 0;
    border-radius: 24px;
    box-shadow: 2px 4px 16px 0 rgba(0, 0, 0, 0.08);
    border: solid 1px #f1f1f1;
    background: #fff;
    gap: 16px;
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
    const { meet } = useMeeting()
    return (
        <Container>
            <div style={{ width: '20', height: '20' }}>
                <Image
                    src="/image/assets/megaphone/emoji-deco-megaphone@3x.png"
                    width={20}
                    height={20}
                />
            </div>
            <div>{meet.goal}</div>
        </Container>
    )
}

export default MeetingSummary
