import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

const Container = styled.div`
    height: 40px;
    width: 100%;
    background-color: #fff;
    padding: 0 0 14px;
    color: rgba(60, 60, 67, 0.6);
    font-size: 10px;
    position: fixed;
    border-top: 1px solid #f1f1f1;
    bottom: 0;
    .footer_59mins {
        width: 50%;
        text-align: center;
        float: left;
    }
    .footer_servies {
        width: 50%;
        text-align: center;
        float: right;
    }
    .footer-text {
        line-height: 40px;
    }
    .footer-text {
        margin-right: 27px;
    }
`

function Footer() {
    return (
        <Container>
            <div className="footer_59mins">
                <p className="footer-text">59mins &nbsp;&nbsp; 2022</p>
            </div>
            <div className="footer_servies">
                <Link href="/">
                    <span className="footer-text footer-text1">서비스이용약관</span>
                </Link>
                <Link href="/">
                    <span className="footer-text">개인정보처리방침</span>
                </Link>
            </div>
        </Container>
    )
}

export default Footer
