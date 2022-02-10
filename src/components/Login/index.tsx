import React, { useEffect } from 'react'
import styled from 'styled-components'
import Router from 'next/router'
import axios from 'axios'
import GoogleLogin from 'react-google-login'
const clientId =
    '184508570520-h1j9rlar4tjrbh2eadugdvqg1ovlmqaa.apps.googleusercontent.com'
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
const GoogleBtn = styled(GoogleLogin)`
    width: 359px;
    height: 52px;
    text-algin: center;
    font-size: 16px;
    font-weight: 500;
    color: red;
    border: solid 1px #d6d6d7;
    object-fit: contain;
`
interface UserProps {
    username?: string
    email?: string
    password?: string
    nickname?: string
    provider?: string
    img?: string
}
function Login() {
    const onSuccess = async (response) => {
        console.log('구글 로그인 -- ', response)
        // console.log('username', response.Ju.sf)
        // console.log('email', response.profileObj.email)
        // console.log('password', response.profileObj.googleId)
        // console.log('nickname', response.Ju.hY)
        // console.log('img', response.profileObj.imageUrl)
        const userData: any = {
            username: response.Ju.sf,
            email: response.profileObj.email,
            password: response.profileObj.googleId,
            provider: 'GOOGLE',
            img: response.profileObj.imageUrl,
        }
        let googleUserName = userData.userName
        console.log('=======', userData.username)

        // await axios
        //     .post('http://127.0.0.1:8000/api/login/', {
        //         username: response.Ju.sf,
        //         email: response.profileObj.email,
        //         password: response.profileObj.googleId,
        //         provider: 'GOOGLE',
        //         img: response.profileObj.imageUrl,
        //     })
        //     .then((res) => {
        //         console.log('res', res)
        //         // console.log('데이터 확인', userData)
        //     })

        // Router.push({
        //     pathname: '/login/join',
        //     query: { userName: googleUserName },
        // })
        Router.push(`/login/join?userName=${userData.username}`)
    }
    const onFailure = (error) => {
        console.log(error)
    }
    useEffect(() => {
        // axios.get('http://127.0.0.1:8000/api/meet').then((res) => {
        // console.log('meet list', res)
        // })
        // console.log('---', userData.userName)
    }, [])
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
                    <GoogleBtn
                        clientId={clientId}
                        className="GoogleBtn"
                        responseType={'id_token'}
                        onSuccess={onSuccess}
                        onFailure={onFailure}
                        cookiePolicy={'single_host_origin'}
                    />
                </div>
            </RightContainer>
        </Container>
    )
}

export default Login
