import React, { Component } from "react";
//import Rechart from './Rechart'
import { Form, Select, BackTop } from 'antd';
import { ChromePicker } from 'react-color';
import '../../styles/App.css';
import ChartBar from "../Bar";
import ChartLine from "../Line";
import ChartArea from "../Area";
import ChartScatter from "../Scatter";
import ChartPie from "../Pie";
import ChartConfig from "../ChartConfig";

export default class ChartWizard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xaxis: null,
      showColorPicker: false,
      yaxisProperties: {},
      selectedYaxis: null,
      chartType: null,
      selectedYaxisColor: '#8884d8',
      configuracao: null
    };
    this.handleXAxis = this.handleXAxis.bind(this);
    this.handleYAxis = this.handleYAxis.bind(this);
    this.handleColor = this.handleColor.bind(this);
    this.handleConfig = this.handleConfig.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps do ChartWizard', nextProps);
  }

  //X Axis
  handleXAxis(e) {
    this.setState({
      xaxis: e
    })
  }

  //Y Axis
  handleYAxis(e) {
    this.setState({
      selectedYaxis: e,
      showColorPicker: true,
    })
    console.log("Y Axis: ", this.state.selectedYaxis)
  }

  //Chrome Picker Handle Color
  handleColor(e) {
    //Asign the y axis to a chosen color
    this.setState((prevState) =>({
      selectedYaxisColor: e.hex,
      yaxisProperties: Object.assign(prevState.yaxisProperties, {[this.state.selectedYaxis]: this.state.selectedYaxisColor})
    }))
  }

  handleType(e) {
    console.log("handleType");
    console.log("Wizard - Chart Type: ", this.state.chartType);
    this.setState({
      chartType: e,
    });
  }

  // const handleType = async (e) => {
  //   let promise = new Promise(() => {
  //     setTimeout(() => {
  //       this.setState({chartType: e});
  //     }, 2000)
  //   });
  //
  //   let result = await promise
  //
  //   alert(result);
  // }

  //Chart configuration (X Axis, Y Axis and respetive color(s), Chart type)
  //Received from Rechart
  async handleConfig(e)
  {
    await this.handleType(e);
    this.setState({
      configuracao: {
        yaxisProperties: this.state.yaxisProperties,
        xaxis: this.state.xaxis,
        chartType: this.state.chartType
      }

    })

    console.log("handleConfig");

    console.log("CONFIGURACAO FINAL: ", this.state.configuracao)


    //Send to ChartForm.js to be saved (Button Submit)
    this.props.handleConfigure(this.state.configuracao)
  }


  render() {

    //props from ChartForm
    const { tableData } = this.props;

    //states
    const { xaxis, selectedYaxisColor, showColorPicker, chartType, selectedYaxis, yaxisProperties, configuracao} = this.state;

    // console.log("----------------Wizard-----------------")
    // console.log("Wizard prop xaxis=", xaxis)
    // console.log("Wizard prop tableData", tableData)
    // console.log("Wizard prop color", selectedYaxisColor)
    // console.log("Wizard prop chart Type", chartType)
    // console.log("Wizard props yaxis selected", selectedYaxis)
    // console.log("Wizard props yaxisProperties selected", yaxisProperties)
    // console.log("Wizard props config selected", configuracao)

    //Columns
    const column = tableData[0];
    const columns = [];

    //Populate Select x axis
    for(var key in column){
      if (key !== 'id') {
        columns.push(key);
      }
    }

    return (
      <div>

        {/* BackTop Button */}
        <BackTop />

        {/* Chart Config NavBar */}
        <ChartConfig
          data={tableData}
          showColorPicker={showColorPicker}
          handleColor={this.handleColor}
          handleXAxis={this.handleXAxis}
          handleYAxis={this.handleYAxis}
          xaxis={xaxis}
          selectedYaxisColor={selectedYaxisColor}
          selectedYaxis={selectedYaxis}
        />

        {/* Generate all charts */}
{/*         Send props to Rechart.js
        <Rechart
          handleColorPicker={this.handleColorPicker}
          //chartType={chartType}
          tableData={tableData}
          xaxis={xaxis}
          selectedYaxisColor={selectedYaxisColor}
          selectedYaxis={selectedYaxis}
          yaxisProperties={yaxisProperties}
          handleConfig = {this.handleConfig}
          config={configuracao}
        >
        </Rechart>*/}
        <div className="container-rechart">
          <ChartBar
            height={300}
            width={500}
            data={tableData}
            style={{margin:'10px'}}
            margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
            className="selectChart"
            onClick={(e) => this.handleConfig("1")}
            xaxis={xaxis}
            yaxisProperties={yaxisProperties}
            selectedYaxisColor={selectedYaxisColor}
          />
          <ChartLine
            height={300}
            width={500}
            data={tableData}
            style={{ margin: '10px'}}
            margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
            onClick={(e) => this.handleConfig("2")}
            xaxis={xaxis}
            className="selectChart"
            selectedYaxisColor={selectedYaxisColor}
          />
          <ChartArea
            height={300}
            width={500}
            data={tableData}
            style={{ margin: '10px'}}
            margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
            onClick={(e) => this.handleConfig("3")}
            xaxis={xaxis}
            className="selectChart"
            selectedYaxisColor={selectedYaxisColor}
          />
          <ChartScatter
            height={300}
            width={500}
            data={tableData}
            style={{ margin: '10px'}}
            margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
            onClick={(e) => this.handleConfig("4")}
            xaxis={xaxis}
            className="selectChart"
            selectedYaxisColor={selectedYaxisColor}
          />
          <ChartPie
            height={300}
            width={500}
            data={tableData}
            style={{ margin: '10px'}}
            margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
            onClick={(e) => this.handleConfig("5")}
            xaxis={xaxis}
            className="selectChart"
            selectedYaxisColor={selectedYaxisColor}
          />
        </div>
      </div>
    );
  }
}
