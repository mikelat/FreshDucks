import React from "react"
import AddInput from "./AddInput"

class Add extends React.Component {
    constructor(props) {
        super(props)

        this.state = { form: {
            time: "",
            where: "",
            food: "",
            number: 0,
            weight: 0,
            repeat: false,
        }}

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        let newForm = this.state.form
        if(event.target.type == "checkbox") {
            newForm[event.target.name] = !!event.target.checked
        }
        else {
            newForm[event.target.name] = event.target.value
        }
        this.setState({ form: newForm })
    }

    handleSubmit(event) {
        fetch("/logs", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state.form)
        })
        .then(this.props.close)
        event.preventDefault()
    }

    render() {
        return (
            <div>
            <h4>Create Log Entry</h4>
                <form className="ink-form" onSubmit={this.handleSubmit}>
                    <AddInput
                        name="time"
                        type="time"
                        icon="clock"
                        label="Time ducks were fed"
                        value={this.state.form.time}
                        onChange={this.handleChange} />
                    <AddInput
                        name="where"
                        type="text"
                        icon="map-marker"
                        label="Where ducks were fed"
                        value={this.state.form.where}
                        onChange={this.handleChange} />
                    <AddInput
                        name="number"
                        type="number"
                        icon="coins"
                        min="0"
                        label="How many ducks were fed"
                        value={this.state.form.number}
                        onChange={this.handleChange} />
                    <AddInput
                        name="food"
                        type="text"
                        icon="apple-alt"
                        label="Food ducks were fed"
                        value={this.state.form.food}
                        onChange={this.handleChange} />
                    <AddInput
                        name="weight"
                        type="number"
                        icon="weight-hanging"
                        min="0"
                        label="How much food ducks were fed (in grams)"
                        value={this.state.form.weight}
                        onChange={this.handleChange} />
                    <ul className="control unstyled">
                        <li>
                            <input type="checkbox" id="repeat" name="repeat" value="1" checked={this.state.form.repeat} onChange={this.handleChange} />
                            <label htmlFor="repeat"> Repeat this log entry every day</label>
                        </li>
                    </ul>
                    <button className="ink-button red push-left" onClick={this.props.close}>Cancel</button>
                    <button type="submit" className="ink-button green push-right">Submit</button>
                    <div className="clearfix padding" />
                </form>
            </div>
        )
    }
}

export default Add