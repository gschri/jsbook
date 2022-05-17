import { useSelector, TypedUseSelectorHook } from 'react-redux'
import { RootState } from '../state'

export let useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
