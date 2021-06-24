
import React from 'react';
//import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import '../../styles/App.css';
import 'ant-design-pro/dist/ant-design-pro.css';
import { Pie, yuan } from 'ant-design-pro/lib/Charts';


const Pies = () => { 

    const salesPieData = [
    {
        x: 'Consultant A',
        y: 4544,
    },
    {
        x: 'Consultant B',
        y: 3321,
    },
    {
        x: 'Consultant C',
        y: 3113,
    },
    {
        x: 'Consultant D',
        y: 2341,
    },
    {
        x: 'Consultant E',
        y: 1231,
    },
    {
        x: 'Consultant F',
        y: 1231,
    },
    ];

return (

<Pie
    hasLegend
    title="Sales"
    subTitle="2020"
    total={() => (
      <span
        dangerouslySetInnerHTML={{
          __html: yuan(salesPieData.reduce((pre, now) => now.y + pre, 0)),
        }}
      />
    )}
    data={salesPieData}
    valueFormat={val => <span dangerouslySetInnerHTML={{ __html: yuan(val) }} />}
    height={294}
  />)

}

export default Pies; 
          