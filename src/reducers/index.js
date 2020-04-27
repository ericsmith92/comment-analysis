import { combineReducers } from 'redux';

const fetchComments = (state = [], action) => {
    switch(action.type){
        case 'FETCH_COMMENTS':
            return [...state, action.payload];
        default:
            return state;
    }
}

export default combineReducers({
    comments: fetchComments
});