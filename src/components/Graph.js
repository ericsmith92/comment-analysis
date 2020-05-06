import React from 'react';
import { connect } from 'react-redux';

class Graph extends React.Component{
    
    componentDidUpdate(){
        if(this.props.widthAndHeight.length){
            console.log(this.props.widthAndHeight);
        }
    }

    render(){
        if(!this.props.widthAndHeight.length){
            return <div>Loading...</div>
        }else{
            console.log(this.props.widthAndHeight[0][0]);
            return(
                <div style={{background: 'pink', width: `${this.props.widthAndHeight[0][0]}px`, height: `${this.props.widthAndHeight[0][1]}px`}}></div>
            )
        }
    }
}


const mapStateToProps = state => {
    return { scores: state.scores, widthAndHeight: state.widthAndHeight };
}

export default connect(
    mapStateToProps)(Graph);