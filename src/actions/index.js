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

//sentiment
export const analyzeComments = () => (dispatch, state) => {
    const sentiment = new Sentiment();

    const sentiments = state().comments[0].map(comment => {
        if(comment.snippet){
            return sentiment.analyze(comment.snippet.topLevelComment.snippet.textOriginal);
        }
       
    });

    dispatch({ type: 'ANALYZE_COMMENTS', payload: sentiments });
}




