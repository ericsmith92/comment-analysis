import youtube from '../apis/youtube';

//we will need to pass the ID here

export const fetchComments = id => async dispatch=> {
    const response = await youtube.get(`/commentThreads?part=snippet%2Creplies&videoId=${id}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}&maxResults=100`);

    dispatch({ type: 'FETCH_COMMENTS', payload: response.data.items });
}

