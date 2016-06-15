var React = require('react');
var HomeContainer = require("./HomeContainer");

var styles = {
  container: {
      height: "100%"
  }
};

var MainContainer = React.createClass({
    render: function(){
        return (
        <div style={styles.container}>
            {this.props.children}
        </div>
        )
    }
});

module.exports = MainContainer;