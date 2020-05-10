import youtube from '../apis/youtube';
import history from '../history';
const Sentiment = require('sentiment');


//comments
export const fetchComments = id => async (dispatch)=> {
    const comments = await performFetch(id);
    dispatch({ type: 'FETCH_COMMENTS', payload: comments });
    history.push('/analysis');
}

const performFetch = async (id) => {
    const url = `/commentThreads?part=snippet%2Creplies&videoId=${id}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}&maxResults=100`;
    const response = await youtube.get(url);
    const comments = response.data.items;
    let nextPageToken = response.data.nextPageToken;

    while(nextPageToken){
        const recursiveResponse = await youtube.get(`${url}&pageToken=${nextPageToken}`);
        comments.push(recursiveResponse.data.items);
        nextPageToken = recursiveResponse.data.nextPageToken;
    }

    return comments;
}

//get all sentiment objects for list of comments
export const analyzeComments = () => async (dispatch, state) => {
    const sentimentInstance = new Sentiment();

    const sentiments = await state().comments[0].map(comment => {
        if(comment.snippet){
            return sentimentInstance.analyze(comment.snippet.topLevelComment.snippet.textOriginal);
        }
        return null;
    });

    dispatch({ type: 'ANALYZE_COMMENTS', payload: sentiments });
}

//reduce total comparitive score

export const reducedComparatives = () => (dispatch, state) => {
    const sentiments = state().sentiments[0];
    let totalComparatives = 0;
    let totalSkipped = 0;

    sentiments.forEach(sentiment => {
        if(sentiment){
            totalComparatives += sentiment.comparative;
        }else{
            totalSkipped++;
        }
    });

    dispatch({ type: 'REDUCE_COMPARATIVES', payload: totalComparatives / ( sentiments.length -  totalSkipped )});
}

//get count for all scores

export const countScores = () => (dispatch, state) => {
    let scores = {};
    const sentiments = state().sentiments[0];
    
    sentiments.forEach(sentiment => {
        if(sentiment){
            if(scores.hasOwnProperty(sentiment.score)){
                scores[sentiment.score]++;
            }else{
                scores[sentiment.score] = 1;
            }
        }
    });

    dispatch({ type: 'COUNT_SCORES', payload: scores});
}

//get width and height of graph
export const getWidthAndHeight = () => (dispatch, state) => {
    const scores = state().scores[0];
    const width = state().sortedScores[0].length * 20;
    const height = sortScoreCounts(scores)[sortScoreCounts(scores).length - 1] * 20 + 10; 

    dispatch({ type: 'GET_WIDTH_AND_HEIGHT', payload: [width, height]});
}

export const sortScores = () => (dispatch, state) => {
    const scores = state().scores[0];
    const sortedScores = Object.keys(scores).sort((prevNum, nextNum) => prevNum - nextNum);

    dispatch({ type: 'SORT_SCORES', payload: sortedScores });
}

const sortScoreCounts = (scores) => {
    const sortedCounts = Object.values(scores).sort((prevNum, nextNum) => prevNum - nextNum);
    return sortedCounts;
}