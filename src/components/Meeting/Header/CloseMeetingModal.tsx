import React, { useRef } from 'react'
import styled from 'styled-components'

import useOnClickOutside from '@hooks/useOnClickOutside'

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    /* background: gold; */
    background: rgba(0, 0, 0, 0.34);
    z-index: 10;
`

const ModalContainer = styled.div`
    width: 420px;
    height: 200px;
    padding: 32px 36px;
    border-radius: 24px;
    box-shadow: 4px 4px 20px 0 rgba(0, 0, 0, 0.16);
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`
interface DropdownMenuProps {
    onClose?: () => void
}
function CloseMeetingModal({ onClose }: DropdownMenuProps) {
    const ref = useRef<any>()
    useOnClickOutside(ref, () => {
        onClose()
    })
    return (
        <Container ref={ref}>
            <ModalContainer></ModalContainer>
        </Container>
    )
}

export default CloseMeetingModal
