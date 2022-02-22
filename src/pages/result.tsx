import React, { useState } from 'react'
import styled from 'styled-components'
import CheckList from '@components/CheckList'

const StyledButton = styled.div`
    background: teal;
    padding: 20px 30px;
    font-size: 40px;
    width: 300px;
    margin: 100px auto;
    display: flex;
    justify-content: center;
    cursor: pointer;
`

function ResultPage() {
    const [isOpen, setIsOpen] = useState(true)
    const handleClose = () => setIsOpen(false)
    return (
        <div>
            {isOpen && <CheckList onClose={handleClose} />}

            <StyledButton onClick={() => setIsOpen(true)}>
                자가진단 열기
            </StyledButton>
        </div>
    )
}

export default ResultPage
