import React from 'react'

class MyButton extends React.Component {
    render() {
        return <button id={this.props.id} disabled={this.props.disabled} onClick={this.props.onClick}>{this.props.label}</button>
    }
}

export default MyButton