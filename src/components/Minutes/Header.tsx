import React, { useEffect } from 'react'
import styled from 'styled-components'
import axios from '@axios'
import { Svg } from '@components/common'
import { Calendar, calendarViewBox } from '@svgs/Calendar'

const BoxContainer = styled.div`
    position: absolute;
    transform: translateX(-50%);
    width: 1140px;
    border: 1px solid red;
    left: 50%;
    // font-algin: left;
    top: 70px;
`
const TitleText = styled.h2`
    font-size: 30px;
    // float: left;
    font-weight: bold;
    margin-bottom: 15px;
    width: 500px;
    border: 1px solid red;
`
const TitleSubText = styled.p`
    // float: left;
    color: gray;
    width: 500px;
`
const ChartBox = styled.div`
    float: right;
    // right: 0;
    // top: 0;
    // position: absolute;
    width: 300px;
    height: 150px;
    background-color: yellow;
`

function Header() {
    return (
        <BoxContainer>
            <TitleText>칠성 사이다 - 9차 정기 주간회의</TitleText>
            <TitleSubText>
                <Svg
                    viewBox={calendarViewBox}
                    width={'13'}
                    height={'13'}
                    style={{ marginRight: '5.6px' }}
                >
                    <Calendar />
                </Svg>
                2021-01-03
            </TitleSubText>
            <TitleSubText>김철수, 이짱구</TitleSubText>
            <ChartBox>차트임다</ChartBox>
        </BoxContainer>
    )
}

export default Header
