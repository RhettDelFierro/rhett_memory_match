var React = require("react");

var styles = {
    alignSelf: "center",
    display: "flex",
    width: "75%",
    height: "10%",
    marginTop: "0px",
    flexDirection: "column",
    //background: "linear-gradient(541deg, rgb(52, 71, 175), rgba(255, 255, 255, 0))"
    background: "radial-gradient(rgb(52, 71, 175), rgba(255, 255, 255, 0))"

};

function Info(props) {
    return (
        <div style={styles}>
            <p style={{alignSelf: "center"}}>Score!</p>
        </div>
    )
}

module.exports = Info;