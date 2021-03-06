import { combineReducers } from 'redux';

const fetchComments = (state = [], action) => {
    switch(action.type){
        case 'FETCH_COMMENTS':
            return [...state, action.payload];
        default:
            return state;
    }
}

const analyzeComments = (state = [], action) => {
    switch(action.type){
        case 'ANALYZE_COMMENTS':
            return [...state, action.payload];
        default:
            return state;
    }
}

const reducedComparatives = (state = [], action) => {
    switch(action.type){
        case 'REDUCE_COMPARATIVES':
            return [...state, action.payload];
        default:
            return state;
    }
}

const countScores = (state = [], action) => {
    switch(action.type){
        case 'COUNT_SCORES':
            return [...state, action.payload];
        default:
            return state;
    }
}

const sortScores = (state = [], action) => {
    switch(action.type){
        case 'SORT_SCORES':
            return [...state, action.payload];
        default:
            return state;
    }
}

const getWidthAndHeight = (state = [], action) => {
    switch(action.type){
        case 'GET_WIDTH_AND_HEIGHT':
            return [...state, action.payload];
        default:
            return state;
    }
}

const emptyState = (state = {}, action) => {
    switch(action.type){
        case 'EMPTY_STATE':
            return state = {};
        default:
            return state;
    }
}

const allReducers = combineReducers({
    comments: fetchComments,
    sentiments: analyzeComments,
    totalComparatives: reducedComparatives,
    scores: countScores,
    sortedScores: sortScores,
    widthAndHeight: getWidthAndHeight,
    emptyState: emptyState
});


const rootReducer = (state, action) => {
    if(action.type === 'EMPTY_STATE'){
        state = undefined;
    }

    return allReducers(state, action);
}

export default rootReducer;