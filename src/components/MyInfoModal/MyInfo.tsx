import React, {
    PropsWithChildren,
    useState,
    useCallback,
    useEffect,
} from 'react'
import styled from 'styled-components'
import { Svg } from '@common'
import { Google, googleViewBox } from '@svgs/Google'
import { Xclick, xclickviewBox } from '@svgs/Xclick'
import UserCancel from './UserCancel'
import axios from '@axios'
import { baseURL } from '@api/index'
interface ModalDefaultType {
    onClickToggleModal: () => void
}

function MyInfo({ onClickToggleModal }: PropsWithChildren<ModalDefaultType>) {
    const [isOpenModal, setOpenModal] = useState<boolean>(false)
    const [userInfo, setUserInfo] = useState<Array<string>>([])

    const [inputs, setInputs] = useState({
        nickname: '',
        email: '',
        emoji: '',
    })
    const { nickname, email, emoji } = inputs
    const onChange = (e) => {
        const { value, name } = e.target
        setInputs({
            ...inputs,
            [name]: value,
        })
    }

    const ClickToggleModal = useCallback(() => {
        setOpenModal(!isOpenModal)
    }, [isOpenModal])

    const testEmojis = [
        {
            id: 1,
            emoji: '😀',
        },
        {
            id: 2,
            emoji: '😴',
        },
        {
            id: 3,
            emoji: '😎',
        },
        {
            id: 4,
            emoji: '🤯',
        },
        {
            id: 5,
            emoji: '😱',
        },
        {
            id: 6,
            emoji: '🤔',
        },
        {
            id: 7,
            emoji: '🐶',
        },
        {
            id: 8,
            emoji: '🐱',
        },
        {
            id: 9,
            emoji: '🙊',
        },
        {
            id: 10,
            emoji: '👻',
        },
        {
            id: 11,
            emoji: '👀',
        },
        {
            id: 12,
            emoji: '👾',
        },
        {
            id: 13,
            emoji: '👿',
        },
        {
            id: 14,
            emoji: '🔥',
        },
        {
            id: 15,
            emoji: '❤',
        },
        {
            id: 16,
            emoji: '💨',
        },
        {
            id: 17,
            emoji: '💡',
        },
        {
            id: 18,
            emoji: '📖',
        },
    ]
    const userUpdate = () => {
        axios
            .patch(`${baseURL}/api/user/`, {
                nickname: nickname,
            })
            .then((res) => {})
    }

    useEffect(() => {
        axios.get(`${baseURL}/api/user/`).then((res) => {
            setInputs(res.data)
        })
    }, [])

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
                    <div
                        onClick={() => onClickToggleModal()}
                        style={{
                            cursor: 'pointer',
                            top: '40px',
                            right: '40px',
                            position: 'absolute',
                        }}
                    >
                        <Svg viewBox={xclickviewBox} width={'15'} height={'15'}>
                            <Xclick />
                        </Svg>
                    </div>
                    <InfoBox style={{ top: '133px' }}>
                        <ModalH3>닉네임</ModalH3>
                        <input
                            name="nickname"
                            value={nickname}
                            onChange={onChange}
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
                    {/* testEmojis */}
                    <InfoBox style={{ top: '247px' }}>
                        <ModalH3>프로필 이미지</ModalH3>
                        <EmojiBox>
                            {testEmojis &&
                                testEmojis.map((testEmoji) => {
                                    return (
                                        <EmojiStyle key={testEmoji.id}>
                                            {testEmoji.emoji}
                                        </EmojiStyle>
                                    )
                                })}
                        </EmojiBox>
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
                        {email}
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
                            onClick={(e) => {
                                userUpdate()
                                onClickToggleModal()
                            }}
                            style={{
                                backgroundColor: '#162f55',
                                color: '#fff',
                                marginRight: '12px',
                                cursor: 'pointer',
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
const EmojiBox = styled.div`
    width: 460px;
    display: grid;
    gap: 12px;
    grid-template-columns: repeat(auto-fill, minmax(40px, 12px));
    // grid-template-columns: 1fr 1fr 1fr;
    align-content: start;
    height: 98px;

    margin-top: 8px;
`
const EmojiStyle = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 20px;
    padding: 8px;
    border: solid 1px #d6d6d7;
    margin: 0 12px 12px 0;
    cursor: pointer;
    transition: all 0.2s;
    :hover {
        border: 2px solid #162f55;
    }
`

export default MyInfo
