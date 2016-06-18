//will contain <StudentFormContainer> <TableContainer>
var React = require("react");
var Home = require("../components/Home");
var PropTypes = React.PropTypes;
var update = require("react-addons-update");

var HomeContainer = React.createClass({
    render: function () {
        return (
            <Home />
        )
    }
});

module.exports = HomeContainer;