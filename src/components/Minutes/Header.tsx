import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from '@axios'
import { Svg } from '@components/common'
import { Calendar, calendarViewBox } from '@svgs/Calendar'
import { People, peopleViewBox } from '@svgs/People'
import { meetSWR } from '@api/meet'
import moment from 'moment'
import { useRouter } from 'next/router'
import CheckList from '@components/CheckList'
const BoxContainer = styled.div`
    position: absolute;
    transform: translateX(-50%);
    width: 1140px;

    left: 50%;
    top: 70px;
`
const TitleText = styled.h2`
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 24px;
    width: 500px;
    line-height: 1.43;
`
const TitleSubText = styled.p`
    color: #3c3c43;
    width: 500px;
    font-size: 14px;
    line-height: 1.43;
`
const ChartBox = styled.div`
    float: right;
    width: 267px;
    height: 134px;
    cursor: pointer;
    flex-grow: 0;
    padding: 28px 32px 25px;
    border-radius: 24px;
    box-shadow: 2px 4px 16px 0 rgba(0, 0, 0, 0.08);
    border: solid 1px #f1f1f1;
    background-color: #fff;
`

function Header() {
    const router = useRouter()
    const { id } = router.query
    const { meetData } = meetSWR(id)

    const [isOpen, setIsOpen] = useState(false)
    const handleClose = () => setIsOpen(false)

    return (
        <BoxContainer>
            <div style={{ float: 'left' }}>
                <TitleText>{meetData?.[0].meet_title}</TitleText>
                <TitleSubText style={{ marginBottom: '12px' }}>
                    <Svg
                        viewBox={calendarViewBox}
                        width={'15'}
                        height={'15'}
                        style={{ marginRight: '15px' }}
                    >
                        <Calendar />
                    </Svg>
                    {moment(meetData?.meet_date).format('YYYY-MM-DD')}
                </TitleSubText>
                <TitleSubText>
                    <Svg
                        viewBox={peopleViewBox}
                        width={'15'}
                        height={'15'}
                        style={{ marginRight: '15px' }}
                    >
                        <People />
                    </Svg>
                    {meetData?.[0].participants}
                </TitleSubText>
            </div>
            {isOpen && <CheckList onClose={handleClose} />}
            <ChartBox
                onClick={() => {
                    router.push(`/result/${id}`)
                    setIsOpen(true)
                }}
            >
                회의 자가진단 결과
            </ChartBox>
        </BoxContainer>
    )
}

export default Header
