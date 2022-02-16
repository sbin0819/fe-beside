import { useSelector } from 'react-redux'

export default function useMeeting() {
    return useSelector((state) => state.meeting)
}
