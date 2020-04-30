import React from 'react';
import { connect } from 'react-redux';
import { analyzeComments } from '../actions';

class Graph extends React.Component{

    componentDidMount(){
        this.props.analyzeComments();
    }
    
    render(){
        console.log(this.props);
        return(
            <div>Graph</div>
        )
    }
}

const mapStateToProps = state => {
    return { sentiments: state.sentiments };
}

export default connect(
    mapStateToProps,
    { 
        analyzeComments
})(Graph);