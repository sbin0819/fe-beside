import React from 'react'

import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js'

import { Radar } from 'react-chartjs-2'

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
)

interface Props {
    ownerShip: number
    participation: number
    efficiency: number
    productivity: number
    // data: Array<number>
}

export const data = {
    labels: ['Thing 1', 'Thing 2', 'Thing 3', 'Thing 4'],

    datasets: [
        {
            legend: {
                display: false,
            },
            label: '# of Votes',
            data: [30, 30, 30, 30],
            backgroundColor: 'rgba(61, 109, 184, 0.4)',
            borderColor: '#3D6DB8',
            borderWidth: 1,
        },
    ],
}
const options = {
    plugins: {
        legend: {
            display: false,
        },
        scales: {
            ticks: {
                min: 0,
                stepSize: 30,
            },
        },
    },
}
export default function App(Props) {
    console.log('reusltdata', Props.data)
    return (
        <Radar
            data={{
                labels: ['오너십', '참여도', '오너십3', '참여도4'],

                datasets: [
                    {
                        // legend: {
                        //     display: false,
                        // },
                        label: '# of Votes',
                        data: Props.data,
                        backgroundColor: 'rgba(61, 109, 184, 0.4)',
                        borderColor: '#3D6DB8',
                        borderWidth: 1,
                    },
                ],
            }}
            options={options}
        />
    )
}
