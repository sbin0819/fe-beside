import React, { useRef } from 'react'
import styled from 'styled-components'

import useOnClickOutside from '@hooks/useOnClickOutside'

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    /* background: gold; */
    background: rgba(0, 0, 0, 0.34);
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
    top: 50%;
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
            background: #162f55;
            color: #fff;
        }
    }
`
interface DropdownMenuProps {
    onClose: () => void
}
function CloseMeetingModal({ onClose }: DropdownMenuProps) {
    const ref = useRef<any>()
    useOnClickOutside(ref, () => {
        onClose()
    })
    const onSave = () => {}
    return (
        <Container>
            <ModalContainer ref={ref}>
                <div className="body">회의를 정말로 종료하시겠습니까?</div>
                <div className="buttons">
                    <button className="btn_cancel" onClick={() => onClose()}>
                        취소
                    </button>
                    <button className="btn_save">저장</button>
                </div>
            </ModalContainer>
        </Container>
    )
}

export default CloseMeetingModal
