import React from 'react';
import { Router, Route } from 'react-router-dom';
import SearchBar from './SearchBar';
import Results from './Results';
import history from '../history';

const App = () => {
    return(
        <div className="ui container">
            <Router history={history}>
                <Route path="/" exact component={SearchBar} />
                <Route path="/analysis" exact component={Results} />
            </Router>
        </div>
    )
}

export default App;