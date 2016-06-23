import React from "react"
import Info from "../components/Info"

const InfoContainer = React.createClass({
    render: function(){
        return(
            <Info onPlayTarget={this.props.onPlayTarget}/>
        )
    }
});

export default InfoContainer