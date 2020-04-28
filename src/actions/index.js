import youtube from '../apis/youtube';

//we will need to pass the ID here

export const fetchComments = id => async (dispatch)=> {
    const comments = await performFetch(id);
    dispatch({ type: 'FETCH_COMMENTS', payload: comments });
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

