import React from "react"
import Add from "./Add"
import List from "./List"

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = { form: {
            addLog: false,
        }}
        this.toggleAdd = this.toggleAdd.bind(this)
    }

    toggleAdd() {
        this.setState({ addLog: !this.state.addLog })
    }

    render() {
        return (
            <div className="ink-grid">
                <header className="clearfix vertical-padding">
                    <h1 className="logo xlarge-push-left large-push-left">
                        FreshDucks
                    </h1>
                </header>
                { this.state.addLog &&
                    <Add close={this.toggleAdd} />
                }
                { !this.state.addLog &&
                    <div>
                        <button className="ink-button green push-right" onClick={this.toggleAdd}>Add New Log</button>
                        <div className="clearfix padding" />
                        <List />
                    </div>
                }
            </div>
        )
    }
}

export default App