import React, { useState } from 'react'
import styled from 'styled-components'
import {
    TabContainer,
    BoxContainer,
    DataNullBox,
    InputPStype,
    BoxstatusY,
    BoxstatusW,
    BoxstatusE,
    TimeStyle,
    ImgStatus,
    HoverBoxContainer,
    HoverImgStatus,
    HoverDiv,
} from '../styles'
import moment from 'moment'
import { Svg } from '@components/common'
import { Power, powerViewBox } from '@svgs/Power'
import { Add, addViewBox } from '@svgs/Add'

function YDataList(props: any) {
    const [state, setState] = useState('')
    const [isShow, setIsShow] = useState(false)

    const stateData = [
        {
            id: 0,
            state: 'Y',
            stateDiv: <BoxstatusY>회의진행중</BoxstatusY>,
            stateImg: (
                <ImgStatus>
                    <Svg viewBox={addViewBox} width={'32'} height={'32'}>
                        <Add />
                    </Svg>
                </ImgStatus>
            ),
        },
        {
            id: 1,
            state: 'W',
            stateDiv: <BoxstatusW>회의예정</BoxstatusW>,
            stateImg: (
                <ImgStatus>
                    <Svg viewBox={powerViewBox} width={'32'} height={'32'}>
                        <Power />
                    </Svg>
                </ImgStatus>
            ),
        },
        {
            id: 2,
            state: 'E',
            stateDiv: <BoxstatusE>회의완료</BoxstatusE>,
            stateImg: (
                <ImgStatus>
                    <Svg viewBox={powerViewBox} width={'32'} height={'32'}>
                        <Power />
                    </Svg>
                </ImgStatus>
            ),
        },
    ]
    const MouseOver = () => {
        console.log('올림')
        return <HoverBoxContainer>asda</HoverBoxContainer>
    }

    let meetDatas = props.data
    console.log('meetDatas', meetDatas)
    return (
        <React.Fragment>
            <TabContainer>
                {/* <HoverBoxContainer>
                    <HoverDiv
                        style={{
                            position: 'absolute',
                            bottom: '67px',
                            left: '96px',
                        }}
                    >
                        <HoverImgStatus>
                        <Svg viewBox={powerViewBox} width={'32'} height={'32'}>
                            <Power />
                        </Svg>
                        <p>회의세팅</p>
                        </HoverImgStatus>
                    </HoverDiv>
                </HoverBoxContainer> */}
                <BoxContainer>
                    <div className="meetCraete">
                        <div className="circle"></div>
                        <p>회의추가하기</p>
                    </div>
                </BoxContainer>
                {/* )}

                {/* {meetDatas && */}
                {meetDatas.map((meetData: any) => {
                    return (
                        <BoxContainer
                            key={meetData.meet_id}
                            onMouseEnter={() => {
                                setIsShow(true)
                                console.log(isShow)
                            }}
                            onMouseLeave={() => {
                                setIsShow(false)
                                console.log(isShow)
                            }}
                        >
                            {meetData.rm_status === 'Y' && [
                                stateData[0].stateDiv,
                                stateData[0].stateImg,
                            ]}
                            {meetData.rm_status === 'W' && [
                                stateData[1].stateDiv,
                                stateData[1].stateImg,
                            ]}
                            {meetData.rm_status === 'E' && [
                                stateData[2].stateDiv,
                                stateData[2].stateImg,
                            ]}
                            <InputPStype className="meet_title-name">
                                {meetData.meet_title}
                            </InputPStype>
                            <TimeStyle className="last_time-name">
                                {moment(meetData.last_time).format(
                                    `YYYY-MM-DD HH시 mm분`
                                )}
                            </TimeStyle>
                        </BoxContainer>
                    )
                })}
            </TabContainer>
        </React.Fragment>
    )
}
export default YDataList
