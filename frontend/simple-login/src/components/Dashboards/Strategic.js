import React from 'react';
//import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import '../../styles/App.css';
import 'ant-design-pro/dist/ant-design-pro.css';
import { Bar } from 'ant-design-pro/lib/Charts';


const Bars = () => { 

    const salesData = [];
    for (let i = 0; i < 12; i += 1) {
    salesData.push({
    x: `${i + 1}month`,
    y: Math.floor(Math.random() * 1000) + 200,
    });
    }


    return <Bar height={200} title="Bar Chart" data={salesData} />;

}

export default Bars;
