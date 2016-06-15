var React = require('react');
var NavigationBarContainer = require("./NavigationBarContainer");

var styles = {
  container: {
      height: "100%"
  }
};

var MainContainer = React.createClass({
    render: function(){
        return (
        <div style={styles.container}>
            <NavigationBarContainer />
            {this.props.children}
        </div>
        )
    }
});

module.exports = MainContainer;