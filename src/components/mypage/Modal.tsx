import React, { useRef, useCallback } from 'react'
import styled from 'styled-components'
import useSWR, { mutate } from 'swr'
import axios from '@axios'
import useOnClickOutside from '@hooks/useOnClickOutside'
import { baseURL } from '@api/index'
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
interface DropdownMenuProps {
    onClose: () => void
    data: any
}
function Modal({ onClose }: DropdownMenuProps, Props) {
    const ref = useRef<any>()
    useOnClickOutside(ref, () => {
        onClose()
    })
    const removeBtn = () => async (meet_id: number) => {
        mutate(`${baseURL}/api/meet/?rm_status=w`, async (todos) => {
            const updateList = await axios.patch(`${baseURL}/api/meet/`, {
                rm_status: 'N',
                meet_id: meet_id,
            })

            const filterList = todos.filter((todo) => todo.meet_id !== '1')
            return [...filterList, updateList]
        })
    }

    return (
        <Container>
            <ModalContainer ref={ref}>
                <div className="body">
                    회의록을 <span>삭제</span>하시겠습니까? <br />
                    삭제된 회의록은 복구할 수 없습니다.
                </div>
                <div className="buttons">
                    <button className="btn_cancel" onClick={() => onClose()}>
                        취소
                    </button>
                    <button
                        className="btn_save"
                        onClick={() => {
                            removeBtn()
                            onClose()
                        }}
                    >
                        확인
                    </button>
                </div>
            </ModalContainer>
        </Container>
    )
}

export default Modal
