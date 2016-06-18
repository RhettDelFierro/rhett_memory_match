var React = require("react");
var InfoContainer = require("../containers/InfoContainer");
var styles = {
    container: {
        backgroundSize: 'cover',
        backgroundImage: "url('public/images/coachella.jpg')",
        display: 'flex',
        flexDirection: 'column',
        //justifyContent: 'center',
        //alignItems: 'center',
        height: '100%',
        width: '100%',
        marginTop: "-20px"
    }
};

var DoubleIncreaseCents = React.createClass({
    updateCents: function () {
        this.props.onControl(66)
    },
    render: function () {
        return (
            <button onClick={this.updateCents} style={{alignSelf: "center", marginBottom: "7px", marginTop: "7%"}}
                    className="btn btn-lg btn-primary">Double Increase</button>
        )
    }
});

var DoubleDecreaseCents = React.createClass({
    updateCents: function () {
        this.props.onControl(-66)
    },
    render: function () {
        return (
            <button onClick={this.updateCents} style={{alignSelf: "center", marginBottom: "7px"}}
                    className="btn btn-lg btn-primary">Double Decrease</button>
        )
    }
});

var DecreaseCents = React.createClass({
    updateCents: function () {
        this.props.onControl(-33)
    },
    render: function () {
        return (
            <button onClick={this.updateCents} style={{alignSelf: "center", marginBottom: "7px"}}
                    className="btn btn-lg btn-primary">Decrease</button>
        )
    }
});

var IncreaseCents = React.createClass({
    updateCents: function () {
        this.props.onControl(33)
    },
    render: function () {
        return (
            <button onClick={this.updateCents} style={{alignSelf: "center", marginBottom: "7px"}}
                    className="btn btn-lg btn-primary">Increase</button>
        )
    }
});


function SubmitSound(props) {
    return (
        <button style={{alignSelf: "center", marginBottom: "7px"}} className="btn btn-lg btn-primary">Submit
            Sound</button>
    )
}

function PlaySound(props) {
    return (
        <button onClick={props.onPlayStarting} style={{alignSelf: "center", marginBottom: "7px"}}
                className="btn btn-lg btn-primary">Play Sound</button>
    )
}


function PerfectPitch(props) {
    return (
        <div style={styles.container}>
            <InfoContainer onPlayTarget={props.onPlayTarget}/>
            <DoubleIncreaseCents onControl={props.onControl}/>
            <IncreaseCents onControl={props.onControl}/>
            <PlaySound onPlayStarting={props.onPlayStarting}/>
            <DecreaseCents onControl={props.onControl}/>
            <DoubleDecreaseCents onControl={props.onControl}/>
            <SubmitSound />

            <iframe src="https://embed.spotify.com/?uri=spotify%3Atrack%3A33Q6ldVXuJyQmqs8BmAa0k" width="300"
                    height="80" frameborder="0" allowtransparency="true"
                    style={{alignSelf: "center", marginTop: "7%"}}></iframe>
        </div>
    )
}

module.exports = PerfectPitch;