import React, { Component } from 'react';
import { Form, Button, Input, Select, Checkbox } from 'antd';
import { UserOutlined, FileTextOutlined, ToolOutlined } from '@ant-design/icons';
import TableAdd from './TableAdd';
import axios from 'axios'; 
import TableInfo from './TableInfo';
import ChartWizard from "./ChartWizard";

//Select Dashboard Type 
const { Option } = Select;

// Form to add new chart
class ChartForm extends Component {
    constructor(props) {
        super(props);
        const { chart = {}} = props;
        this.state = { 
            chart,
            visible: false,
            dashvisible: false,
            gender: null,
            query: null,
            config: {}
        };
        this.onGenderChange = this.onGenderChange.bind(this); 
        this.onSetDashVisible = this.onSetDashVisible.bind(this);
        this.handleTable = this.handleTable.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleConfiguracao = this.handleConfiguracao.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    componentWillReceiveProps(nextProps) {
      console.log('componentWillReceiveProps do ChartForm', nextProps);
    }

    //Input values from the form 
    handleChange(e) {
      this.setState({[e.target.name]: e.target.value,
      });
    }

    //Dashboard gender (Strategic, Operational, Analytical, Tactical)
    onGenderChange(e){
      this.setState({
          gender: e
        })
    }

    //Dashboard visibility
    onSetDashVisible(e) {
        this.setState({
            dashvisible: e.target.checked
        })
      console.log("dash visible:", this.state.dashvisible)
    }

    //Configuration received from chartwizard
    //X axis, Y axis, Colors and ChartType 
    handleConfiguracao(configuracao)
    {
        console.log("ChartForm.js configuration: ",  configuracao)
        this.setState({
            config: configuracao,
            chartType: configuracao.chartType
        });
   }


    //Submit and create the chart
    handleSubmit(e) {
        
        var myConfigString = JSON.stringify(this.state.config);
        console.log('ChartForm.js - JSON to save:', myConfigString);

        e.preventDefault();

        const chart = {
            name: this.state.name,
            description: this.state.description,
            query: this.state.query,
            gender:this.state.gender, 
            chartType: this.state.chartType,
            dashvisible:this.state.dashvisible,
            config: myConfigString
        };

        console.log("Final chart: ", chart)

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
            
        //const {handleSubmit} = this.props;
        //handleSubmit(chart);
    }

    // Cancel new chart
    handleCancel(e) {
      e.preventDefault();
      console.log('You have canceled');
      const { history } = this.props;
      history.push('/charts');
    }

    // Database table 
    handleTable(e) {

        console.log("ChartForm.js - Query:", this.state.query)
        e.preventDefault();

        const {name, description, query} = this.state;

        if (name == null || description == null || query == null) {
          alert("All fields are required")
        } else {
          const table = {
            query: this.state.query };
          axios.post('http://localhost:3000/api/newChart', table,
            {
              method: 'POST',
              body: JSON.stringify(this.state),
              headers: {
                'Content-Type': 'application/json'
              }
            })
            .then(({data}) => {
                const table = data.results;
                console.log('Query added: ', table);
                this.setState ({
                  table,
                  visible: true
                })
              }
            );
        }
    }      

    render() {

        //Chart attributes
        const {chart: {name, description, query} } = this.state;

        return (
            <Form >
                <Form.Item
                  label={<label>Name</label>}
                  labelCol={{span:24}}
                  wrapperCol={{span:24}}
                  rules={[
                    { required: true, message: 'Please input the name!' },
                  ]}
              ><Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  type="text"
                  name="name"
                  value={name}
                  onChange={this.handleChange}
                  />
            </Form.Item>
            <Form.Item
              label={<label>Description</label>}
              labelCol={{span:24}}
              wrapperCol={{span:24}}
                rules={[
                 { required: true, message: 'Please input the description!' },
                ]}
                ><Input
                    prefix={<FileTextOutlined className="site-form-item-icon" />}
                    type="text"
                    name="description"
                    value={description}
                    onChange={this.handleChange} />
            </Form.Item>
            <Form.Item
              label={<label>Query</label>}
              labelCol={{span:24}}
              wrapperCol={{span:24}}
                rules={[
                 { required: true, message: 'Please input the query!' },
                ]}
                ><Input
                    prefix={<ToolOutlined  className="site-form-item-icon" />}
                    type="text"
                    name="query"
                    value={query}
                    onChange={this.handleChange} />
            </Form.Item>
            <Form.Item
              label={<label>Dashboard Type</label>}
              labelCol={{span:24}}
              wrapperCol={{span:24}}
                name="dashboard_type"
                rules={[
                    { required: true, message: 'Please select the dashboard type!' },
                ]}
                >
                <Select
                    placeholder="Select the dashboard type"
                    onChange={this.onGenderChange}
                    checked={this.state.gender}
                    allowClear
                >
                    <Option value="Strategic">Strategic</Option>
                    <Option value="Operational">Operational</Option>
                    <Option value="Analytical">Analytical</Option>
                    <Option value="Tactical">Tactical</Option>
                </Select>
            </Form.Item>
            <Form.Item>
                <Checkbox onChange={this.onSetDashVisible}>Set this chart as visible on dashboard?</Checkbox>
            </Form.Item>
            <Form.Item>
                {/*Execute Button for send query to backend*/}
                <TableAdd onClick={this.handleTable} />
            </Form.Item>
            <Form.Item>
                <div className="mt-2">
                    {/*Get query and render table (Child Component TableInfo)*/}
                    {this.state.visible ? <TableInfo tableData={this.state.table} /> : null}
                    {/*Get query and render charts - (Child Component ChartWizard) */}
                    {this.state.visible ? <ChartWizard handleConfigure={this.handleConfiguracao} tableData={this.state.table}/> : null}
                </div>
            </Form.Item>
            <Form.Item className="float-right ">
                {/* Cancel Button */}
                {this.state.visible ? <Button key="2" onClick={this.handleCancel} type="primary" danger>Cancel</Button> : null }
                {/* Save Button */}
                {this.state.visible ? <Button key="1" style={{ background: "green", borderColor: "green", color: "white"}} type="submit" onClick={this.handleSubmit}>Create</Button> : null }
            </Form.Item>
      </Form>
        );
    }
}

export default ChartForm;
