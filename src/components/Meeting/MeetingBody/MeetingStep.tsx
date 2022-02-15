import React from 'react'
import styled from 'styled-components'

const MenulSteps = styled.div`
    display: flex;
    margin: 28px 0 32px;
    gap: 10px;
    .menu_step {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 76px;
        height: 28px;
        border-radius: 8px;
        border: solid 1px #d6d6d7;
        background-color: #fff;
        font-size: 12px;
        color: #0c254c;
    }
    .menu_step.active {
        background: #748298;
        color: #fff;
    }
`

function MeetingStep(props) {
    return (
        <MenulSteps>
            <div className="menu_step">AGENDA 1</div>
            <div className="menu_step active">AGENDA 2</div>
            <div className="menu_step">AGENDA 3</div>
            <div className="menu_step">AGENDA 4</div>
        </MenulSteps>
    )
}

export default MeetingStep
