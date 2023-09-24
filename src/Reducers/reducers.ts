import { combineReducers } from 'redux'
import { toDoReducer } from './toDoReducer'
import store from '../Store/store';

export const rootReducers = combineReducers({
    toDoReducer
})

export type AppDispatch = typeof store.dispatch;
// export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof rootReducers>;
export default rootReducers;