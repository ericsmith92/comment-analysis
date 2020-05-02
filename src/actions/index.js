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
    const response = await youtube.get(`/commentThreads?part=snippet%2Creplies&videoId=${id}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}&maxResults=100`);
    const comments = response.data.items;
    let nextPageToken = response.data.nextPageToken;

    while(nextPageToken){
        const recursiveResponse = await youtube.get(`/commentThreads?part=snippet%2Creplies&videoId=${id}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}&maxResults=100&pageToken=${nextPageToken}`);
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
    //const sentiments = state.sentiments;
    console.log(sentiments);
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