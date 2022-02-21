import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import axios from 'axios'
import moment from 'moment'
import {
    TabContainer,
    BoxContainer,
    BoxstatusX,
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
} from './styles'
import { Svg } from '@components/common'
import { Power, powerViewBox } from '@svgs/Power'
import { Add, addViewBox } from '@svgs/Add'
import { mutate } from 'swr'

const fetcher = (url) => axios.get(url).then((res) => res.data)
function MyRemove() {
    const [hoverStyle, setHoverStyle] = useState({ opacity: 0 })
    const { data: meetDatas, error } = useSWR(
        'http://127.0.0.1:8000/api/meet/?search=W',
        fetcher,
        { revalidateOnFocus: true }
    )
    const stateData = [
        {
            id: 0,
            state: 'Y',
            stateDiv: <BoxstatusX>회의진행중</BoxstatusX>,
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
            stateDiv: <BoxstatusX>회의예정</BoxstatusX>,
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
            stateDiv: <BoxstatusX>회의완료</BoxstatusX>,
            stateImg: (
                <ImgStatus>
                    <Svg viewBox={powerViewBox} width={'32'} height={'32'}>
                        <Power />
                    </Svg>
                </ImgStatus>
            ),
        },
    ]
    useEffect(() => {
        console.log('remove', meetDatas)
    }, [])
    const removeBtn = useCallback(
        async (meet_id: number) => {
            if (window.confirm('회의록을 삭제하시겠습니까?')) {
                mutate(
                    'http://127.0.0.1:8000/api/meet/?search=W',
                    async (todos) => {
                        const updateList = await axios.patch(
                            `http://127.0.0.1:8000/api/meet/${meet_id}/`,
                            { meet_status: 'N' }
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
    const updateBtn = useCallback(
        async (meet_id: number) => {
            if (window.confirm('회의록을 복구하시겠습니까?')) {
                mutate(
                    'http://127.0.0.1:8000/api/meet/?search=W',
                    async (todos) => {
                        const updateList = await axios.patch(
                            `http://127.0.0.1:8000/api/meet/${meet_id}/`,
                            { meet_status: 'Y' }
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
        <TabContainer>
            {meetDatas &&
                meetDatas.map((meetData: any) => {
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
                                    onClick={() => updateBtn(meetData.meet_id)}
                                    style={{
                                        position: 'absolute',
                                        left: '96px',
                                        bottom: '67px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    <Svg
                                        viewBox={powerViewBox}
                                        width={'32'}
                                        height={'32'}
                                    >
                                        <Power />
                                    </Svg>
                                    <p style={{ fontSize: '16px' }}>복구하기</p>
                                </HoverDiv>
                                <HoverDiv
                                    onClick={() => removeBtn(meetData.meet_id)}
                                    style={{
                                        position: 'absolute',
                                        right: '96px',
                                        bottom: '67px',
                                        cursor: 'pointer',
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
    )
}

export default MyRemove
