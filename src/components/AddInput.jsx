import React from "react"

class AddInput extends React.Component {
    constructor(props) {
      super(props)
    }

    render() {
        return (
            <div className="control-group">
                <label htmlFor={this.props.name}>{ this.props.label }</label>
                <div className="control prepend-symbol">
                    <span>
                        <input
                            type={this.props.type}
                            id={this.props.name}
                            name={this.props.name}
                            value={this.props.value}
                            min={this.props.min}
                            onChange={this.props.onChange}
                            required />
                        <i className={"fas fa-" + this.props.icon}></i>
                    </span>
                </div>
            </div>

        )
    }
}

export default AddInput