import React from 'react'
import { nanoid } from '@reduxjs/toolkit'
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
        background: #384c6c;
        color: #fff;
    }
`
const mockData = [
    { id: nanoid(), title: 'AGENDA 1', cursor: false },
    { id: nanoid(), title: 'AGENDA 2', cursor: true },
    { id: nanoid(), title: 'AGENDA 3', cursor: false },
    { id: nanoid(), title: 'AGENDA 4', cursor: false },
]
function MeetingStep(props) {
    return (
        <MenulSteps>
            {mockData.map((data) => (
                <div
                    className={`menu_step ${data.cursor ? 'active' : ''}`}
                    key={data.id}
                >
                    {data.title}
                </div>
            ))}
        </MenulSteps>
    )
}

export default MeetingStep
