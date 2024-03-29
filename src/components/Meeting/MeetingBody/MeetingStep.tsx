import React from 'react'
import { current, nanoid } from '@reduxjs/toolkit'
import styled from 'styled-components'
import useMeeting from '@store/meeting/useMeeting'
import useMeetingActions from '@store/meeting/useMeetingActions'

const MenulSteps = styled.div`
    display: flex;
    margin: 28px 0 32px;
    width: 656px;
    overflow: scroll;
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
        cursor: pointer;
    }
    .menu_step.curr_active {
        background: #748298;
        color: #fff;
    }
    .menu_step.active {
        background: #384c6c;
        color: #fff;
    }
    .menu_step.disabled {
        border: solid 1px #f1f1f1;
        color: #d6d6d7;
    }
`

function MeetingStep() {
    const { agendas, agendaCursor } = useMeeting()
    const { setAgendaCursor } = useMeetingActions()

    const realActive =
        agendas.findIndex((el) => el.agenda_status == 'p') === -1
            ? agendas.length - 1
            : agendas.findIndex((el) => el.agenda_status == 'p')

    return (
        <MenulSteps>
            {agendas.map((data, idx) => (
                <div
                    className={`menu_step ${
                        agendaCursor === idx && realActive ? 'curr_active' : ''
                    } ${
                        agendaCursor === realActive && agendaCursor === idx
                            ? 'active'
                            : ''
                    }
                    ${data.agenda_status === 'y' && 'disabled'}`}
                    key={data.agenda_id}
                    onClick={() => {
                        if (data.agenda_status !== 'y') {
                            setAgendaCursor({ agendaCursor: idx })
                        }
                    }}
                >
                    AGENDA {idx + 1}
                </div>
            ))}
        </MenulSteps>
    )
}

export default MeetingStep
