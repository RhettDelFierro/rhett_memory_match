import React from "react"

const styles = {
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
        <div style={styles} onClick={props.onPlayTarget}>
            <p style={{alignSelf: "center"}}>Score!</p>
        </div>
    )
}

export default Info;