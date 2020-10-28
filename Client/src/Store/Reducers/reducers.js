import {combineReducers} from 'redux';
import {reducer} from  'redux-form';
import Authreducer from './authReducer';
import Data from './DataReducer';

export default combineReducers({
    auth: Authreducer,
    form:reducer,
    dashboard:Data
});