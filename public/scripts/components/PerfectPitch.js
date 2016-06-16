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

function DoubleIncreaseCents(props){
    return (
        <button style={{alignSelf: "center", marginTop: "7%", marginBottom: "7px"}} className="btn btn-lg btn-primary">Double Increase</button>
    )
}

function DoubleDecreaseCents(props){
    return (
        <button style={{alignSelf: "center", marginBottom: "7px"}} className="btn btn-lg btn-primary">Double Decrease</button>
    )
}

function DecreaseCents(props){
    return (
        <button style={{alignSelf: "center", marginBottom: "7px"}} className="btn btn-lg btn-primary">Decrease</button>
    )
}

function IncreaseCents(props){
    return (
        <button style={{alignSelf: "center", marginBottom: "7px"}} className="btn btn-lg btn-primary">Increase</button>
    )
}

function SubmitSound(props){
    return (
        <button style={{alignSelf: "center", marginBottom: "7px"}} className="btn btn-lg btn-primary">Submit Sound</button>
    )
}

function PlaySound(props){
    return (
        <button style={{alignSelf: "center", marginBottom: "7px"}} className="btn btn-lg btn-primary">Play Sound</button>
    )
}


function PerfectPitch(props){
    return (
        <div style={styles.container}>
            <InfoContainer />
            <DoubleIncreaseCents />
            <IncreaseCents />
            <PlaySound />
            <DecreaseCents />
            <DoubleDecreaseCents />
            <SubmitSound />
        </div>
    )
}

module.exports = PerfectPitch;