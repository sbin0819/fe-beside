import React from 'react'
import errorPage from '../../public/image/img_404error.png'
import styled from 'styled-components'
import { useRouter } from 'next/router'

export default function Custom404() {
    const router = useRouter()
    return (
        <React.Fragment>
            <Comtainer>
                <Image404 src="/image/img_404error.png" />
                <TextH2>
                    죄송합니다. 현재 찾을 수 없는 페이지를 요청 하셨습니다.
                </TextH2>
                <TextP>
                    존재하지 않는 주소를 입력하셨거나, <br />
                    요청하신 페이지의 주소가 변경 및 삭제되어 찾을 수 없습니다.{' '}
                    <br />
                    궁금하신 점이 있으시면 고객센터를 통해 문의를 주시기
                    바랍니다.
                </TextP>
                <HomeBtn onClick={() => router.push('/home')}>메인으로</HomeBtn>
            </Comtainer>
        </React.Fragment>
    )
}
const Comtainer = styled.div`
    justify-content: center;
    align-item: center;
    text-align: center;
`
const Image404 = styled.img`
    justify-content: center;
    align-item: center;
    width: 825px;
    height: 360px;
    text-align: center;
    margin: 132px auto 0 auto;
`
const TextH2 = styled.h2`
    font-weight: 500;
    font-size: 32px;
    ext-align: center;
    color: #0c254c;
    margin-top: 60px;
`
const TextP = styled.p`
    font-size: 20px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.6;
    letter-spacing: normal;
    text-align: center;
    color: #87878b;
    margin-top: 40px;
`
const HomeBtn = styled.button`
    margin-top: 60px;
    color: #fff;
    width: 170px;
    height: 52px;
    flex-grow: 0;
    margin: 60px 875px 134px;
    padding: 14px 40px;
    border-radius: 12px;
    background-color: #0c254c;
    text-align: center;
    font-size: 16px;
    cursor: pointer;
    font-weight: 500;
`
