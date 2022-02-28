import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import axios from 'axios'
import moment from 'moment'
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
    DeleteHoverDiv,
    ListBoxContainer,
    HoverImgStatus,
    BoxstatusX,
    HoverDiv,
} from './styles'
import { Svg } from '@components/common'

import { ScheduleDim, scheduleDimViewBox } from '@svgs/ScheduleDim'
import { EndDim, endDimViewBox } from '@svgs/EndDim'
import { ProgressDim, progressDimViewBox } from '@svgs/ProgressDim'
import { Calendar, calendarViewBox } from '@svgs/Calendar'
import { Notepad, noteViewBox } from '@svgs/Notepad'
import { Recover, recoverViewBox } from '@svgs/Recover'
import { Timer, timerViewBox } from '@svgs/Timer'
import { Drafts, draftsViewBox } from '@svgs/Drafts'
import { Delete, deleteViewBox } from '@svgs/Delete'
import { DeleteGray, deleteGrayViewBox } from '@svgs/DeleteGray'
import { mutate } from 'swr'

export const HoverBoxContainer = styled.div`
    border: 1px solid #f1f1f1;
    width: 364px;
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
    :hover {
        opacity: 0.8;
    }
`
export const HoverBox = styled.div`
    justify-content: center;
    align-item: center;
    display: flex;
    margin-top: 71px;
`

const fetcher = (url) => axios.get(url).then((res) => res.data)
function MyRemove(props: any) {
    const [hoverStyle, setHoverStyle] = useState({ opacity: 0 })
    // const { data: meetDatas, error } = useSWR(
    //     'http://127.0.0.1:8000/api/meet/?search=W',
    //     fetcher,
    //     { revalidateOnFocus: true }
    // )

    const meetDatas = [
        {
            user_id: 1,
            meet_title: '제목입니다.',
            meet_date: '2022-02-28T16:11:31.147Z',
            meet_status: 'Y',
            rm_status: 'Y',
            participants: 'user',
            goal: 'goal',
        },
        {
            user_id: 1,
            meet_title: '제목입니다.2',
            meet_date: '2022-02-28T16:11:31.147Z',
            meet_status: 'P',
            rm_status: 'W',
            participants: 'user',
            goal: 'goal',
        },
        {
            user_id: 1,
            meet_title: '제목입니다.3',
            meet_date: '2022-02-28T16:11:31.147Z',
            meet_status: 'C',
            rm_status: 'N',
            participants: 'user',
            goal: 'goal',
        },
    ]

    const stateData = [
        {
            id: 0,
            state: 'Y',
            stateDiv: <BoxstatusX>회의진행중</BoxstatusX>,
            stateImg: (
                <ImgStatus>
                    <Svg
                        viewBox={progressDimViewBox}
                        width={'32'}
                        height={'32'}
                    >
                        <ProgressDim />
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
                    <Svg
                        viewBox={scheduleDimViewBox}
                        width={'32'}
                        height={'32'}
                    >
                        <ScheduleDim />
                    </Svg>
                </ImgStatus>
            ),
        },
        {
            id: 2,
            state: 'C',
            stateDiv: <BoxstatusX>회의완료</BoxstatusX>,
            stateImg: (
                <ImgStatus>
                    <Svg viewBox={endDimViewBox} width={'32'} height={'32'}>
                        <EndDim />
                    </Svg>
                </ImgStatus>
            ),
        },
    ]

    const removeBtn = useCallback(
        async (meet_id: number) => {
            if (window.confirm('회의록을 삭제하시겠습니까?')) {
                mutate(
                    'http://127.0.0.1:8000/api/meet/?search=W',
                    async (todos) => {
                        const updateList = await axios.patch(
                            `http://127.0.0.1:8000/api/meet/${meet_id}/`,
                            { meet_status: 'N', rm_status: 'N' }
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
                            { meet_status: 'Y', rm_status: 'Y' }
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
                <ListBoxContainer>
                    {meetDatas &&
                        meetDatas.map((meetData: any) => {
                            return (
                                <BoxContainer key={meetData.meet_id}>
                                    <div className="box-class">
                                        {meetData.meet_status === 'Y' && [
                                            stateData[0].stateDiv,
                                            stateData[0].stateImg,
                                        ]}
                                        {meetData.meet_status === 'P' && [
                                            stateData[1].stateDiv,
                                            stateData[1].stateImg,
                                        ]}
                                        {meetData.meet_status === 'C' && [
                                            stateData[2].stateDiv,
                                            stateData[2].stateImg,
                                        ]}
                                        <InputPStype className="meet_title-name">
                                            {meetData.meet_title}
                                        </InputPStype>
                                        <TimeStyle className="last_time-name">
                                            <Svg
                                                viewBox={deleteGrayViewBox}
                                                width={'13'}
                                                height={'13'}
                                                style={{ marginRight: '5.6px' }}
                                            >
                                                <DeleteGray />
                                            </Svg>
                                            {moment(meetData.last_time).format(
                                                `YYYY-MM-DD HH시 mm분`
                                            )}
                                        </TimeStyle>
                                    </div>

                                    <HoverBoxContainer>
                                        <HoverBox>
                                            <HoverDiv
                                                onClick={() =>
                                                    updateBtn(meetData.meet_id)
                                                }
                                            >
                                                <Svg
                                                    viewBox={recoverViewBox}
                                                    width={'32'}
                                                    height={'32'}
                                                >
                                                    <Recover />
                                                </Svg>
                                                <p style={{ fontSize: '16px' }}>
                                                    복구하기
                                                </p>
                                            </HoverDiv>
                                            <DeleteHoverDiv
                                                onClick={() =>
                                                    removeBtn(meetData.meet_id)
                                                }
                                            >
                                                <Svg
                                                    viewBox={deleteViewBox}
                                                    width={'32'}
                                                    height={'32'}
                                                >
                                                    <Delete />
                                                </Svg>
                                                <p style={{ fontSize: '16px' }}>
                                                    삭제하기
                                                </p>
                                            </DeleteHoverDiv>
                                        </HoverBox>
                                    </HoverBoxContainer>
                                </BoxContainer>
                            )
                        })}
                </ListBoxContainer>
            </TabContainer>
        </React.Fragment>
    )
}

export default MyRemove
