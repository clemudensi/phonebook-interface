/**
 * Created by SLEEK on 12/10/2017.
 */
import React from 'react';

class Dialer extends React.Component{
    render(){
        return(
            <div>
                <button onClick={this.props.dialerAction.bind(this)}>Dialer</button>
            </div>
        )
    }
}

export default Dialer;