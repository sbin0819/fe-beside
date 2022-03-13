import React, { useEffect } from 'react'
import { ActionUi } from './style'

interface AgendaProps {
    datas: any
}
function BodyAgenda({ datas }: AgendaProps) {
    useEffect(() => {
        console.log('number --', datas)
    }, [])

    return (
        <>
            {datas &&
                datas?.map((data) => {
                    return (
                        <div key={data?.agenda_id}>
                            <div className="action-middle-title">{data?.discussion}</div>
                            <ul>
                                <ActionUi>{data?.decisions}</ActionUi>
                            </ul>
                        </div>
                    )
                })}
        </>
    )
}

export default BodyAgenda
