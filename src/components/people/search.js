/**
 * Created by SLEEK on 12/22/2017.
 */
import React from 'react';

class Search extends React.Component{

    render(){
        return(
            <input onChange={ this.props.searchContacts }
                   placeholder="Search" type="text"
                   className="form-control"
                   aria-label="Search Appointments"
                   value={this.props.value} />
        )
    }
}

export default Search;