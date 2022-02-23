import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'

interface ModalDefaultType {
    onClickToggleModal: () => void
}

function Modal({ onClickToggleModal }: PropsWithChildren<ModalDefaultType>) {
    return (
        <ModalContainer>
            <DialogBox>
                <div
                    style={{
                        width: '528px',
                        height: '696px',
                        borderRadius: '24px',
                        backgroundColor: '#fff',
                        padding: '32px 36px',
                        position: 'absolute',
                        left: '-250px',
                    }}
                >
                    <div>
                        <h2
                            style={{
                                fontSize: '32px',
                                fontWeight: '500',
                            }}
                        >
                            내 계정
                        </h2>
                        <p
                            style={{
                                color: '#87878b',
                                fontSize: '14px',
                                marginTop: '10px',
                            }}
                        >
                            계정 설정 변경 사항은 모든 워크페이스에 적용됩니다.
                        </p>
                    </div>
                    <div style={{ marginTop: '40px' }}>
                        <h3 style={{ fontWeight: 'bold' }}>닉네임</h3>
                        <input
                            placeholder="10자 이내 입력"
                            style={{
                                marginTop: '8px',
                                width: '360px',
                                height: '48px',
                                padding: '0 20px',
                                borderRadius: '12px',
                                border: '1px solid #d6d6d7',
                                marginBottom: '31px',
                            }}
                        />
                    </div>

                    <hr style={{ border: '1px solid #f1f1f1' }} />
                    <div style={{ marginTop: '32px' }}>
                        <h3
                            style={{
                                fontWeight: 'bold',
                                fontSize: '14px',
                                marginBottom: '8px',
                            }}
                        >
                            계정
                        </h3>
                        <p style={{ fontSize: '16px' }}>testeamil@gmail.com</p>
                    </div>
                    <div style={{ marginTop: '32px' }}>
                        <h3
                            style={{
                                fontSize: '14px',
                                fontWeight: 'bold',
                                marginBottom: '8px',
                            }}
                        >
                            계정 탈퇴
                        </h3>
                        <button
                            // onClick={() => setMyIsOpenModal((prev) => !prev)}
                            style={{
                                width: '130px',
                                height: '40px',
                                padding: '10px 20px',
                                border: '1px solid #e24646',
                                color: '#e24646',
                                borderRadius: '12px',
                                fontSize: '14px',
                            }}
                        >
                            회원 탈퇴하기
                        </button>
                    </div>
                    <div
                        style={{
                            position: 'absolute',
                            bottom: '32px',
                            right: '36px',
                        }}
                    >
                        <button
                            style={{
                                width: '72px',
                                height: '40px',
                                border: '1px solid #d6d6d7',
                                color: '#87878b',
                                padding: '10px 20px',
                                borderRadius: '12px',
                                fontSize: '14px',
                                marginRight: '12px',
                            }}
                        >
                            취소
                        </button>
                        <button
                            style={{
                                width: '72px',
                                height: '40px',
                                backgroundColor: '#162f55',
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
                </div>
            </DialogBox>
            <Backdrop
                onClick={(e: React.MouseEvent) => {
                    e.preventDefault()

                    if (onClickToggleModal) {
                        onClickToggleModal()
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
`

const DialogBox = styled.dialog`
    width: 800px;
    height: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: none;
    border-radius: 3px;
    box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
    box-sizing: border-box;
    background-color: white;
    z-index: 10000;
`

const Backdrop = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    z-index: 9999;
    background-color: rgba(0, 0, 0, 0.2);
`

export default Modal
