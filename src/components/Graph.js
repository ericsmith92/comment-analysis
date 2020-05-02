import React from 'react';
import { connect } from 'react-redux';
import { analyzeComments, reducedComparatives  } from '../actions';

class Graph extends React.Component{

    componentDidMount(){
       this.getAndAnalyzeComments();
    }

    getAndAnalyzeComments = async () => {
        await this.props.analyzeComments();
        this.props.reducedComparatives();
    }

    
    render(){
        return(
            <div>{this.props.totalComparative ? this.props.totalComparative[0] : 'Loading...'}</div>
        )
    }
}

const mapStateToProps = state => {
    return { sentiments: state.sentiments, totalComparative: state.totalComparatives };
}

export default connect(
    mapStateToProps,
    { 
        analyzeComments,
        reducedComparatives 
})(Graph);