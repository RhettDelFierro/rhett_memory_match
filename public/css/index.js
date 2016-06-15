var styles = {
    header: {
        display: "flex",
        background: "#0000",
        paddingTop: "18px",
        justifyContent: "space-around",
        flexFlow: "row wrap"
    },
    child: {
        flexGrow: "1"
    },
    ul: {
        listStyleType: "none",
        display: "flex",
        flexFlow: "row wrap",
        width: "400px",
        margin: "0",
        padding: "0"
    },
    ul_li: {
        flexGrow: "1",
        textAlign: "center",
        width: "100px"
    },
    linkText: {
        color: "#ffff",
        fontSize: ".9em",
        textTransform: "uppercase"
    },
    a_hover: {
      color: "gray"
    }
};

module.exports = styles;