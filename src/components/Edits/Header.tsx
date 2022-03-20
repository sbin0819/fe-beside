import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from '@axios'
import { baseURL } from '@api/index'
import { Svg } from '@components/common'
import { Calendar, calendarViewBox } from '@svgs/Calendar'
import { People, peopleViewBox } from '@svgs/People'
import { meetSWR } from '@api/meet'
import { checkSWR } from '@api/checklist'
import moment from 'moment'
import { useRouter } from 'next/router'
import CheckList from '@components/CheckList'
import useSWR from 'swr'
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
const ResultText = styled.div`
    font-size: 32px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.31;
    letter-spacing: normal;
    text-align: left;
    color: #3c3c43;
    margin-top: 20px;
`

function Header() {
    const router = useRouter()
    const { id } = router.query
    const { meetData } = meetSWR(id)
    const { checkData } = checkSWR(id)

    const [isOpen, setIsOpen] = useState(false)
    const handleClose = () => setIsOpen(false)
    const [checkDatas, setCheckDatas] = useState(null)

    const tenResullt = [
        checkDatas?.check1,
        checkDatas?.check2,
        checkDatas?.check3,
        checkDatas?.check8,
        checkDatas?.check9,
        checkDatas?.check10,
    ]
    const fiveResult = [checkDatas?.check4, checkDatas?.check5, checkDatas?.check6, checkDatas?.check7]
    const ten_length = tenResullt.filter((check) => check === 'Y')
    const five_length = fiveResult.filter((check) => check === 'Y')
    const tenScore = ten_length.length * 10
    const fiveScore = five_length.length * 15
    const resultScore = tenScore + fiveScore

    const { data } = useSWR(`${baseURL}/api/selfcheck/?meet_id=${id}`, (url) =>
        axios.get(url).then((res) => {
            // console.log('66', res.data)
            res.data
            setCheckDatas(res.data?.[0])
        })
    )

    // useEffect(() => {
    //     axios.get(`${baseURL}/api/selfcheck/?meet_id=${id}`).then((res) => {
    //         setCheckDatas(res.data?.[0])
    //         // console.log('최종점수', res.data?.[0])
    //         // console.log('점수는요?', tenScore, fiveScore, resultScore)
    //     })
    // }, [])

    return (
        <div>
            {isOpen && <CheckList onClose={handleClose} />}
            <BoxContainer>
                <div style={{ float: 'left' }}>
                    <TitleText>{meetData?.[0].meet_title}</TitleText>
                    <TitleSubText style={{ marginBottom: '12px' }}>
                        <Svg viewBox={calendarViewBox} width={'15'} height={'15'} style={{ marginRight: '15px' }}>
                            <Calendar />
                        </Svg>
                        {moment(meetData?.meet_date).format('YYYY-MM-DD')}
                    </TitleSubText>
                    <TitleSubText>
                        <Svg viewBox={peopleViewBox} width={'15'} height={'15'} style={{ marginRight: '15px' }}>
                            <People />
                        </Svg>
                        {meetData?.[0].participants}
                    </TitleSubText>
                </div>

                <ChartBox onClick={() => setIsOpen(true)}>
                    회의 자가진단 결과
                    <ResultText>{resultScore}점</ResultText>
                </ChartBox>
            </BoxContainer>
        </div>
    )
}

export default Header
