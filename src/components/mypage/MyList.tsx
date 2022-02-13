import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Banner, Svg } from '@components/common'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import axios from 'axios'
import moment from 'moment'

const TabContainer = styled.div`
    border: 1px solid blue;
    width: 1000px;
    height: 500px;
    border-radius: 24px;
    background-color: #fff;
    display: flex;
    flex-direction: row;
    // position: relative;
`
const BoxContainer = styled.div`
    border: 1px solid red;
    width: 30%;
    height: 30%;
    margin: 10px;
    position: relative;
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
const pMargin = {
    margin: '5px',
    border: '1px solid green',
}

const fetcher = (url) => axios.get(url).then((res) => res.data)
function MyList() {
    const [testData, setTestData] = useState(undefined)
    const { data: meetDatas, error } = useSWR(
        'http://127.0.0.1:8000/api/meet/',
        fetcher,
        { revalidateOnFocus: true }
    )
    {
        /* <div>
                        <p>
                            아직 회의록을 작성하지 않으셨나요? <br /> 팀원들과
                            함께 효율적인 회의를 진행해보세요!
                        </p>
                        <button>회의 시작하기</button>
                    </div> */
    }
    React.useEffect(() => {
        console.log('겟 미트 api', meetDatas)
    }, [])
    return (
        <TabContainer>
            {/* {meetDatas} */}
            {meetDatas ? (
                meetDatas.map((meetData: any) => {
                    return (
                        <BoxContainer key={meetData.meet_id}>
                            <p style={pMargin} className="status-name">
                                {meetData.status}
                            </p>
                            <p style={pMargin} className="meet_title-name">
                                {meetData.meet_title}
                            </p>
                            <p style={pMargin} className="last_time-name">
                                {moment(meetData.last_time).format(
                                    'YYYY-MM-DD hh:mm'
                                )}
                            </p>
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
