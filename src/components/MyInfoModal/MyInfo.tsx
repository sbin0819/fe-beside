import React, { PropsWithChildren, useState, useCallback } from 'react'
import styled from 'styled-components'
import { Svg } from '@common'
import { Google, googleViewBox } from '@svgs/Google'
import UserCancel from './UserCancel'
interface ModalDefaultType {
    onClickToggleModal: () => void
}

function MyInfo({ onClickToggleModal }: PropsWithChildren<ModalDefaultType>) {
    const [isOpenModal, setOpenModal] = useState<boolean>(false)

    const ClickToggleModal = useCallback(() => {
        setOpenModal(!isOpenModal)
    }, [isOpenModal])
    return (
        <div>
            <ModalContainer>
                <DialogBox>
                    <InfoBox>
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
                    </InfoBox>

                    <InfoBox style={{ top: '133px' }}>
                        <ModalH3>닉네임</ModalH3>
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
                    </InfoBox>

                    <InfoBox style={{ top: '247px' }}>
                        <ModalH3>프로필 이미지</ModalH3>
                        <div
                            style={{
                                height: '98px',
                                border: '1px solid blue',
                                marginTop: '8px',
                            }}
                        >
                            이모지 부분
                        </div>
                    </InfoBox>

                    <InfoBox style={{ top: '427px' }}>
                        <ModalH3>계정</ModalH3>
                        <Svg
                            viewBox={googleViewBox}
                            width={'20'}
                            height={'18'}
                            style={{ marginRight: '5px', marginTop: '5px' }}
                        >
                            <Google />
                        </Svg>
                        testeamil@gmail.com
                    </InfoBox>
                    <InfoBox style={{ top: '500px' }}>
                        <ModalH3>계정 탈퇴</ModalH3>
                        <button
                            onClick={ClickToggleModal}
                            style={{
                                marginTop: '10px',
                                width: '130px',
                                height: '40px',
                                padding: '10px 20px',
                                border: '1px solid #e24646',
                                color: '#e24646',
                                borderRadius: '12px',
                                fontSize: '14px',
                                cursor: 'pointer',
                            }}
                        >
                            회원 탈퇴하기
                        </button>
                    </InfoBox>
                    <div
                        style={{
                            position: 'absolute',
                            bottom: '32px',
                            right: '36px',
                        }}
                    >
                        <ModalBtn
                            onClick={() => onClickToggleModal()}
                            style={{
                                border: '1px solid #d6d6d7',
                                color: '#87878b',
                                marginRight: '12px',
                                cursor: 'pointer',
                            }}
                        >
                            취소
                        </ModalBtn>
                        <ModalBtn
                            style={{
                                backgroundColor: '#162f55',
                                color: '#fff',
                                marginRight: '12px',
                            }}
                        >
                            저장
                        </ModalBtn>
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
            {isOpenModal && <UserCancel ClickToggleModal={ClickToggleModal} />}
        </div>
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
    width: 528px;
    height: 671px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: none;
    margin: 0 auto;
    box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
    box-sizing: border-box;
    background-color: white;
    z-index: 190;
    border-radius: 24px;
    padding: 32px 36px;
`
const InfoBox = styled.div`
    position: absolute;
    left: 36px;
`
const ModalH3 = styled.h3`
    font-size: 14px;
    font-weight: bold;
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
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.2);
`

export default MyInfo

// import React, { useState, useCallback } from 'react'
// import UserCancel from './UserCancel'
// import Modal from './Modal'

// interface ModalDefaultType {
//     onClickToggleModal: () => void
// }

// function MyInfo() {
//     const [MyisOpenModal, setMyIsOpenModal] = useState(false)
//     const [isOpenModal, setOpenModal] = useState<boolean>(false);

//     const onClickToggleModal = useCallback(() => {
//       setOpenModal(!isOpenModal);
//     }, [isOpenModal]);
//     return (
//         <div>
//             <div
//                 style={{
//                     width: '528px',
//                     height: '696px',
//                     borderRadius: '24px',
//                     backgroundColor: '#fff',
//                     padding: '32px 36px',
//                     position: 'absolute',
//                     left: '-250px',
//                 }}
//             >
//                 <div>
//                     <h2
//                         style={{
//                             fontSize: '32px',
//                             fontWeight: '500',
//                         }}
//                     >
//                         내 계정
//                     </h2>
//                     <p
//                         style={{
//                             color: '#87878b',
//                             fontSize: '14px',
//                             marginTop: '10px',
//                         }}
//                     >
//                         계정 설정 변경 사항은 모든 워크페이스에 적용됩니다.
//                     </p>
//                 </div>
//                 <div style={{ marginTop: '40px' }}>
//                     <h3 style={{ fontWeight: 'bold' }}>닉네임</h3>
//                     <input
//                         placeholder="10자 이내 입력"
//                         style={{
//                             marginTop: '8px',
//                             width: '360px',
//                             height: '48px',
//                             padding: '0 20px',
//                             borderRadius: '12px',
//                             border: '1px solid #d6d6d7',
//                             marginBottom: '31px',
//                         }}
//                     />
//                 </div>

//                 <hr style={{ border: '1px solid #f1f1f1' }} />
//                 <div style={{ marginTop: '32px' }}>
//                     <h3
//                         style={{
//                             fontWeight: 'bold',
//                             fontSize: '14px',
//                             marginBottom: '8px',
//                         }}
//                     >
//                         계정
//                     </h3>
//                     <p style={{ fontSize: '16px' }}>testeamil@gmail.com</p>
//                 </div>
//                 <div style={{ marginTop: '32px' }}>
//                     <h3
//                         style={{
//                             fontSize: '14px',
//                             fontWeight: 'bold',
//                             marginBottom: '8px',
//                         }}
//                     >
//                         계정 탈퇴
//                     </h3>
//                     <button
//                         // onClick={() => setMyIsOpenModal((prev) => !prev)}
//                         style={{
//                             width: '130px',
//                             height: '40px',
//                             padding: '10px 20px',
//                             border: '1px solid #e24646',
//                             color: '#e24646',
//                             borderRadius: '12px',
//                             fontSize: '14px',
//                         }}
//                     >
//                         회원 탈퇴하기
//                     </button>
//                 </div>
//                 <div
//                     style={{
//                         position: 'absolute',
//                         bottom: '32px',
//                         right: '36px',
//                     }}
//                 >
//                     <button
//                         style={{
//                             width: '72px',
//                             height: '40px',
//                             border: '1px solid #d6d6d7',
//                             color: '#87878b',
//                             padding: '10px 20px',
//                             borderRadius: '12px',
//                             fontSize: '14px',
//                             marginRight: '12px',
//                         }}
//                     >
//                         취소
//                     </button>
//                     <button
//                         style={{
//                             width: '72px',
//                             height: '40px',
//                             backgroundColor: '#162f55',
//                             color: '#fff',
//                             padding: '10px 20px',
//                             borderRadius: '12px',
//                             fontSize: '14px',
//                             marginRight: '12px',
//                         }}
//                     >
//                         저장
//                     </button>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default MyInfo
