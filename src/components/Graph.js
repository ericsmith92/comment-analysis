import React from 'react';
import { connect } from 'react-redux';
import { getWidthAndHeight } from '../actions';

class Graph extends React.Component{
    
    componentDidMount(){
        if(this.props.scores){
            setTimeout(() => { 
                this.props.getWidthAndHeight();
            }, 3000);
        }
    }

    render(){
        console.log(this.props);
        return(
            <div>Graph</div>
        )
    }
}


const mapStateToProps = state => {
    return { scores: state.scores, widthAndHeight: state.widthAndHeight };
}

export default connect(
    mapStateToProps,
    { 
        getWidthAndHeight
})(Graph);