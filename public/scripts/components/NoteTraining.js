var React = require("react");

var PlayD = React.createClass({
    playD: function(){
      this.props.onPlayNote("D4");
    },
    render: function() {
        return <button className="btn btn-lg btn-primary" onClick={this.playD}>Testing D</button>
    }
});

function NoteTraining(props){
    return (
        <PlayD onPlayNote={props.onPlayNote}/>
    )
}

module.exports = NoteTraining;