import React from "react"
import Info from "../components/Info"

const InfoContainer = React.createClass({
    render (){
        return(
            <Info onPlayTarget={this.props.onPlayTarget}/>
        )
    }
});

export default InfoContainer