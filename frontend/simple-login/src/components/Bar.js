import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";
import React, {Component} from "react";
import axios from "axios";


export default class ChartBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      tableData: []
    };
    this.handleQuery = this.handleQuery.bind(this)
  }

  componentDidMount() {
    const query = this.props.chart ? this.props.chart['query'] : null;
    this.handleQuery(query);
  }

  handleQuery(myQuery) {
    const query = myQuery;
    axios.post('http://localhost:3000/api/newChart', {query}
      )
      .then(({data}) => {
        const answer = data.results;
        this.setState({
          tableData: answer,
        })
      });
  }

  render() {
    const { tableData } = this.state
    const { style, height, width, data, className, onClick, margin, xaxis, yaxisProperties,
      selectedYaxisColor } = this.props

    //Get Columns name
    const column = data ? data[0] : tableData[0];
    const columns = [];
    for(const key in column){
      if (key !== 'id') {
        columns.push(key);
      }
    }

/*    console.log("--------------DASHBOARD BAR CHART--------------")
    console.log("style", style)
    console.log("height", height)
    console.log("width", width)
    console.log("data", data)
    console.log("className", className)
    console.log("onClick", onClick)
    console.log("margin", margin)
    console.log("xaxis", xaxis)
    console.log("yaxisProperties", yaxisProperties)
    console.log("selectedYaxisColor", selectedYaxisColor)*/

    return (
    <div>
      {data ?
        <BarChart
        width={width}
        height={height}
        margin={margin}
        data={data}
        style={style}
        className={className}
        onClick={onClick}
      >
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey={xaxis}/>
        <YAxis/>
        <Tooltip/>
        <Legend/>
        {columns.map(function (columnName) {
          if (columnName !== xaxis && yaxisProperties[columnName]) {
            return <Bar dataKey={columnName} fill={yaxisProperties[columnName]}/>;
          } else {
            if (columnName !== xaxis) {
              return <Bar dataKey={columnName} fill={selectedYaxisColor}/>
            }
          }
        })}
      </BarChart> :
      <BarChart
        width={width}
        height={height}
        margin={width}
        data={tableData}
        style={style}
        className={className}
        onClick={onClick}
      >
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey={xaxis}/>
        <YAxis/>
        <Tooltip/>
        <Legend/>
        {columns.map(function (columnName) {
          if (columnName !== xaxis && yaxisProperties[columnName]) {
            return <Bar dataKey={columnName} fill={yaxisProperties[columnName]}/>;
          } else {
            if (columnName !== xaxis) {
              return <Bar dataKey={columnName} fill={selectedYaxisColor}/>
            }
          }
        })}
      </BarChart>
      }
    </div>
  )
  }
}



