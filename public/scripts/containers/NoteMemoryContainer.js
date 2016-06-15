var React = require("react");
var NoteMemory = require("../components/NoteMemory");

var NoteMemoryContainer = React.createClass({
    render: function(){
        return (
            <NoteMemory />
        )
    }
});

module.exports = NoteMemoryContainer;