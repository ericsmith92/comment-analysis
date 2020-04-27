import React from 'react';

class SearchBar extends React.Component{

    handleSubmit = (e) => {
        e.preventDefault();
        const videoId = e.target[0].value.split('v=')[1].trim();

        console.log(videoId);
    }

    render(){
        return(
            <div>
                <div className="ui segment">
                    <form className="ui form" onSubmit={this.handleSubmit}>
                        <div className="field">
                            <label>Get Comments</label>
                            <input type="text" placeholder="Paste Video URL..." />
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default SearchBar;