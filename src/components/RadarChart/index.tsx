import React from 'react'

import { Radar } from 'react-chartjs-2'

export const data = {
    labels: ['Thing 1', 'Thing 2', 'Thing 3', 'Thing 4'],

    datasets: [
        {
            legend: {
                display: false,
            },
            label: '# of Votes',
            data: [20, 10, 10, 30],
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
    },
}
export default function App() {
    return <Radar data={data} options={options} />
}