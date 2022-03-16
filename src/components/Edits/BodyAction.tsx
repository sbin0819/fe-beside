import React, { useEffect } from 'react'
import { Svg } from '@components/common'
import { Calendar, calendarViewBox } from '@svgs/Calendar'
import { People, peopleViewBox } from '@svgs/People'
import { ActionItemEl } from './style'
import moment from 'moment'
import { actionsSWR } from '@api/actions'

interface dataProps {
    actionsDatas: any
}

function BodyAction({ actionsDatas }: dataProps) {
    const { actionsData } = actionsSWR(actionsDatas)
    useEffect(() => {
        // console.log('actionsData---', actionsData)
    }, [])

    return (
        <div>
            {actionsData &&
                actionsData?.map((data) => {
                    return (
                        <ActionItemEl key={data?.action_id}>
                            <div className="action-item-title">{data?.action_title}</div>
                            <div className="action-item-member">
                                <Svg
                                    viewBox={peopleViewBox}
                                    width={'15'}
                                    height={'15'}
                                    style={{
                                        marginRight: '15px',
                                    }}
                                >
                                    <People />
                                </Svg>
                                {data?.person}
                            </div>
                            <div className="action-item-time">
                                {' '}
                                <Svg
                                    viewBox={calendarViewBox}
                                    width={'15'}
                                    height={'15'}
                                    style={{ marginRight: '15px' }}
                                >
                                    <Calendar />
                                </Svg>
                                {moment(data?.dead_line).format('YYYY-MM-DD')}
                            </div>
                        </ActionItemEl>
                    )
                })}
        </div>
    )
}

export default BodyAction
