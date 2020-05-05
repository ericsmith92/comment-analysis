import React from 'react';
import { connect } from 'react-redux';
import { countScores } from '../actions';

class Graph extends React.Component{
    
    componentDidUpdate(){
        if(this.props.scores){
            const sortedScores = this.sortScores();
            const sortedCounts = this.sortCounts();
            this.buildGraph(sortedScores, sortedCounts);
        }
    }

    getWidthAndHeight(sortedScores, sortedCounts){
        //get width by getting product of length and # of px in between each score, in this case 10
        const width = sortedScores.length * 10;
        const height = sortedCounts[sortedCounts.length - 1] * 10; 
        return [width, height];

    }

    sortScores(){
        const sortedScores = Object.keys(this.props.scores[0]).sort((prevNum, nextNum) => prevNum - nextNum);
        return sortedScores;
    }

    sortCounts(){
        const sortedCounts = Object.values(this.props.scores[0]).sort((prevNum, nextNum) => prevNum - nextNum);
        console.log(sortedCounts);
        return sortedCounts;
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