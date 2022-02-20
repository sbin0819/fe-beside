import React, { useCallback, useState } from 'react'
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
    // HoverBoxContainer,
    HoverImgStatus,
    HoverDiv,
} from '../styles'
import moment from 'moment'
import { Svg } from '@components/common'
import { Power, powerViewBox } from '@svgs/Power'
import { Add, addViewBox } from '@svgs/Add'
import { mutate } from 'swr'
import axios from 'axios'

export const HoverBoxContainer = styled.div`
    border: 1px solid #f1f1f1;
    width: 390px;
    height: 200px;
    background-color: rgb(12, 37, 76);
    box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.08);
    // position: relative;
    border-radius: 24px;
    color: #fff;
    position: absolute;
    opacity: 0;
    left: 0;
    top: 0;
    transition: all 0.3s ease-in-out;
    $:hover {
        opacity: 0.8;
    }
`

function YDataList(props: any) {
    const [hoverStyle, setHoverStyle] = useState({ opacity: 0 })
    let meetDatas = props.data

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

    const removeBtn = useCallback(
        async (meet_id: number) => {
            if (window.confirm('회의록을 삭제하시겠습니까?')) {
                mutate(
                    'http://127.0.0.1:8000/api/meet/?search=Y',
                    async (todos) => {
                        const updateList = await axios.patch(
                            `http://127.0.0.1:8000/api/meet/${meet_id}/`,
                            { meet_status: 'W' }
                        )
                        console.log('result', updateList)
                        const filterList = todos.filter(
                            (todo) => todo.meet_id !== '1'
                        )
                        return [...filterList, updateList]
                    }
                )
            }
        },
        [meetDatas]
    )

    return (
        <React.Fragment>
            <TabContainer>
                <BoxContainer>
                    <div className="meetCraete" style={{ width: '390px' }}>
                        <div className="circle"></div>
                        <p>회의추가하기</p>
                    </div>
                </BoxContainer>

                {meetDatas.map((meetData: any) => {
                    return (
                        <BoxContainer key={meetData.meet_id}>
                            <div className="box-class">
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
                            </div>

                            <HoverBoxContainer
                                onMouseEnter={(e) => {
                                    setHoverStyle({ opacity: 0.8 })
                                }}
                                onMouseLeave={(e) => {
                                    setHoverStyle({ opacity: 0 })
                                }}
                                style={hoverStyle}
                            >
                                <HoverDiv
                                    style={{
                                        position: 'absolute',
                                        left: '96px',
                                        bottom: '67px',
                                    }}
                                >
                                    <Svg
                                        viewBox={powerViewBox}
                                        width={'32'}
                                        height={'32'}
                                    >
                                        <Power />
                                    </Svg>
                                    <p style={{ fontSize: '16px' }}>회의세팅</p>
                                </HoverDiv>
                                <HoverDiv
                                    onClick={() => removeBtn(meetData.meet_id)}
                                    style={{
                                        position: 'absolute',
                                        right: '96px',
                                        bottom: '67px',
                                    }}
                                >
                                    <Svg
                                        viewBox={powerViewBox}
                                        width={'32'}
                                        height={'32'}
                                    >
                                        <Power />
                                    </Svg>
                                    <p style={{ fontSize: '16px' }}>삭제하기</p>
                                </HoverDiv>
                            </HoverBoxContainer>
                        </BoxContainer>
                    )
                })}
            </TabContainer>
        </React.Fragment>
    )
}
export default YDataList