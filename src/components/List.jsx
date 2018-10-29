import React from "react"

class List extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            logs: []
        }
    }

    componentDidMount() {
        this.setState({ isLoading: true });

        fetch("/logs")
            .then(response => response.json())
            .then(data => this.setState({ logs: data, isLoading: false }));
    }

    render() {
        return (
            <div>
                { this.state.isLoading &&
                    <div className="fa-3x align-center">
                        <i className="fas fa-circle-notch fa-spin"></i>
                    </div>
                }
                { !this.state.isLoading &&
                    <table className="ink-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th># of Ducks</th>
                                <th>Food</th>
                                <th>Location</th>
                                <th>Repeat</th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.state.logs.map(function(data, i) {
                                return(
                                    <tr key={i}>
                                        <td>{ data.date }</td>
                                        <td className="align-center">{ data.number }</td>
                                        <td className="align-center">{ data.weight }g of { data.food }</td>
                                        <td className="align-center">{ data.where }</td>
                                        <td className="align-center">{ data.repeat ? 'true' : 'false' }</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                }
            </div>
        )
    }
}

export default List