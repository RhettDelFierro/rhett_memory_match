import React, { PropTypes, Component } from "react"
import { container } from './styles.css'


//remember to use refs you must use a container component, it will not take a functional component.
class HomeBackground extends Component {
    constructor(){
        super()
        this.parallax = this.parallax.bind(this)
    }

    parallax() {
        console.log(this.parallaxNode.style.top)
        this.parallaxNode.style.top = `${this.props.bgTop}px`
    }

    componentDidMount() {
        window.addEventListener('scroll', this.parallax);
        //console.log(this.imageNode)
        //this.props.setHomeImagesTop({homeImagesTop: this.imageNode().offsetTop})
        //this.props.setHomeImagesBottom({homeImagesBottom: this.imageNode().offsetTop + this.imageNode().offsetHeight})

    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.parallax);
    }

    render() {
        return (
            <div ref={(ref) => this.parallaxNode = ref} className={container}>
            </div>
        )
    }

}

const { number } = PropTypes
HomeBackground.propTypes = {
    bgTop: number.isRequired
}

export default HomeBackground