import React, { PropTypes,Component } from "react"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'redux/modules/users'
import { InfoSection } from 'components'
import { push } from 'react-router-redux'

class InfoSectionContainer extends Component {
    constructor() {
        super();
    }



    render() {
        return (
            <InfoSection {...this.props} />
        )
    }
}

const { func, bool, string } = PropTypes
InfoSectionContainer.propTypes = {
    title: string.isRequired,
    image: string.isRequired,
    slide: string.isRequired,
    show: bool.isRequired,
    description: string.isRequired,
    changeRoute: func.isRequired
}

function mapStateToProps({},props) {
    const { title, image, slide, show, description } = props
    return {
        title,
        image,
        slide,
        show,
        description
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changeRoute: (url) => dispatch(push(url)),
        dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoSectionContainer)