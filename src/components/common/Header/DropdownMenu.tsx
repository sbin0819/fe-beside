import React, { useRef } from 'react'
import styled from 'styled-components'
import { Svg } from '@common'
import { Signout, signoutViewBox } from '@svgs/Signout'
import { Profile, profileViewBox } from '@svgs/Profile'

import useOnClickOutside from '@hooks/useOnClickOutside'

const DropDownContainer = styled.div`
    position: absolute;
    right: 0px;
    top: 32px;
    width: 180px;
    height: 124px;
    padding: 16px 46px 16px 16px;
    border-radius: 24px;
    box-shadow: 4px 4px 32px rgba(0, 0, 0, 0.2);
    background: #fff;
    z-index: 200;
    .item {
        cursor: pointer;
        display: flex;
        flex-grow: 0;
        margin: 0 0 16px 0;
        font-family: Pretendard;
        font-size: 14px;
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.43;
        letter-spacing: normal;
        text-align: left;
        color: #000;
        .box {
            width: 20px;
            height: 20px;
            margin-right: 8px;
            background: pink;
        }
    }
`
interface DropdownMenuProps {
    onClose: () => void
}
function DropdownMenu({ onClose }: DropdownMenuProps) {
    const ref = useRef<any>()
    useOnClickOutside(ref, () => {
        onClose()
    })
    return (
        <div ref={ref}>
            <DropDownContainer>
                <div className="item">
                    <Svg viewBox={profileViewBox} width={'20'} height={'18'}>
                        <Profile />
                    </Svg>
                    내 계정
                </div>
                <div className="item">
                    <span className="box"></span>About 59mins
                </div>
                <div className="item">
                    <Svg viewBox={signoutViewBox} width={'20'} height={'18'}>
                        <Signout />
                    </Svg>
                    로그아웃
                </div>
            </DropDownContainer>
        </div>
    )
}

export default DropdownMenu
