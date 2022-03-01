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
    DeleteHoverDiv,
    ListBoxContainer,
    HoverImgStatus,
    HoverDiv,
} from '../styles'
import moment from 'moment'
import { Svg } from '@components/common'
import { Power, powerViewBox } from '@svgs/Power'
import { Schedule, scheduleViewBox } from '@svgs/Schedule'
import { End, endViewBox } from '@svgs/End'
import { Progress, progressViewBox } from '@svgs/Progress'
import { Calendar, calendarViewBox } from '@svgs/Calendar'
import { Notepad, noteViewBox } from '@svgs/Notepad'
import { Add, addViewBox } from '@svgs/Add'
import { Timer, timerViewBox } from '@svgs/Timer'
import { Drafts, draftsViewBox } from '@svgs/Drafts'
import { Delete, deleteViewBox } from '@svgs/Delete'
import { mutate } from 'swr'
import axios from 'axios'

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

function YDataList(props: any) {
    const [hoverStyle, setHoverStyle] = useState({ opacity: 0 })
    let meetDatas = props.data
    console.log('props', props)
    const stateData = [
        {
            meet_status: 'P',
            stateDiv: <BoxstatusW>회의예정</BoxstatusW>,
            stateImg: (
                <ImgStatus>
                    <Svg viewBox={scheduleViewBox} width={'32'} height={'32'}>
                        <Schedule />
                    </Svg>
                </ImgStatus>
            ),
        },
        {
            meet_status: 'Y',
            stateDiv: <BoxstatusY>회의진행중</BoxstatusY>,
            stateImg: (
                <ImgStatus>
                    <Svg viewBox={progressViewBox} width={'32'} height={'32'}>
                        <Progress />
                    </Svg>
                </ImgStatus>
            ),
        },
        {
            meet_status: 'C',
            stateDiv: <BoxstatusE>회의완료</BoxstatusE>,
            stateImg: (
                <ImgStatus>
                    <Svg viewBox={endViewBox} width={'32'} height={'32'}>
                        <End />
                    </Svg>
                </ImgStatus>
            ),
        },
    ]

    const hoverStateData = [
        {
            id: 0,
            meet_status: 'Y',
            stateDiv: <p>회의세팅</p>,
            stateImg: (
                <HoverImgStatus>
                    <Svg viewBox={draftsViewBox} width={'32'} height={'32'}>
                        <Drafts />
                    </Svg>
                </HoverImgStatus>
            ),
        },
        {
            id: 1,
            meet_status: 'P',
            stateDiv: <p>회의진행</p>,
            stateImg: (
                <HoverImgStatus>
                    <Svg viewBox={timerViewBox} width={'32'} height={'32'}>
                        <Timer />
                    </Svg>
                </HoverImgStatus>
            ),
        },
        {
            id: 2,
            meet_status: 'C',
            stateDiv: <p>회의록</p>,
            stateImg: (
                <HoverImgStatus>
                    <Svg viewBox={noteViewBox} width={'32'} height={'32'}>
                        <Notepad />
                    </Svg>
                </HoverImgStatus>
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
                            { meet_status: 'W', rm_status: 'W' }
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
                    <BoxContainer>
                        <div
                            className="meetCraete"
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                cursor: 'pointer',
                                width: '390px',
                                marginTop: '60px',
                            }}
                        >
                            <div className="circle">
                                <Svg
                                    viewBox={addViewBox}
                                    width={'30'}
                                    height={'30'}
                                    style={{
                                        marginLeft: '-5px',
                                        marginTop: '-4px',
                                    }}
                                >
                                    <Add />
                                </Svg>
                            </div>
                            <p>회의추가하기</p>
                        </div>
                    </BoxContainer>

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
                                                viewBox={calendarViewBox}
                                                width={'13'}
                                                height={'13'}
                                                style={{ marginRight: '5.6px' }}
                                            >
                                                <Calendar />
                                            </Svg>
                                            {moment(meetData.last_time).format(
                                                `YYYY-MM-DD HH시 mm분`
                                            )}
                                        </TimeStyle>
                                    </div>

                                    <HoverBoxContainer>
                                        <HoverBox>
                                            <HoverDiv>
                                                {meetData.meet_status ===
                                                    'Y' && [
                                                    hoverStateData[0].stateImg,
                                                    hoverStateData[0].stateDiv,
                                                ]}
                                                {meetData.meet_status ===
                                                    'P' && [
                                                    hoverStateData[1].stateImg,
                                                    hoverStateData[1].stateDiv,
                                                ]}
                                                {meetData.meet_status ===
                                                    'C' && [
                                                    hoverStateData[2].stateImg,
                                                    hoverStateData[2].stateDiv,
                                                ]}
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
                                                <div
                                                    style={{ fontSize: '16px' }}
                                                >
                                                    삭제하기
                                                </div>
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
export default YDataList
