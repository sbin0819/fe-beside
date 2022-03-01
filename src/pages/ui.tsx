import React, { useEffect } from 'react'
import styled from 'styled-components'

const Container = styled.div`
    margin: 100px auto;
    width: 250px;
    border: 3px solid darkorange;
    display: flex;
    svg {
        background: #fff;
        margin: 0 auto;
        height: 500px;
    }
    button {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background: red;
        color: #fff;
        font-weight: 700;
        font-family: 'Lato', sans-serif;
        font-size: 20px;
    }
`

function UIPage() {
    useEffect(() => {
        var pathLength_1 = 22 // distance fromm the initial position to the pos. the drop beginns his free fall
        var durrationDropAccumulates = 5000 // time in ms the drop accumulates
        var dropAccumulatesSpeed = pathLength_1 / durrationDropAccumulates

        var durrationFreeFall = 500 // time of free fall
        var pathLength_2 = 130 // distance of free fall
        var freeFallAcceleration =
            ((pathLength_2 - dropAccumulatesSpeed * durrationFreeFall) * 2) /
            (durrationFreeFall * durrationFreeFall)

        var start = null
        var element = document.getElementById('drop')
        var btn = document.getElementById('btn')
        window.requestAnimationFrame(step)

        function step(timestamp) {
            if (!start) start = timestamp
            var progress = timestamp - start

            if (progress < durrationDropAccumulates) {
                5
                var pos = progress * dropAccumulatesSpeed
                // formular uniform motion
                element.setAttribute('transform', 'translate(0,' + pos + ')')
                window.requestAnimationFrame(step)
            }
            if (
                progress >= durrationDropAccumulates &&
                progress < durrationDropAccumulates + durrationFreeFall
            ) {
                var progress2 = progress - 5000
                // formular free fall with initial speed and inital offset
                pos =
                    pathLength_1 +
                    progress2 * dropAccumulatesSpeed +
                    0.5 * freeFallAcceleration * progress2 * progress2
                element.setAttribute('transform', 'translate(0,' + pos + ')')
                window.requestAnimationFrame(step)
            }
            if (progress >= durrationDropAccumulates + durrationFreeFall) {
                start = null
                window.requestAnimationFrame(step)
            }
        }
    }, [])

    return (
        <div>
            <Container>
                <svg viewBox="0 0 100 200" preserveAspectRatio="xMidYMid meet">
                    <defs>
                        <filter id="goo">
                            <feGaussianBlur
                                in="SourceGraphic"
                                stdDeviation="1"
                                result="blur"
                            ></feGaussianBlur>
                            <feColorMatrix
                                in="blur"
                                mode="matrix"
                                values="1 0 0 0 0  
                             0 1 0 0 0  
                             0 0 1 0 0  
                             0 0 0 13 -9"
                                result="goo"
                            ></feColorMatrix>
                            <feComposite
                                in="SourceGraphic"
                                in2="goo"
                                operator="atop"
                            ></feComposite>
                        </filter>
                        <path
                            id="wave"
                            d="M 0,155 C 25,155 25,160 50,160 75,160 75,155 100,155 125,155 125,160 150,160 175,160 175,155 200,155 v 200 h -200 z"
                        />
                    </defs>
                    <use
                        id="wave1"
                        className="wave"
                        href="#wave"
                        x="0"
                        y="0"
                        fill="#4478e3"
                    />
                    <g filter="url(#goo)">
                        <circle
                            cx="50"
                            cy="22"
                            r="20"
                            stroke="blue"
                            strokeWidth="0"
                            fill="#3561c0"
                        />
                        <path
                            transform="translate(0,0)"
                            id="drop"
                            d=" m 58,30 c 0,4 -4,8 -8,8 -4,0 -8,-4 -8,-8 0,-4 4,-8 8,-13 4,6 8,8 8,13 z"
                            fill="#3561c0"
                        />
                    </g>
                </svg>
            </Container>
        </div>
    )
}

export default UIPage
