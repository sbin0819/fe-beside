import React, { useState, useCallback, useEffect } from 'react'
import useTimer from '@hooks/useTimer'
import styled from 'styled-components'
import useSWR from 'swr'
import axios from 'axios'
interface Timer {
    id: string
    start: boolean
    duration: number
    remainingTime: number
    level: number
}

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
    const { data } = useSWR('/api/timer', (url) => axios.get(url))
    const [soundEffect, setSoundEffect] = useState<any>()

    const {
        minutes,
        seconds,
        overMinutes,
        overSeconds,
        start,
        stop,
        reset,
        isRunning,
        remainingTime,
    } = useTimer({
        duration: data?.data?.duration, // 프리패칭으로 처리해야하나?
        onEnd: () => {
            soundEffect.play()
        },
    })

    const putRemainTime = async (time) => {
        await axios.put(
            'http://localhost:3000/api/timer',
            {
                remainingTime: Math.floor(time),
            },
            { withCredentials: true }
        )
    }
    useEffect(() => {
        setSoundEffect(new Audio('/sounds/alaram.mp3'))
    }, [])
    useEffect(() => {
        let timer
        // ref를 사용해야 할 수 도 있음
        if (isRunning) {
            timer = setTimeout(() => putRemainTime(seconds))
        }
        if (!isRunning) {
            clearTimeout(timer)
        }
        return () => clearTimeout(timer)
    }, [isRunning, seconds])

    return (
        <div>
            <h1>임시 미팅 진행 페이지</h1>
            <button onClick={() => putRemainTime(seconds)}>click</button>
            <TimterContainer>
                <h1 className="display">
                    {remainingTime > 0 ? (
                        <span style={{ color: 'blue' }}>
                            {minutes}:{seconds}
                        </span>
                    ) : (
                        <span style={{ color: 'red' }}>
                            {overMinutes}:{overSeconds}
                        </span>
                    )}
                </h1>
                <div className="timer_btns">
                    <button onClick={() => start()}>Start</button>
                    <button
                        onClick={() => {
                            stop()
                            soundEffect.pause()
                        }}
                    >
                        Stop
                    </button>
                    <button
                        onClick={() => {
                            soundEffect.pause()
                            reset()
                        }}
                    >
                        Reset
                    </button>
                </div>
                <div className="timer_btns_bottom"></div>
            </TimterContainer>
        </div>
    )
}

export default Progress
