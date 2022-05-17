import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../state'

export let useActions = () => {
  var dispatch = useDispatch();

  return useMemo(() => {
    return bindActionCreators(actionCreators, dispatch)
  }, [dispatch])
}
