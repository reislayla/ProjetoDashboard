import React, { Component} from "react";
import 'antd/dist/antd.css';
import '../styles/App.css';
import 'ant-design-pro/dist/ant-design-pro.css';
import {Link} from "react-router-dom";
import {Button} from "antd";
import { Row, Col, Divider, Card } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import axios from "axios";
import ChartBar from "../components/Bar";
import ChartLine from "../components/Line";
import ChartNavBar from "../components/ChartNavBar";
import ChartArea from "../components/Area";
import ChartScatter from "../components/Scatter";
import ChartPie from "../components/Pie";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      chart: [],
    };

    this.getChart = this.getChart.bind(this);
    this.renderChart = this.renderChart.bind(this);
  }

  componentDidMount() {
    this.getChart();
  }

  getChart() {
    axios.get('http://localhost:3000/api/charts')
      .then(({data}) => {
        const chart = data.results;
        this.setState ({
          chart: chart
        });
      })
      .catch( err => {
        console.log('Error: ', err)
      })
  }


  renderChart(key) {
    const configuracao = JSON.parse(key.config)
    console.log('configuracao completa', configuracao)
    console.log('configuracao', Object.keys(configuracao.yaxisProperties)[0])
    const { width, height, margin, top, right, left, bottom, fillColor } = this.state;
    switch (key.chart_type) {
      case 'Bar':
        return (
          <div className={'d-flex justify-content-center'}>
            <ChartBar
              height={height}
              width={width}
              data={null}
              chart={key}
              style={{margin}}
              margin={{  top: top, right, left, bottom }}
              className="selectChart"
              xaxis={configuracao.xaxis}
              yaxisProperties={configuracao.yaxisProperties}
              selectedYaxisColor={fillColor}
            />
          </div>
          )
      case 'Line':
        return (
          <div className={'d-flex justify-content-center'}>
            <ChartLine
              height={300}
              width={500}
              data={null}
              chart={key}
              style={{margin: 10}}
              margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
              onClick={(e) => this.handleConfig("2")}
              xaxis={configuracao.xaxis}
              className="selectChart"
              selectedYaxisColor={fillColor}
            />
          </div>)
      case 'Area':
        return (<div className={'d-flex justify-content-center'}>
          <ChartArea
            height={300}
            width={500}
            data={null}
            chart={key}
            style={{ margin: '10px'}}
            margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
            xaxis={configuracao.xaxis}
            className="selectChart"
            selectedYaxisColor={Object.keys(configuracao.yaxisProperties)[0]}
          />
        </div>)
      case 'Scatter':
        return (<div className={'d-flex justify-content-center'}>
          <ChartScatter
            height={300}
            width={500}
            data={null}
            chart={key}
            style={{ margin: '10px'}}
            margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
            xaxis={configuracao.xaxis}
            className="selectChart"
            selectedYaxisColor={fillColor}
          />
        </div>)
      case 'Pie':
        return (<div className={'d-flex justify-content-center'}>
          <ChartPie
            height={300}
            width={400}
            data={null}
            chart={key}
            style={{ margin: '10px'}}
            margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
            onClick={(e) => this.handleConfig("5")}
            xaxis={configuracao.xaxis}
            className="selectChart"
            selectedYaxisColor={fillColor}
          />
        </div>)
      }
    }



    render() {

      const style = { borderColor: '#c1c1c1', margin: '8px' };
      const { chart } = this.state;
        
        return (
          <div>
              <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  }}
              >
                  <p style={{
                      fontSize:"20px",
                      fontWeight: "bold",
                      marginBottom:"2px"
                  }}>Overview Dashboard</p>
                    <Link to="/charts/new">
                      <Button type="primary"
                              style={{
                                  background: "green",
                                  borderColor: "green",
                                  marginLeft:"auto"}}>New Chart
                      </Button>
                    </Link>
              </div>
            <div>
              {/*<Menu />*/}
            </div>
            <div>
              <Divider/>
              <ChartNavBar />
{/*              <div className="d-flex justify-content-end mb-3">
                <Switch checked={!loading} onChange={this.onChange} />
              </div>*/}
                <Row justify="flex-start">
                  {chart.map((key, index) =>
                    <Col xs={24} sm={24} md={24} xl={8}>
                      <Card style={style}
                        hoverable
                        title={key.name}
                        actions={[
                          <EditOutlined key="edit" />
                        ]}
                        /*cover={}*/
                      >
                        {this.renderChart(key)}
                      </Card>
                    </Col>
                  )}
                </Row>
              <Divider/>
{/*                <Row justify="space-between" >
                  <Col span={24}>
                    <Card style={style}>
                      <div>Sales</div>
                    </Card>
                  </Col>
                </Row>*/}
            </div>
          </div>
        )
        
    }

}

ChartBar.defaultProps = {
  height: 300,
  width: 500,
  margin: 10,
  top: 20,
  right: 20,
  left: 20,
  bottom: 20,
  fillColor: '#093161'
}