import React from 'react';
import { connect } from 'react-redux';
import { countScores } from '../actions';

class Graph extends React.Component{
    
    componentDidMount(){
        console.log(this.props);
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