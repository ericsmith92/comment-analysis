import React from 'react';
import { connect } from 'react-redux';

class Graph extends React.Component{
    
    //TODO: create a render function that will build JSX graph from scores + width and height

    labelYAxis(height){
        const maxValue = (height - 10) / 20;
        const values = [];
        for(let i = maxValue; i >= 0; i--){
            values.push(<span key={i}>{i}</span>)
        }

        return values;
    }   

    labelXAxis(){
        const sortedScores = Object.keys(this.props.scores[0]).sort((firstScore, nextScore) => firstScore - nextScore);
        const values = [];
        sortedScores.forEach(score => {
            values.push(<span key={score}>{score}</span>);

        });

        return values;
    }

    buildGraph(){
        const [width, height] = this.props.widthAndHeight[0];
        this.labelXAxis();
        return(
            <div className="graph" style={{width: `${width}px`, height: `${height}px`}}>
                <div className="graph_y">
                    {this.labelYAxis(height)}
                </div>
                <div className="graph_x">
                    {this.labelXAxis()}
                </div>
            </div>
        )
    }

    render(){
        if(!this.props.widthAndHeight.length){
            return <div>Loading...</div>
        }else{
            return this.buildGraph();
        }
    }
}


const mapStateToProps = state => {
    return { scores: state.scores, widthAndHeight: state.widthAndHeight };
}      

export default connect(
    mapStateToProps)(Graph);