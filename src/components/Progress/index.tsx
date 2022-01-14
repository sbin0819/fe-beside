import React, { useState, useCallback } from 'react'
import useTimer from '@hooks/useTimer'
import styled from 'styled-components'
import useSWR from 'swr'

import axios from 'axios'

const TimterContainer = styled.div`
    display: inline-block;
    border: 1px solid tomato;
    padding: 30px 40px;

    .display {
        font-size: 5rem;
    }
    .timer_btns {
        display: flex;
        justify-content: center;
        margin-top: 20px;
        gap: 10px;
        button {
            padding: 5px 15px;
            background: #eee;
            :hover {
                background: gold;
                cursor: pointer;
            }
        }
    }
`

function Progress() {
    const { data } = useSWR('http://localhost:3000/api/timer', (url) =>
        axios.get(url)
    )
    const { minutes, seconds, start, stop, reset, remainingTime } = useTimer({
        duration: data?.data?.duration,
        onEnd: () => {},
    })

    const putRemainTime = async () => {
        await axios.put('http://localhost:3000/api/timer', { resetTime: 400 })
    }

    return (
        <div>
            <h1>임시 미팅 진행 페이지</h1>
            <button onClick={() => putRemainTime()}>click</button>

            <TimterContainer>
                <h1 className="display">
                    {minutes}:{seconds}
                </h1>
                <div className="timer_btns">
                    <button onClick={() => start()}>Start</button>
                    <button onClick={() => stop()}>Stop</button>
                    <button onClick={() => reset()}>Reset</button>
                </div>
                <div className="timer_btns_bottom"></div>
            </TimterContainer>
        </div>
    )
}

export default Progress
