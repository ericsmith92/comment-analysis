import React from 'react';
import { connect } from 'react-redux';
import { countScores } from '../actions';

class Graph extends React.Component{
    
    componentDidUpdate(){
        if(this.props.scores){
            this.sortScores();
        }
    }

    sortScores(){
        const sortedScores = Object.keys(this.props.scores[0]).sort((prevNum, nextNum) => prevNum - nextNum);
        console.log(sortedScores);
        return sortedScores;
    }

    render(){
        return(
            <div>Graph</div>
        )
    }
}


const mapStateToProps = state => {
    return { scores: state.scores };
}

export default connect(
    mapStateToProps,
    { 
        countScores
})(Graph);