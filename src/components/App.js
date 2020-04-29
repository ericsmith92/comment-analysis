import React from 'react';
import { Router, Route } from 'react-router-dom';
import SearchBar from './SearchBar';
import Graph from './Graph';
import history from '../history';

const App = () => {
    return(
        <div className="ui container">
            <Router history={history}>
                <Route path="/" exact component={SearchBar} />
                <Route path="/analysis" exact component={Graph} />
            </Router>
        </div>
    )
}

export default App;