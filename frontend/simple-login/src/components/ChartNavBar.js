import React, { Component} from "react";
import { Menu } from 'antd';
import { BarChartOutlined, AppstoreOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

class ChartNavBar extends Component {
  state = {
    current: 'mail',
  };

  handleClick = e => {
    console.log('click ', e);
    this.setState({ current: e.key });
  };

  render() {
    const { current } = this.state;
    return (
      <Menu onClick={this.handleClick}
            selectedKeys={[current]}
            mode="horizontal"
            style={{
              marginBottom: '15px'
            }}
      >
        <Menu.Item key="app" icon={<BarChartOutlined />}>
          General
        </Menu.Item>
        <Menu.Item key="app" disabled icon={<AppstoreOutlined />}>
          Strategic
        </Menu.Item>
        <Menu.Item key="app" disabled icon={<AppstoreOutlined />}>
          Operational
        </Menu.Item>
        <Menu.Item key="app" disabled icon={<AppstoreOutlined />}>
          Analytical
        </Menu.Item>
        <Menu.Item key="app"disabled icon={<AppstoreOutlined />}>
          Tactical
        </Menu.Item>
      </Menu>
    );
  }
}

export default ChartNavBar;