import React, {Component} from "react";
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";
import '../styles/index.css';
import '../styles/App.css';
import { Menu, Layout } from 'antd';
import Home from './Home';
import Logout from './Logout';
//import Login from './Login';
import withAuth from '../withAuth';
import { ReactComponent as ChartLogo } from '../assets/images/chart.svg';
import Cookies from 'js-cookie';
import Charts from './Charts';
//import ChartAdd from './Charts/ChartAdd';
import ChartAdd from '../components/Charts/ChartForm';
import ChartInfo from '../components/Charts/ChartInfo';
import Line from '../components/Dashboards/Line';
import Strategic from '../components/Dashboards/Strategic';
import Progress from '../components/Dashboards/Progress';
import Pies from '../components/Dashboards/Pie';
import Dashboard from './Dashboard';
import MediaQuery from 'react-responsive'
import { 
  HomeOutlined, 
  LogoutOutlined,
  MenuFoldOutlined,
  UserOutlined,
  LineChartOutlined } from '@ant-design/icons';


const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const logout = () => () => {
  Cookies.remove("loggedIn");
  Cookies.remove("token");
}

export default class NavBar extends Component {
  state = {
    theme: 'dark',
    current: '1',
    collapsed: false
  };

  //Configurar dark theme [in progress]
  changeTheme = value => {
    this.setState({
      theme: value ? 'dark' : 'light',
    });
  };

  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

render() {
  if(Cookies.get('token')) { //Its working. Fix login undefined. 
    return (
      <Router>
        <Layout style={{ minHeight: "100vh" }}>
        <MediaQuery minWidth={992}>
          <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}         
          >
            <div className="logo"><ChartLogo /></div>           
            <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
              <Menu.Item key="1">
                <HomeOutlined />
                <span>Home</span>
                <Link to="/" />
              </Menu.Item>
              <Menu.Item key="2">
                <LineChartOutlined />
                <span>Dashboard</span>
                <Link to="/dashboard" />
              </Menu.Item>
                {/*<SubMenu key="sub1" icon={<LineChartOutlined />} title="Dashboards">
                <Menu.Item key="1.1">General<Link to="/dashboard" /></Menu.Item>
                  <Menu.Item key="1.2">Strategic<Link to="/line" /></Menu.Item>
                  <Menu.Item key="1.3">Operational<Link to="/bar" /></Menu.Item>
                  <Menu.Item key="1.4">Analytical<Link to="/progress" /></Menu.Item>
                  <Menu.Item key="1.5">Tactical<Link to="/pie" /></Menu.Item>
              </SubMenu>*/}
              <Menu.Item key="3">
              <UserOutlined />
                <span>Charts</span>
                <Link to="/charts" />
              </Menu.Item>
              <Menu.Item key="5" onClick={logout()}>
              <LogoutOutlined />
                <span>Logout</span>
                <Link to="/logout" />
              </Menu.Item>
            </Menu>
          </Sider>
          </MediaQuery>
          <MediaQuery maxWidth={992}>
          <Sider
            collapsible
            collapsed={true}
            onCollapse={this.onCollapse} 
        
          >
            <div className="logo"><ChartLogo /></div>           
            <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
              <Menu.Item key="1">
                <HomeOutlined />
                <span>Home</span>
                <Link to="/" />
              </Menu.Item>
              <Menu.Item key="2">
                <LineChartOutlined />
                <span>Dashboard</span>
                <Link to="/dashboard" />
              </Menu.Item>
{/*                <SubMenu key="sub1" icon={<LineChartOutlined />} title="Dashboards">
                <Menu.Item key="1.1">General<Link to="/dashboard" /></Menu.Item>
                  <Menu.Item key="1.2">Strategic<Link to="/line" /></Menu.Item>
                  <Menu.Item key="1.3">Operational<Link to="/bar" /></Menu.Item>
                  <Menu.Item key="1.4">Analytical<Link to="/progress" /></Menu.Item>
                  <Menu.Item key="1.5">Tactical<Link to="/pie" /></Menu.Item>
              </SubMenu>*/}
              <Menu.Item key="3">
              <UserOutlined />
                <span>Charts</span>
                <Link to="/charts" />
              </Menu.Item>
              <Menu.Item key="5" onClick={logout()}>
              <LogoutOutlined />
                <span>Logout</span>
                <Link to="/logout" />
              </Menu.Item>
            </Menu>
          </Sider>
          </MediaQuery>
          <Layout>
            <Header style={{ background: "#fff", padding: 0, paddingLeft: 16 }}>
            <MenuFoldOutlined
                className="trigger"
                type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
                style={{ cursor: "pointer" }}
                onClick={this.toggle}
              />
            </Header>
            <Content
              style={{
                margin: "24px 16px",
                padding: 24,
                background: "#fff",
                minHeight: 280
              }}
            >
              <Switch>
                <Route path="/" exact component={withAuth(Home)} />
                <Route path="/dashboard" exact component={withAuth(Dashboard)} />
               {/* <Route path="/line" exact component={withAuth(Line)} />
                <Route path="/bar" exact component={withAuth(Strategic)} />
                <Route path="/progress" exact component={withAuth(Progress)} />
                <Route path="/pie" exact component={withAuth(Pies)} />*/}
                <Route exact path="/charts/new" component={withAuth(ChartAdd)} />
                <Route exact path="/charts/:chartId" component={withAuth(ChartInfo)} />
                <Route path="/charts" component={withAuth(Charts)} />
                <Route path="/logout" component={Logout} />
              </Switch>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              Feralbyte ©2020
            </Footer>
          </Layout>
        </Layout>
      </Router>
  )} else {
    return <Redirect to="/login" />;
      } 
    }
  }

