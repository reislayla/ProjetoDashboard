import React, { Component } from 'react';
import 'antd/dist/antd.css';
import '../../styles/App.css';
import {Table} from 'antd';
import Column from 'antd/lib/table/Column';

class TableInfo extends Component {
  
  componentWillReceiveProps(nextProps) {
    console.log('Table Info: ', nextProps);
  }

    render() {

      const { tableData } = this.props;
      const column = tableData[0];
      const columns = [];
      for(var key in column){
        columns.push(key);
      } 

      return (
      <div>
        {/* Render table from user query */}
        <Table dataSource={tableData} rowKey="id">
          {columns.map(function(columnName){
            return <Column columnKey={columnName} title={columnName[0].toUpperCase() + columnName.slice(1)} dataIndex={columnName}></Column>
          })}
        </Table>
        </div>
      )
    }
  }
  
export default TableInfo;

