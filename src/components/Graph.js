import React from 'react';
import { connect } from 'react-redux';
import { countScores, getWidthAndHeight } from '../actions';

class Graph extends React.Component{
    
    componentDidUpdate(){
        if(this.props.scores){
            this.props.getWidthAndHeight();
        }
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
        countScores,
        getWidthAndHeight
})(Graph);