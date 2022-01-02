import {
    useDispatch as useReduxDispatch,
    useSelector as useReduxSelector,
} from 'react-redux'
import { RootState, AppDispatch } from './store'

type StateSelector<T> = (state: RootState) => T
type EqualityFn<T> = (left: T, right: T) => boolean

export function useSelector<T>(
    selector: StateSelector<T>,
    equalityFn?: EqualityFn<T>
) {
    return useReduxSelector(selector, equalityFn)
}

export const useDispatch = () => useReduxDispatch<AppDispatch>()
