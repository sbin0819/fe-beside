import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import Router from 'next/router'
import { withRouter } from 'next/router'
import { setCookie, getCookie } from '../utils/Cookie'
import axios from 'axios'
import { baseURL } from '@api/index'
import { useSession, signIn, signOut } from 'next-auth/react'

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
`
const LeftContainer = styled.div`
    width: 50%;
    background-color: #0c254c;
    height: 100%;
    position: relative;
    z-index: 0;
    .mins {
        width: 96px;
        height: 35px;
        flex-grow: 0;
        margin: 0 839px 0 0;
        font-family: RacingSansOne;
        font-size: 28px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        text-align: center;
        color: #fff;
        // position: absolute;
        // left: 50%;
        // transform: translateX(50%);
        // z-index: 10;
        margin: 23px auto 0 auto;
    }
`
const RightContainer = styled.div`
    width: 50%;
    height: 100%;
    position: relative;
    .servies {
        text-align: center;
        margin: 0 auto;

        height: 32px;
        font-size: 20px;
        font-weight: 500;
    }
    .servies span {
        cursor: pointer;
        margin-right: 56px;
    }
    .left-text {
        width: 460px;
        position: absolute;
        top: 50%;
        margin-left: 109px;
        transform: translateY(-50%);
    }
    .left-text-div {
        display: flex;
        align-items: center;
        margin: 0 8px 20px 0;
        .hello {
            font-size: 48px;
            font-weight: bold;
        }
        .hello-emoji {
            font-size: 40px;
            margin-left: 8px;
            line-height: 1.5;
        }
    }
    .left-text h2 {
        font-weight: bold;
        font-size: 48px;
        margin: 0 8px 12px 0;
    }
    .sign-welcom {
        font-size: 20px;
        font-weight: 500;
        text-align: left;
        color: rgba(60, 60, 67, 0.6);
        line-height: 1.6;
        margin-bottom: 60px;
        // width: 359px;
    }
`
const Input = styled.input`
    width: 364px;
    height: 48px;
    border-radius: 12px;
    border: 1px solid #0c254c;
    padding: 12px 24px;
`
const SignInput = styled.div`
    .sign-name {
        // width : 105px;
        height: 20px;
        flex-grow: 0;
        margin: 0 69px 8px 0;
        font-family: Pretendard;
        font-size: 14px;
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.43;
        letter-spacing: normal;
        text-align: left;
        color: #3c3c43;
    }

    .nicknameLength {
        color: #e24646;
        font-size: 12px;
        margin-top: 4px;
    }
    .sign-button {
        width: 364px;
        height: 52px;
        margin: 40px 96px 16px 0;
        border-radius: 12px;
        background-color: #0c254c;
        font-size: 16px;
        color: #fff;
        cursor: pointer;
    }
    .sign-button-err {
        width: 364px;
        height: 52px;
        margin: 40px 96px 16px 0;
        border-radius: 12px;
        background-color: #fff;
        font-size: 16px;
        border: solid 1px #d6d6d7;
        color: #87878b;
    }
    .sign-text {
        color: #3c3c43;
        font-size: 12px;
    }
    .sign-text span {
        color: #0c254c;
        font-size: 12px;
        font-weight: bold;
    }
`
const blackBorder = {
    border: '1px solid #0c254c',
}
const redBorder = {
    border: '1px solid #e24646',
}

interface UserProps {
    name: string
}
function Join() {
    const router = useRouter()
    const { data: session, status } = useSession()

    const [inputName, setInputName] = useState((session?.name as string) || '')
    const inputBorder = inputName.length === 0
    const loginBtn = () => {
        const userData: any = {
            name: session?.user?.name,
            nickname: inputName,
            email: session?.user?.email,
            password: 'Y', //session.accesToken
            provider: 'google',
            img: 'img',
        }

        axios.post(`${baseURL}/api/user/`, [userData]).then((res) => {
            let token = res.data['token']

            setCookie('Authorization', token, {
                path: '/',
                maxAge: 1000 * 60 * 60 * 24 * 7,
                secure: true,
                SameSite: 'None',
            })
            if (res.data['success'] === true) {
                router.push('/')
            }
        })
    }
    return (
        <Container>
            <LeftContainer>
                <h2 className="mins">59mins</h2>
                <ImageBox src="/image/img_login.png" />
            </LeftContainer>
            <RightContainer>
                <div className="left-text">
                    <div className="left-text-div">
                        <div className="hello">반가워요</div>
                        <div className="hello-emoji">🥳</div>
                    </div>
                    <p className="sign-welcom">
                        시간내에 끝내지 못한 회의에 지친 모든 <br />
                        오구민씨를 환영합니다.
                    </p>
                    <SignInput>
                        <p className="sign-name">닉네임 (10자 이내)</p>
                        <Input
                            className="input-box"
                            value={inputName}
                            maxLength={15}
                            style={inputBorder ? redBorder : blackBorder}
                            onChange={(e) => setInputName(e.target.value)}
                        />
                        {inputName.length > 10 && (
                            <p className="nicknameLength">
                                닉네임은 10자 이내만 입력 가능합니다.
                            </p>
                        )}
                        {inputName === null ||
                            (inputName.length === 0 && (
                                <p className="nicknameLength">입력해주세요.</p>
                            ))}
                        <button
                            onClick={() => {
                                loginBtn()
                            }}
                            className={
                                inputName.length > 10 || inputName.length === 0
                                    ? 'sign-button-err'
                                    : 'sign-button'
                            }
                        >
                            시작할게요
                        </button>
                        <p className="sign-text">
                            가입시, 59mins의{' '}
                            <span>개인정보처리방침, 서비스 이용약관</span>에
                            동의합니다.
                        </p>
                    </SignInput>
                </div>
            </RightContainer>
        </Container>
    )
}
const ImageBox = styled.img`
    width: 480px;
    height: 480px;
    text-align: center;
    position: absolute;
    top: 185px;
    right: 100px;
`

export default Join
