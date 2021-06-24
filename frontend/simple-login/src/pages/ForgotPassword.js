import React, {Component} from 'react';
import axios from 'axios';
import '../styles/App.css';
//import Cookies from 'js-cookie';
import 'antd/dist/antd.css';
import '../styles/index.css';
import { Form, Input, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

class ForgotPassword extends Component {
constructor(props) {
    super(props);
    this.state = {
      email:'',
      showError: false, 
      serverMsg: ''
      };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    console.log(this.state);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value,
    });
  }
   
  handleSubmit(event) {
    console.log('Submit Reset Form: ')
    event.preventDefault();

    const request = {
      email: this.state.email,
    };

    console.log("handleSubmit email: ", request)

    //Empty field
    if (request === '') {
      this.setState({
        showError: false, 
        serverMsg: ''
      })
    } else {

    console.log('antes do axios')
    axios.post('http://localhost:3000/api/forgotpassword', request,  {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      console.log('Data from Reset form: ', response.data.message)
      if (response.data.message === 'Email does not exists') {
        this.setState({
          showError: true, 
          serverMsg: ''
        })
      } else if (response.data.message === 'Recovery email sent') {
        this.setState({
          showError: false,
          serverMsg: "Recovery email sent"
        })
      }
      })
      .catch(error => {
        console.log(error.data)
      })
    }
  }

  //Clean form after submit
  clear = () =>{
    this.setState({
      email: ""
    });
  }

render() {

  const {serverMsg, showNullError, showError} = this.state; 

  return (
    <div className="box">
      <p className="title">Reset Password</p>
      
      <Form
      name="normal_login"      
      className="login-form"
      initialValues={{
        remember: true,
      }}
      //onFinish={onFinish}
    >
      <div className="mb-4 text-center">
      <span className="">No worries! Just enter your email and we'll send you a reset password link.</span>
      </div>
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your Email!',
          },
        ]}
      >
      <Input prefix={<UserOutlined className="site-form-item-icon" />} type="text" name="email" placeholder="Email"  value={this.state.email} onChange={this.handleChange}/>
      </Form.Item>
     
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.handleSubmit}>
          Reset Password
        </Button>
      </Form.Item>

      {showNullError && (
        <div>
          <p>
            Please insert a valid email. 
          </p>
        </div>
      )}
      {showError && (
        <div>
          <p>
            That email address isn't recongnized. Please try again or register for a new account.
          </p>
          <Link to={`/register`}>
            <Button type="primary" htmlType="submit" className="login-form-button">Register</Button>
          </Link>
        </div>
      )}
      {serverMsg === 'Recovery email sent' && (
        <div>
          <p>Please check your email.</p>
        </div>
      )}
      
      <div className="text-center">
        <span>Just remembered?</span>
        <p><a className="" href="http://localhost:5000/login">
            Sign In
        </a></p>
      </div>

    </Form></div>
  );
};
}  
export default ForgotPassword;

