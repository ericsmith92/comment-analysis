import React from 'react';
import { connect } from 'react-redux';
import { emptyState } from '../actions';

const BackButton = ({emptyState}) => {
    return(
        <div>
            <button onClick={emptyState} className={'ui button primary'}>
                <i className="chevron circle left icon"></i> 
                Back
            </button>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return { emptyState: () => dispatch(emptyState()) };
}

export default connect(null,mapDispatchToProps)(BackButton);