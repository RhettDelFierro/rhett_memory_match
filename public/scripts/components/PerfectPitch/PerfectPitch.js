import React, { Component } from "react"
import InfoContainer from "scripts/containers"

const styles = {
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

class DoubleIncreaseCents extends Component {
    constructor() {
        super()
    }

    updateCents() {
        this.props.onControl(66)
    }

    render() {
        return (
            <button onClick={() => this.updateCents()}
                    style={{alignSelf: "center", marginBottom: "7px", marginTop: "7%"}}
                    className="btn btn-lg btn-primary">Double Increase</button>
        )
    }
}

class DoubleDecreaseCents extends Component {
    constructor() {
        super()
    }

    updateCents() {
        this.props.onControl(-66)
    }

    render() {
        return (
            <button onClick={() => this.updateCents()} style={{alignSelf: "center", marginBottom: "7px"}}
                    className="btn btn-lg btn-primary">Double Decrease</button>
        )
    }
}

class DecreaseCents extends Component {
    constructor() {
        super()
    }

    updateCents() {
        this.props.onControl(-33)
    }

    render() {
        return (
            <button onClick={() => this.updateCents()} style={{alignSelf: "center", marginBottom: "7px"}}
                    className="btn btn-lg btn-primary">Decrease</button>
        )
    }
}

class IncreaseCents extends Component {
    constructor() {
        super()
    }

    updateCents() {
        this.props.onControl(33)
    }

    render() {
        return (
            <button onClick={() => this.updateCents()} style={{alignSelf: "center", marginBottom: "7px"}}
                    className="btn btn-lg btn-primary">Increase</button>
        )
    }
}


function SubmitSound({onSubmitNote}) {
    return (
        <button onClick={onSubmitNote} style={{alignSelf: "center", marginBottom: "7px"}}
                className="btn btn-lg btn-primary">Submit
            Sound</button>
    )
}

function PlaySound({onPlayStarting}) {
    return (
        <button onClick={onPlayStarting} style={{alignSelf: "center", marginBottom: "7px"}}
                className="btn btn-lg btn-primary">Play Sound</button>
    )
}

function InTesting({onPlayTarget, onControl, onPlayStarting, onSubmitNote}) {
    return (
        <div style={styles.container}>
            <InfoContainer onPlayTarget={onPlayTarget}/>
            <DoubleIncreaseCents onControl={onControl}/>
            <IncreaseCents onControl={onControl}/>
            <PlaySound onPlayStarting={onPlayStarting}/>
            <DecreaseCents onControl={onControl}/>
            <DoubleDecreaseCents onControl={onControl}/>
            <SubmitSound onSubmitNote={onSubmitNote}/>
            <iframe src="https://embed.spotify.com/?uri=spotify%3Atrack%3A33Q6ldVXuJyQmqs8BmAa0k" width="300"
                    height="80" frameborder="0" allowtransparency="true"
                    style={{alignSelf: "center", marginTop: "7%"}}></iframe>
        </div>
    )
}

class TestingComplete extends Component {
    constructor() {
        super();
        this.state = {
            score: 0
        }
    }


    componentDidMount() {
        this.setState({
            score: this.props.score
        })
    }

    handleToTraining() {
        this.context.router.push({
            pathname: "/perfect_pitch_training",
            state: {
                score: this.state.score
            }
        })

    }

    render() {
        return (
            <div style={styles.container}>
                <p style={{color: "#ffffff", alignSelf: "center", marginBottom: "7px"}}>Here is your
                    score: {this.props.score}</p>
                <button className="btn btn-lg btn-primary" onClick={() => this.handleToTraining()}>Start Training
                </button>
            </div>
        )
    }
}

TestingComplete.contextTypes = {
    router: React.PropTypes.object.isRequired
};

function PerfectPitch({testingComplete, score, onToTraining, onPlayTarget, onControl, onPlayStarting, onSubmitNote}) {
    return testingComplete === true
        ? <TestingComplete score={score} onToTraining={onToTraining}/>
        : <InTesting onPlayTarget={onPlayTarget} onControl={onControl} onPlayStarting={onPlayStarting}
                     onSubmitNote={onSubmitNote}/>


}

export default PerfectPitch