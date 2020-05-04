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

export default combineReducers({
    comments: fetchComments,
    sentiments: analyzeComments,
    totalComparatives: reducedComparatives,
    scores: countScores
});