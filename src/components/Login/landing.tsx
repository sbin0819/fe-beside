import React from 'react'
import styled from 'styled-components'
import Router from 'next/router'
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
    .servies {
        text-align: center;
        margin: 23px auto 0 auto;
        border: 1px solid red;
        height: 32px;
        font-size: 20px;
        font-weight: 500;
    }
    .servies span {
        cursor: pointer;
        margin-right: 56px;
    }
    .left-text {
        border: 1px solid blue;
        // margin-top: 100px;
        width: 460px;
        position: absolute;
        top: 50%;
        margin-left: 109px;
        transform: translateY(50%);
    }
    .left-text h2 {
        font-weight: bold;
        font-size: 48px;
        margin: 0 8px 12px 0;
    }
    .left-text p {
        font-size: 20px;
        font-weight: 500;
        text-align: left;
        color: rgba(60, 60, 67, 0.6);
        line-height: 1.6;
        // width: 359px;
    }
`
const GoogleBtn = styled.div`
    // width: 359px;
    height: 100px;
    border: 1px solid red;
`

function Landing() {
    const onSuccess = async (response) => {
        const userData: any = {
            userName: response.Ju.sf,
        }
        // console.log('데이터 확인', userData)
        Router.push({
            pathname: '/login',
            query: { userName: userData.userName },
        })
        // console.log(response)
        // console.log(response.Ju.sf)
    }
    const onFailure = (error) => {
        console.log(error)
    }
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
                    <h2>안녕하세요 </h2>
                    <p>
                        늘어지고 주제에서 벗어나는 회의는 이제 그만! <br />
                        로그인 후 효율적인 회의를 진행해보세요.
                    </p>
                    <GoogleLogin
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

export default Landing
