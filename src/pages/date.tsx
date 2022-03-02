import React, { useState } from 'react'
import DatePicker from 'react-datepicker'

function date(props) {
    const [startDate, setStartDate] = useState(new Date())
    return (
        <DatePicker
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}
        />
    )
}

export default date
