import React, { useState, useRef, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import axios from '@axios'
import moment from 'moment'
import Modal from './Modal'
import { baseURL } from '@api/index'
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
import useOnClickOutside from '@hooks/useOnClickOutside'
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
function MyRemove() {
    const ref = useRef<any>()
    const [isShowModal, setIsShowModal] = useState(false)
    const handleModalClose = () => setIsShowModal(false)
    const handleModalOpen = () => setIsShowModal(true)
    const [hoverStyle, setHoverStyle] = useState({ opacity: 0 })
    const { data: meetDatas, error } = useSWR(
        `${baseURL}/api/meet/?rm_status=w`,
        fetcher,
        { revalidateOnFocus: true }
    )

    const stateData = [
        {
            id: 0,
            state: 'y',
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
            state: 'w',
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
            state: 'c',
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
            mutate(`${baseURL}/api/meet/?rm_status=w`, async (todos) => {
                const updateList = await axios.patch(`${baseURL}/api/meet/`, {
                    rm_status: 'n',
                    meet_id: meet_id,
                })

                const filterList = todos.filter((todo) => todo.meet_id !== '1')
                return [...filterList, updateList]
            })
        },
        [meetDatas]
    )
    const updateBtn = useCallback(
        async (meet_id: number) => {
            if (window.confirm('회의록을 복구하시겠습니까?')) {
                mutate(`${baseURL}/api/meet/?rm_status=w`, async (todos) => {
                    const updateList = await axios.patch(
                        `${baseURL}/api/meet/`,
                        { rm_status: 'y', meet_id: meet_id }
                    )

                    const filterList = todos.filter(
                        (todo) => todo.meet_id !== '1'
                    )
                    return [...filterList, updateList]
                })
            }
        },
        [meetDatas]
    )

    return (
        <React.Fragment>
            {isShowModal && (
                <Container>
                    <ModalContainer ref={ref}>
                        <div className="body">
                            회의록을 <span>삭제</span>하시겠습니까? <br />
                            삭제된 회의록은 복구할 수 없습니다.
                        </div>
                        <div className="buttons">
                            <button
                                className="btn_cancel"
                                onClick={() => handleModalClose()}
                            >
                                취소
                            </button>
                            <button
                                className="btn_save"
                                onClick={() => {
                                    removeBtn(meetDatas.meet_id)
                                    handleModalClose()
                                }}
                            >
                                확인
                            </button>
                        </div>
                    </ModalContainer>
                </Container>
            )}
            <TabContainer>
                <ListBoxContainer>
                    {meetDatas &&
                        meetDatas.map((meetData: any) => {
                            return (
                                <BoxContainer key={meetData.meet_id}>
                                    <div className="box-class">
                                        {meetData.meet_status === 'y' && [
                                            stateData[0].stateDiv,
                                            stateData[0].stateImg,
                                        ]}
                                        {meetData.meet_status === 'p' && [
                                            stateData[1].stateDiv,
                                            stateData[1].stateImg,
                                        ]}
                                        {meetData.meet_status === 'c' && [
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
                                                onClick={() => {
                                                    // removeBtn(meetData.meet_id)
                                                    handleModalOpen()
                                                }}
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
                                    {isShowModal && (
                                        <Container>
                                            <ModalContainer ref={ref}>
                                                <div className="body">
                                                    회의록을 <span>삭제</span>
                                                    하시겠습니까? <br />
                                                    삭제된 회의록은 복구할 수
                                                    없습니다.
                                                </div>
                                                <div className="buttons">
                                                    <button
                                                        className="btn_cancel"
                                                        onClick={() =>
                                                            handleModalClose()
                                                        }
                                                    >
                                                        취소
                                                    </button>
                                                    <button
                                                        className="btn_save"
                                                        onClick={() => {
                                                            removeBtn(
                                                                meetData.meet_id
                                                            )
                                                            handleModalClose()
                                                        }}
                                                    >
                                                        확인
                                                    </button>
                                                </div>
                                            </ModalContainer>
                                        </Container>
                                    )}
                                </BoxContainer>
                            )
                        })}
                </ListBoxContainer>
            </TabContainer>
        </React.Fragment>
    )
}
const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    /* background: gold; */
    // background: rgba(0, 0, 0, 0.34);
    z-index: 5;
`
const ModalContainer = styled.div`
    width: 420px;
    height: 200px;
    padding: 32px 36px;
    border-radius: 24px;
    box-shadow: 4px 4px 20px 0 rgba(0, 0, 0, 0.16);
    background-color: #fff;
    position: absolute;
    top: 34%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 32px 36px;
    .body {
        height: 32px;
        margin: 0 18px 64px 0;
        font-family: Pretendard;
        font-size: 20px;
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.6;
        letter-spacing: normal;
        text-align: left;
        color: #000;
        span {
            color: #e24646;
        }
    }
    .buttons {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        button {
            width: 68px;
            height: 40px;
            padding: 10px 20px;
            border-radius: 12px;
            font-size: 14px;
            font-weight: 500;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.43;
            letter-spacing: normal;
            text-align: center;
            cursor: pointer;
        }
        .btn_cancel {
            border: solid 1px #d6d6d7;
            background: #fff;
            color: #87878b;
        }
        .btn_save {
            background: #e24646;
            color: #fff;
        }
    }
`

export default MyRemove
