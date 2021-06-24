import React from "react";
import { ChromePicker } from 'react-color';
import {Form, Select} from "antd";

const ChartConfig = ({data, showColorPicker, handleColor, handleXAxis, xaxis, selectedYaxisColor, selectedYaxis, handleYAxis}) => {

  //Columns
  const column = data[0];
  const columns = [];

  //Populate Select x axis
  for(var key in column){
    if (key !== 'id') {
      columns.push(key);
    }
  }

  return (
    <div>
      <div className="d-flex border mb-5">
        {/* Select XAxis... */}
        <div className="w-25">
          <Form>
            <Form.Item label="X Axis">
              <Select
                value={xaxis}
                onChange={handleXAxis}
              >
                {columns.map(function(columnName){
                  return <Select.Option value={columnName}>{columnName}</Select.Option>
                })}
              </Select>
              <p>XAxis = {xaxis}</p>
            </Form.Item>
          </Form>
        </div>

        {/* Render the chrome picker after Execute button */}
        {/* Improve chrome picker layout */}

        {/* Choose the color */}
        <div className="w-25 ml-5">
          <Form>
            <Form.Item label="Y Axis">
              <Select
                //allowClear
                value={selectedYaxis}
                onChange={handleYAxis}
              >
                {columns.map(function(columnName){
                  if (columnName !== xaxis){
                    return <Select.Option value={columnName}>{columnName}</Select.Option>
                  }
                })}
              </Select>
              <p>YAxis = {selectedYaxis}</p>
            </Form.Item>
          </Form>
        </div>
        <div>
          {showColorPicker && (
            <ChromePicker className="ml-2" color={selectedYaxisColor} onChange={handleColor}/>

          )}
        </div>
      </div>
    </div>
  )
}

export default ChartConfig;