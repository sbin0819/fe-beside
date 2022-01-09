import React, { useState } from 'react'
import { Timer } from './common'
import styled from 'styled-components'

const Container = styled.div`
    button {
        background: #dfd0d0;
        padding: 6px 5px;
        margin: 0 1px;
        cursor: pointer;
    }
`

function SampleTimer() {
    const [sec, setSec] = useState(4)
    return (
        <Container>
            <h1 style={{ fontSize: '30px' }}>Timer 테스트</h1>

            <Timer
                duration={sec}
                onEnd={() => {
                    // console.log('done')
                }}
                // autostart
            >
                {(timerData: any) => (
                    <>
                        <h1 style={{ fontSize: '25px' }}>
                            {timerData.minutes}:{timerData.seconds}
                        </h1>

                        {/* <pre>{JSON.stringify(timerData, null, 2)}</pre> */}

                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <button onClick={() => setSec((prev) => prev + 1)}>
                                +
                            </button>
                            <div>{sec}</div>
                            <button onClick={() => setSec((prev) => prev - 1)}>
                                -
                            </button>
                        </div>

                        <button onClick={() => timerData.start()}>Start</button>
                        <button onClick={() => timerData.stop()}>Stop</button>
                        <button onClick={() => timerData.toggle()}>
                            Toggle
                        </button>
                        <button onClick={() => timerData.reset()}>Reset</button>
                    </>
                )}
            </Timer>
        </Container>
    )
}

export default SampleTimer
