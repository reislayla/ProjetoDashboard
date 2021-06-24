import React, {Component} from 'react';
import axios from 'axios';
import ChartForm from './ChartForm';

class ChartAdd extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    // Submit chart with Infos from ChartForm.js 
    handleSubmit(chart) {
       
        console.log("Chart to add: ", chart);

        axios.post('http://localhost:3000/api/charts', chart,
            { 
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(({data: u}) => {
                console.log('Chart added: ', chart);
                const { history } = this.props;
                history.push('/charts');
            });
    }



    //Chart Form 
    render() {
        return (
        <ChartForm handleSubmit={this.handleSubmit} handleCancel={this.handleCancel}/>
        );
    }
}

export default ChartAdd;