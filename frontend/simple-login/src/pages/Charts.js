import React, { Component } from 'react';
import { Link } from "react-router-dom";
import 'antd/dist/antd.css';
import '../styles/App.css';
import {Table, Button} from 'antd';
import axios from 'axios';
import { EyeOutlined, DeleteOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';

const { Column } = Table;
const totalPerPage = 10;


//Table with all charts from dashboard table (DB)
class AllCharts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chart: [],
      page:0,
      totalPages: 0,
      selectedRowKeys: []
    };
    this.incrementPage = this.incrementPage.bind(this);
    this.decrementPage = this.decrementPage.bind(this);
    this.setPage = this.setPage.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
   
  componentDidMount() {
      this.getChart();
    }

  componentDidUpdate({location = {} }) {
    if (location.pathname === '/charts' && location.pathname !== this.props.location.pathname) {
      this.getChart();
    }
  }

    
  getChart() {
    axios.get('http://localhost:3000/api/charts')
    .then(({data}) => {
      const chart = data.results;
      console.log("Charts: ", chart);
      console.log("Chart Id: ", chart[0].id);
      const totalPages = Math.ceil(chart.length / totalPerPage);

      //console.log("config", chart[3].config)

      // const configuracao = JSON.parse(chart[3].config);
      // console.log(configuracao)
      // console.log(configuracao.xaxis)

      this.setState ({
        chart: chart,
        page: 0, 
        totalPages,
      });
      console.log("Charts.js - Charts: ", chart);
    })
    .catch( err => {
      console.log('Error: ', err)
    })
  }

  //Table manipulation
  setPage(page) {
    return() => {
      this.setState({page});
    };
  }

  decrementPage() {
    const {page} = this.state;
    this.setState({ page: page - 1 });
  }

  incrementPage() {
    const {page} = this.state;
    this.setState({ page: page + 1});
  }

  //Select the chart to be seen or to be removed 
  onSelectChange = selectedRowKeys => {
    console.log('SelectedRowKeys: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  //Remove chart 
  handleDelete(chartId) {
    const {selectedRowKeys} = this.state;
    console.log("Chart to be removed: ", {selectedRowKeys})
    
    axios.delete('http://localhost:3000/api/charts', {params: {data: selectedRowKeys[0] } });

    this.setState({
      selectedRowKeys: selectedRowKeys.filter(u => u.selectedRowKeys !== chartId),
    });
  }


  render() {

    const { chart, selectedRowKeys } = this.state; //insert page and totalpage
    //const startIndex = page * totalPerPage;
    //Populate Select X Axis

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      selections: [
        Table.SELECTION_ALL,
        Table.SELECTION_INVERT,
        {
          key: 'odd',
          text: 'Select Odd Row',
          onSelect: changableRowKeys => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter((key, index) => {
              if (index % 2 !== 0) {
                return false;
              }
              return true;
            });
            this.setState({ selectedRowKeys: newSelectedRowKeys });
          },
        },
        {
          key: 'even',
          text: 'Select Even Row',
          onSelect: changableRowKeys => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter((key, index) => {
              if (index % 2 !== 0) {
                return true;
              }
              return false;
            });
            this.setState({ selectedRowKeys: newSelectedRowKeys });
          },
        },
      ],
    };

    return (
    <div>
      {/* Chart information */}
      <Link to={`/charts/${selectedRowKeys}`}>
        <Button type="primary" style={{float: 'right'}}><EyeOutlined style={{ display: 'inline-block', verticalAlign: 'middle'}} /></Button>
      </Link>

      {/* Delete chart button */}
        <Button type="danger" onClick={this.handleDelete}><DeleteOutlined style={{ display: 'inline-block', verticalAlign: 'middle' }} /></Button>
      
      {/* Table with all charts*/}
        <Table scroll={{ x: 400 }} rowSelection={rowSelection} dataSource={chart} rowKey="id">
            <Column
              title="Name"
              dataIndex="name"
              className={'w-25'}
              >
            </Column>
          <Column
            title="Description"
            dataIndex="description"
            className={'w-25'}

          />
          <Column
            title="Gender"
            dataIndex="gender"
            className={'w-25'}

          />
          <Column
            title="Chart Type"
            dataIndex="chart_type"
            className={'w-25'}
          />
          <Column
            title="Dashboard"
            dataIndex="visible"
            key="visible"
            className={'w-25'}
            render={
                (record, index) =>
                  (record === 1 ? <p><CheckOutlined /></p>
                    : <p/>)
            }
          />
        </Table>
        <Link to="/charts/new">
          <Button type="primary" style={{ background: "green", borderColor: "green"}}>New Chart</Button> 
        </Link>
  </div>
      )
    }
  }
  
export default AllCharts;  