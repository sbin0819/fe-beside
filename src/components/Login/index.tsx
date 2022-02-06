import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'

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
        // border: 1px solid blue;
        // margin-top: 100px;
        width: 460px;
        position: absolute;
        // top: 50%;
        margin-left: 109px;
        // transform: translateY(50%);
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
        // width: 359px;
    }
`
const SignInput = styled.div`
    border: 1px solid red;
    .sign-name {
        // width : 105px;
        height: 20px;
        flex-grow: 0;
        margin: 52px 69px 8px 0;
        font-family: Pretendard;
        font-size: 14px;
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.43;
        letter-spacing: normal;
        text-align: left;
        // color: #3c3c43;
        color:red
        border: 1px solid red;
    }
    .input-box {
        width: 364px;
        height: 48px;
        border-radius: 12px;
        border: 1px solid #0c254c;
    }
    .sign-button {
        width: 364px;
        height: 52px;
        margin: 40px 96px 16px 0;
        border-radius: 12px;
        background-color: #0c254c;
        font-size: 16px;
        color: #fff;
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
interface UserProps {
    name: string
}
function Login() {
    const router = useRouter()
    const userDataName: any = router.query.userName
    const [userName, setUserName] = useState('')
    useEffect(() => {
        console.log('ddd', userDataName)
        setUserName(userDataName)
    }, [])
    return (
        <Container>
            <LeftContainer>
                <h2 className="mins">59mins</h2>
            </LeftContainer>
            <RightContainer>
                <div className="left-text">
                    <h2>반가워요 </h2>
                    <p className="sign-welcom">
                        시간내에 끝내지 못한 회의에 지친 모든 <br />
                        오구민씨를 환영합니다.
                    </p>
                    <SignInput>
                        <p className="sign-name">닉네임 (10자 이내)</p>
                        <input
                            className="input-box"
                            value={userName}
                            maxLength={10}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                        <button className="sign-button">시작할게요</button>
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

export default Login
