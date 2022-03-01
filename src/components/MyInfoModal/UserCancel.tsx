import React, { PropsWithChildren, useState, useRef } from 'react'
import styled from 'styled-components'
import { Svg } from '@common'
import { Xclick, xclickviewBox } from '@svgs/Xclick'
interface ModalDefaultType {
    ClickToggleModal: () => void
}

function UserCancel({ ClickToggleModal }: PropsWithChildren<ModalDefaultType>) {
    const [selectedDrink, setSelectedDrink] = useState<String>()

    const radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDrink(event.target.value)
    }

    return (
        <ModalContainer>
            <DialogBox>
                <InfoBox style={{ top: '32px' }}>
                    <div
                        onClick={() => ClickToggleModal()}
                        style={{
                            cursor: 'pointer',
                            top: '0',
                            right: '0',
                            position: 'absolute',
                        }}
                    >
                        <Svg viewBox={xclickviewBox} width={'15'} height={'15'}>
                            <Xclick />
                        </Svg>
                    </div>
                    <h2
                        style={{
                            fontSize: '32px',
                            fontWeight: '500',
                            marginBottom: '5px',
                        }}
                    >
                        탈퇴하기
                    </h2>
                    <p
                        style={{
                            color: '#87878b',
                            lineHeight: '1.43',
                            fontSize: '14px',
                        }}
                    >
                        너무 아쉽네요... 😭 <br />
                        탈퇴하시기 전에 59mins를 떠나시는 이유를 알려주시면,{' '}
                        <br />
                        모든 직장인들의 효율적인 회의를 위해 서비스 개선에
                        적극젇으로 반영하도록 하겠습니다.
                    </p>
                </InfoBox>
                <InfoBox style={{ top: '173px' }}>
                    <ModalH3>탈퇴이유</ModalH3>
                    <RadioBox>
                        <LiBox>
                            <RadioInput id="radio1" type="radio" />
                            <label htmlFor="radio1">자주 이용하지 않음</label>
                        </LiBox>
                        <LiBox>
                            <RadioInput type="radio" id="radio2" />
                            <label htmlFor="radio2">개인정보 노출 걱정</label>
                        </LiBox>
                        <LiBox>
                            <RadioInput type="radio" id="radio3" />
                            <label>UI/UX 불편</label>
                        </LiBox>
                        <LiBox>
                            <RadioInput type="radio" />
                            <label>제공하는 기능 및 서비스 부족</label>
                        </LiBox>
                        <LiBox>
                            <RadioInput type="radio" />
                            <label>고객센터 응대 불만</label>
                        </LiBox>
                        <LiBox>
                            <RadioInput type="radio" />
                            <label>사이트 시스템의 에러 불만</label>
                        </LiBox>
                        <LiBox>
                            <RadioInput type="radio" />
                            <label>기타</label>
                        </LiBox>
                    </RadioBox>
                </InfoBox>
                <InfoBox style={{ top: '353px' }}>
                    <ModalH3>탈퇴하시기 전에 꼭 확인해주세요!</ModalH3>
                    <TextUi>
                        <TextLi>
                            1. 탈퇴시 작성했던 회의록은 즉시 삭제되어 복구할 수
                            없습니다. <br />
                            <span
                                style={{ color: '#e24646', marginLeft: '13px' }}
                            >
                                *재가입 하실 경우에도 복원되지 않으니 신중하게
                                생각해주세요.
                            </span>
                        </TextLi>
                        <TextLi>
                            2. 탈퇴 시 해당 계정이 삭제되어 해당 계정으로 7일간
                            재가입이 불가능합니다.
                        </TextLi>
                        <TextLi>
                            3. 가입된 계정 정보는 별도의 DB로 옮겨져 내부 방침
                            및 기타 법령에 의한 <br />
                            <span style={{ marginLeft: '15px' }}>
                                보유 사유에 따라 90일간 보존 후 삭제처리 됩니다.
                            </span>
                        </TextLi>
                    </TextUi>
                </InfoBox>
                <div
                    style={{
                        position: 'absolute',
                        bottom: '32px',
                        right: '36px',
                    }}
                >
                    <button
                        onClick={() => ClickToggleModal()}
                        style={{
                            width: '72px',
                            height: '40px',
                            border: '1px solid #d6d6d7',
                            color: '#87878b',
                            padding: '10px 20px',
                            borderRadius: '12px',
                            fontSize: '14px',
                            marginRight: '12px',
                            cursor: 'pointer',
                        }}
                    >
                        취소
                    </button>
                    <button
                        style={{
                            width: '72px',
                            height: '40px',
                            backgroundColor: '#e24646',
                            color: '#fff',
                            padding: '10px 20px',
                            borderRadius: '12px',
                            fontSize: '14px',
                            marginRight: '12px',
                        }}
                    >
                        저장
                    </button>
                </div>
            </DialogBox>
            <Backdrop
                onClick={(e: React.MouseEvent) => {
                    e.preventDefault()

                    if (ClickToggleModal) {
                        ClickToggleModal()
                    }
                }}
            />
        </ModalContainer>
    )
}

const ModalContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    left: 0;
    top: 0;
`

const DialogBox = styled.dialog`
    width: 556px;
    height: 645px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: none;
    margin: 0 auto;
    box-shadow: 0 0 30px rgba(30, 30, 30, 0.5);
    box-sizing: border-box;
    background-color: white;
    z-index: 10020;
    border-radius: 24px;
    padding: 32px 36px;
`
const InfoBox = styled.div`
    position: absolute;
    left: 36px;
`
const RadioBox = styled.div`
    font-size: 14px;
    color: #89898b;
    display: flex;
    flex-wrap: wrap;
    width: 436px;
`
const LiBox = styled.div`
    width: 218px;
    margin-bottom: 12px;
`
const RadioInput = styled.input`
    width: 16px;
    height: 16px;
    margin-right: 8px;
`
const TextUi = styled.ul`
    font-size: 14px;
    color: #87878b;
    margin-left: 20px;
`
const TextLi = styled.li`
    margin: 10px 0;
    line-height: 1.6;
`
const ModalH3 = styled.h3`
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 8px;
`
const ModalBtn = styled.button`
    width: 72px;
    height: 40px;
    padding: 10px 20px;
    border-radius: 12px;
    font-size: 14px;
`

const Backdrop = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    z-index: 10000;
    background-color: rgba(0, 0, 0, 0.2);
`

export default UserCancel
