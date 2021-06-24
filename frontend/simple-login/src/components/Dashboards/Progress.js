import React from 'react';
import 'antd/dist/antd.css';
import '../../styles/App.css';
import 'ant-design-pro/dist/ant-design-pro.css';
import { MiniProgress } from 'ant-design-pro/lib/Charts';


const Progress = () => { 

    return (
    <div>
        <h3>Progress Chart</h3>
        <MiniProgress percent={78} strokeWidth={8} target={80} />
    </div>
    )
}

export default Progress;