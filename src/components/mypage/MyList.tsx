import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Banner, Svg } from '@components/common'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import axios from 'axios'
import moment from 'moment'

const TabContainer = styled.div`
    width: 1000px;
    height: 500px;
    border-radius: 24px;
    // background-color: #fff;
    display: flex;
    flex-direction: row;
    // position: relative;
`
const BoxContainer = styled.div`
    border: 1px solid #f1f1f1;
    width: 390px;
    height: 200px;
    margin: 10px;
    background-color: #fff;
    box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.08);
    position: relative;
    border-radius: 24px;
    .status-name {
        position: absolute;
        right: 10px;
        top: 10px;
    }
    .meet_title-name {
        position: absolute;
        left: 10px;
        bottom: 50px;
    }
    .last_time-name {
        position: absolute;
        left: 10px;
        bottom: 20px;
    }
`
const DataNullBox = styled.div`
    // background-color: yellow;
    margin: 0 auto;
    text-align: center;
    color: 387878b;
    font-size: 16px;
    line-height: 1.5;
    font-weight: 500;
    .dataNullBtn {
        // width: 170px;
        height: 52px;
        flex-grow: 0;
        margin: 36px 97px 0;
        padding: 14px 40px;
        border-radius: 12px;
        background-color: #0c254c;
        font-size: 16px;
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.5;
        letter-spacing: normal;
        text-align: center;
        color: #fff;
    }
`
const InputPStype = styled.p`
    flex-grow: 0;
    margin: 48px 27px 2px 32px;
    font-size: 20px;
    font-weight: 500;
    line-height: 1.6;
    letter-spacing: normal;
    text-align: left;
    color: #000;
`
const Boxstatus = styled.p`
    border-radius: 8px;
    background-color: #fef4ee;
    color: #f79058;
    text-align: center;
    width: 72px;
    height: 26px;
    line-height: 26px;
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 12px;
`
const TimeStyle = styled.p`
    flex-grow: 0;
    font-family: Pretendard;
    font-size: 12px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #87878b;
    margin-left: 32px;
`

const fetcher = (url) => axios.get(url).then((res) => res.data)
function MyList() {
    const [testData, setTestData] = useState(undefined)
    const { data: meetDatas, error } = useSWR(
        'http://127.0.0.1:8000/api/meet/',
        fetcher,
        { revalidateOnFocus: true }
    )

    React.useEffect(() => {
        console.log('겟 미트 api', meetDatas)
    }, [])
    return (
        <TabContainer>
            {/* {meetDatas} */}
            <BoxContainer>
                <InputPStype>회의추가하기</InputPStype>
            </BoxContainer>
            {meetDatas ? (
                meetDatas.map((meetData: any) => {
                    return (
                        <BoxContainer key={meetData.meet_id}>
                            <Boxstatus>
                                {/* {meetData.status} */}
                                회의진행중
                            </Boxstatus>
                            <InputPStype className="meet_title-name">
                                {meetData.meet_title}
                            </InputPStype>
                            <TimeStyle className="last_time-name">
                                {moment(meetData.last_time).format(
                                    'YYYY-MM-DD hh시 mm분'
                                )}
                            </TimeStyle>
                        </BoxContainer>
                    )
                })
            ) : (
                <DataNullBox>
                    <div
                        style={{
                            width: '100px',
                            height: '100px',
                            backgroundColor: 'yellow',
                        }}
                    >
                        데이터 없는 이미지
                    </div>
                    <p className="nullPstyle">
                        아직 회의록을 작성하지 않으셨나요? <br /> 팀원들과 함께
                        효율적인 회의를 진행해보세요!
                    </p>
                    <button className="dataNullBtn">회의 시작하기</button>
                </DataNullBox>
            )}
        </TabContainer>
    )
}

export default MyList
