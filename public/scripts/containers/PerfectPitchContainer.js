var React = require("react");
var PerfectPitch = require("../components/PerfectPitch");

var PerfectPitchContainer = React.createClass({
    //ajax call to get audio.
    //increase and decrease cents.
    //play audio.
    handleControl: function(type){
        //increase cents from here.
    },
    handlePlay: function(){

    },
    handleSubmit: function(){

    },
    render: function(){
        return (
            <PerfectPitch />
        )
    }
});

module.exports = PerfectPitchContainer;