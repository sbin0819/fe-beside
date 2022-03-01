import useTimer from '@hooks/useTimer'
import axios from 'axios'
import { duration } from 'moment'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import useSWR from 'swr'
import Bell from '@components/Bell'
const Container = styled.div`
    background: #020438;
    font: 14px/1 'Open Sans', helvetica, sans-serif;
    -webkit-font-smoothing: antialiased;
    .box {
        height: 250px;
        width: 250px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #020438;
        border-radius: 100%;
        overflow: hidden;
        .percent {
            position: absolute;
            left: 0;
            top: 0;
            z-index: 3;
            width: 100%;
            height: 100%;
            display: flex;
            display: -webkit-flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            font-size: 64px;
        }
        .water {
            position: absolute;
            left: 0;
            top: 0;
            z-index: 2;
            width: 100%;
            height: 100%;
            transform: translate(0, 100%);
            background: #5cbcad;
            transition: all 0.3s;
            &_wave {
                width: 200%;
                position: absolute;
                bottom: 100%;
                &_back {
                    right: 0;
                    fill: #bee4de;
                    animation: wave-back 1.4s infinite linear;
                }
                &_front {
                    left: 0;
                    fill: #5cbcad;
                    margin-bottom: -1px;
                    animation: wave-front 0.7s infinite linear;
                }
            }
        }
    }
    @keyframes wave-front {
        100% {
            transform: translate(-50%, 0);
        }
    }

    @keyframes wave-back {
        100% {
            transform: translate(50%, 0);
        }
    }
`

function UI2() {
    const { data } = useSWR('/api/timer', (url) => axios.get(url))
    const [soundEffect, setSoundEffect] = useState<any>()
    const duration = 120
    const {
        minutes,
        seconds,
        overTime,
        overMinutes,
        overSeconds,
        start,
        stop,
        reset,
        isRunning,
        remainingTime,
    } = useTimer({
        duration, // 프리패칭으로 처리해야하나?
        onEnd: () => {
            // soundEffect.play()
        },
    })
    let isUnderMinute = () => {
        return 60 > Math.round(remainingTime / 1000)
    }
    let remainPercent = () => {
        return +overSeconds > 0
            ? 0
            : Math.floor((Math.round(remainingTime / 1000) / duration) * 100)
    }
    let increasePercent = () => {
        return +overSeconds > 0
            ? 100
            : 100 -
                  Math.floor(
                      (Math.round(remainingTime / 1000) / duration) * 100
                  )
    }

    // timer ui
    useEffect(() => {
        let box = document.querySelector<HTMLElement>('.box')
        var cnt = document.getElementById('count')
        var water = document.getElementById('water')
        let waveFront = document.querySelector<HTMLElement>('.water_wave_back')
        let waveBack = document.querySelector<HTMLElement>('.water_wave_front')
        // var formattedMinutes = minutes[0] == '0' ? minutes[1] : minutes
        // cnt.innerHTML = `${formattedMinutes}분`
        cnt.innerHTML = '' + remainPercent() + '%'
        if (remainingTime != 0) {
            box.style.background = '#020438'
            cnt.style.color = '#fff'
            waveFront.style.display = 'block'
            waveBack.style.display = 'block'
            if (+increasePercent() > 20 && !isUnderMinute()) {
                water.style.background = '#ffc848'
                waveFront.style.fill = '#ffc848'
                waveBack.style.fill = '#ffe9b6'
            } else if (isUnderMinute()) {
                water.style.background = '#f76f58'
                waveFront.style.fill = '#f76f58'
                waveBack.style.fill = '#fcd3bc'
            } else {
                water.style.background = '#5cbcad'
                waveFront.style.fill = '#5cbcad'
                waveBack.style.fill = '#bee4de'
            }
            water.style.transform =
                'translate(0' + ',' + (0 + increasePercent()) + '%)'
        } else {
            // box.style.background = '#384c6c'
            // water.style.background = '#384c6c'
            // cnt.style.color = '#e24646'
            // waveFront.style.display = 'none'
            // waveBack.style.display = 'none'
            // cnt.innerHTML = '' + overSeconds + '초'
        }
    }, [seconds, overSeconds])

    //overTime이 1이 넘어가면 알람을 울린다
    // 알람을 ?초 동안 울리게 하고
    // 알람의 울림이 끝나면 overTime 을 보여준다.

    return (
        <>
            <div
                onClick={() => start()}
                style={{ background: 'gold', padding: '20px' }}
            >
                start
            </div>
            <div
                onClick={() => stop()}
                style={{ background: 'pink', padding: '20px' }}
            >
                stop
            </div>
            <div
                onClick={() => reset()}
                style={{ background: 'teal', padding: '20px' }}
            >
                reset
            </div>
            <Container>
                <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns-xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    style={{ display: 'none' }}
                >
                    <symbol id="wave">
                        <path d="M420,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C514,6.5,518,4.7,528.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H420z"></path>
                        <path d="M420,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C326,6.5,322,4.7,311.5,2.7C304.3,1.4,293.6-0.1,280,0c0,0,0,0,0,0v20H420z"></path>
                        <path d="M140,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C234,6.5,238,4.7,248.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H140z"></path>
                        <path d="M140,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C46,6.5,42,4.7,31.5,2.7C24.3,1.4,13.6-0.1,0,0c0,0,0,0,0,0l0,20H140z"></path>
                    </symbol>
                </svg>
                <div className="box">
                    <div className="percent">
                        <div className="percentNum" id="count">
                            0
                        </div>
                        {/* <Bell /> */}
                        <div className="percentB"></div>
                    </div>
                    <div id="water" className="water">
                        <svg
                            viewBox="0 0 560 20"
                            className="water_wave water_wave_back"
                        >
                            <use xlinkHref="#wave"></use>
                        </svg>
                        <svg
                            viewBox="0 0 560 20"
                            className="water_wave water_wave_front"
                        >
                            <use xlinkHref="#wave"></use>
                        </svg>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default UI2
