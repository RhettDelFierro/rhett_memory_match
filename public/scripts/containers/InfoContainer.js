var React = require("react");
var Info = require("../components/Info");

var InfoContainer = React.createClass({
    render: function(){
        return(
            <Info onPlayTarget={this.props.onPlayTarget}/>
        )
    }
});

module.exports = InfoContainer;