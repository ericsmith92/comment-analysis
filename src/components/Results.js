import React from 'react';
import { connect } from 'react-redux';
import { analyzeComments, reducedComparatives, countScores, getWidthAndHeight } from '../actions';

import Graph from './Graph';

class Results extends React.Component{

    componentDidMount(){
       this.getAndAnalyzeComments();
    }

    getAndAnalyzeComments = async () => {
        await this.props.analyzeComments();
        await this.props.reducedComparatives();
        await this.props.countScores();
        this.props.getWidthAndHeight();
    }

    getOverallSentiment = (comparative) => {
        let msg = '';

        if(comparative > 0){
            msg = 'Positive';
        }else if(comparative < 0){
            msg = 'Negative';
        }else{
            msg = 'Neutral';
        }
        
        return msg;
    }

    
    render(){
        return(
            <div>
                {this.props.totalComparative ? `Overall comparative is ${this.getOverallSentiment(this.props.totalComparative[0] )} : ${this.props.totalComparative[0]}` : 'Loading...'}
                {this.props.widthAndHeight ? <Graph /> : ''}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { sentiments: state.sentiments, totalComparative: state.totalComparatives, scores: state.scores,  widthAndHeight: state.widthAndHeight};
}

export default connect(
    mapStateToProps,
    { 
        analyzeComments,
        reducedComparatives,
        countScores,
        getWidthAndHeight
})(Results);