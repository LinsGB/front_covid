import React from 'react'


class Graficos extends React.Component {
    render() {
        return(
        <div>
            <iframe
    src={"http://pussy-dev-dolls.herokuapp.com/public/dashboard/779d984c-1f82-4265-bf8d-b6852e931ba6"+"?cpf="+this.props.match.params.cpf}
    frameborder="0"
    width="800"
    height="600"
    allowtransparency
></iframe>
        </div>
        )
    }
}

export default Graficos;