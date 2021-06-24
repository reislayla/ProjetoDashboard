import {Cell, Pie, PieChart} from "recharts";
import React, {Component} from "react";
import axios from "axios";


export default class ChartPie extends Component {
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
          <PieChart
            width={width}
            height={height}
            style={style}
            onClick={onClick}
            className={className} >
            {columns.map(function(columnName){
              //First render
              if (xaxis === null){
                return <Pie
                  data={data}
                  cx={250}
                  cy={150}
                  label={columns[0]}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey={columns[0]}
                >
                  {
                    data.map((entry, index) => <Cell key={`cell-${index}`} fill={selectedYaxisColor} />)
                  }
                </Pie>}
              else {
                return <Pie
                  data={data}
                  cx={250}
                  cy={150}
                  label={xaxis}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey={xaxis}
                >
                  {
                    data.map((entry, index) => <Cell key={`cell-${index}`} fill={selectedYaxisColor} />)
                  }
                </Pie>}

            })
            }
          </PieChart> :
          <PieChart
            width={width}
            height={height}
            style={style}
            onClick={onClick}
            className={className} >
            {columns.map(function(columnName){
              //First render
              if (xaxis === null){
                return <Pie
                  data={tableData}
                  cx={200}
                  cy={150}
                  label={columns[0]}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey={columns[0]}
                >
                  {
                    tableData.map((entry, index) => <Cell key={`cell-${index}`} fill={selectedYaxisColor} />)
                  }
                </Pie>}
              else {
                return <Pie
                  data={tableData}
                  cx={200}
                  cy={150}
                  label={xaxis}
                  outerRadius={80}
                  fill={"#8884d8"}
                  dataKey={xaxis}
                >
                  {
                    tableData.map((entry, index) => <Cell key={`cell-${index}`} fill={selectedYaxisColor} />)
                  }
                </Pie>}

            })
            }
          </PieChart>
        }
      </div>
    )
  }
}





