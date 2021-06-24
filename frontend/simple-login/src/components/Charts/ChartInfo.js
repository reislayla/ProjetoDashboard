import React, { Component } from 'react';
import { Button } from 'antd';
import axios from 'axios';

//Individual information for each chart (View button)
class ChartInfo extends Component {
    constructor(props) {
        super(props);

        this.state = { chart: [] };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        
        axios.get(`http://localhost:3000/api/charts/${params.chartId}`)
        .then(({data}) => {
            const chart = data.results[0];

            console.log("Chart information: ", chart)
            console.log("Chart name: ", chart.name);
            this.setState ({
                chart: chart
              }); 
            });
    }

    //Remove chart (to be configured)
    handleDelete() {
        const { match: { params } } = this.props;
        axios.delete(`http://localhost:3000/api/charts/${params.chartId}`)
        .then(() => {
            console.log('Chart deleted');
        });
    }

    //Close page 
    handleClose(e) {
        e.preventDefault();
        console.log('Back to charts.');
        this.props.history.push('/charts');
    }

    render() {
        const { chart } = this.state;

        return (
            <div className="border">
                <div className="p-3">
                    <p>Name: {chart.name}</p>
                    <p>Description: {chart.description}</p>
                    <p>Chart_Type: {chart.chart_type}</p>
                    <Button onClick={this.handleClose}>Close</Button>
                    
                    {/* To be configured */}
                    {/*<Button onClick={this.handleClose}>Delete</Button>*/}
                    {/*<Button onClick={this.handleClose}>Save</Button>*/}
                </div>
            </div>
        )
    }
}

export default ChartInfo;
