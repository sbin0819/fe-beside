import React, { useDebugValue, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import GoogleLogin from 'react-google-login'
import { Svg } from '@components/common'
import { GoogleBtn, googleBtnViewBox } from '@svgs/googleBtn'
import { GoogleBtnNone, googleBtnNoneViewBox } from '@svgs/googleBtnNone'
import Router from 'next/router'
import { useRouter } from 'next/router'
import { setCookie, getCookie } from '../utils/Cookie'
import { baseURL } from '@api/index'
import { signIn, useSession } from 'next-auth/react'
const clientId = '184508570520-h1j9rlar4tjrbh2eadugdvqg1ovlmqaa.apps.googleusercontent.com'
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
        margin: 23px auto 0 auto;
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
    .left-text-p {
        font-size: 20px;
        font-weight: 500;
        text-align: left;
        margin-bottom: 60px;
        color: rgba(60, 60, 67, 0.6);
        line-height: 1.6;
        // width: 359px;
    }
`
const GoogleLoginBtn = styled.div`
    width: 359px;
    height: 52px;
    text-algin: center;
    font-size: 16px;
    font-weight: 500;
    object-fit: contain;
    cursor: pointer;
`
interface UserProps {
    username?: string
    email?: string
    password?: string
    nickname?: string
    provider?: string
    img?: string
}
function Login({ providers }: { providers: any }) {
    const router = useRouter()
    const { data: session, status } = useSession()

    const fetchLogin = async () => {
        const userData: any = {
            name: session?.user?.name,
            email: session?.user?.email,
            password: 'Y', // accesToken
            provider: 'google',
            img: 'img',
        }

        await axios.post(`${baseURL}/api/user/`, [userData]).then((res) => {
            if (res.data.db === 'None') {
                Router.push({
                    pathname: '/login/join',
                })
            } else {
                let token = res.data['token']
                if (res.data['token'] !== 'user_info errors') {
                    setCookie('Authorization', token, {
                        path: '/',
                        maxAge: 1000 * 60 * 60 * 24 * 7,
                        secure: true,
                        SameSite: 'None',
                    })
                    router.replace('/')
                } else {
                    alert(JSON.stringify(res.data, null, 2))
                }
            }
        })
    }

    useEffect(() => {
        if (session) {
            fetchLogin()
        }
    }, [session])

    return (
        <Container>
            <LeftContainer>
                <h2 className="mins">59mins</h2>
            </LeftContainer>
            <RightContainer>
                <div className="servies">
                    <span>서비스 소개</span>
                    <span>팀 소개</span>
                </div>
                <div className="left-text">
                    <div className="left-text-div">
                        <div className="hello">안녕하세요</div>
                        <div className="hello-emoji">👋</div>
                    </div>
                    <p className="left-text-p">
                        늘어지고 주제에서 벗어나는 회의는 이제 그만! <br />
                        로그인 후 효율적인 회의를 진행해보세요.
                    </p>
                    {Object.values(providers).map((provider: any) => (
                        <div
                            key={provider.name}
                            style={{ cursor: 'pointer' }}
                            onClick={() =>
                                signIn(provider.id, {
                                    callbackUrl: '/login',
                                })
                            }
                        >
                            <Svg viewBox={googleBtnViewBox} width={'364'} height={'52'}>
                                <GoogleBtn />
                            </Svg>
                        </div>
                    ))}
                </div>
            </RightContainer>
        </Container>
    )
}

export default Login
