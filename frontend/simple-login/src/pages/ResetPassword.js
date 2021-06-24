import React, {Component} from 'react';
import axios from 'axios';
import { Form, Input, Button } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import '../styles/index.css';

class ResetPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
          email:'',
          password: '',
          confirmPassword: '',
          update: false,
          isLoading: true, 
          error: false,
          };
        this.handleChange = this.handleChange.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        console.log(this.state);
      }
    
      async componentDidMount() {

        const { match: { params } } = this.props;

          await axios.get(`http://localhost:3000/api/reset/${params.resetPasswordToken}`)
            .then(response => {
                console.log("reset response: ", response)
                if(response.data.message === 'password reset link working') {
                    this.setState({
                        email: response.data.email,
                        updated: false,
                        isLoading: false, 
                        error: false
                    })
                } else {
                    this.setState({
                        update: false,
                        isLoading: false, 
                        error: false
                    })
                }
            })
            .catch(error => {
                console.log(error.data)
            })
      }

      handleChange(event) {
        this.setState({[event.target.name]: event.target.value,
        });
      }

      handleConfirmPassword = () => {
        if (this.state.password !== this.state.confirmPassword) {
          this.setState({
            password: '',
            confirmPassword: ''
          })
          alert("passwords dont match")
        }
    }
       
      updatePassword(event) {

        event.preventDefault();
       
        console.log('antes do axios')
        axios.put('http://localhost:3000/api/updatePassword', {
            email: this.state.email,
            password: this.state.password
        })
        .then(response => {
          console.log('Data from Update Password: ', response.data.message)
          if (response.data.message === 'Password updated') {
            this.setState({
              updated: true, 
              error: false
            })
          } else {
            this.setState({
                updated: false, 
                error: true
              })
            }
          })
          .catch(error => {
            console.log(error.data)
          })
        }
      
    
      //Clean form after submit
      clear = () =>{
        this.setState({
          email: ""
        });
      }
    
    render() {
    
      const {password, confirmPassword, error, isLoading, updated} = this.state; 
      
      /* Password not updated' */
      if (error) {
          return (
              <div className="box">
                  <h1>Password Reset</h1>
                  <div>
                    <p>Problem reseting password. Please try again.</p>
                        <Link to={`/resetpassword`}>
                            <Button type="primary" htmlType="submit" className="login-form-button">Reset Password</Button>
                        </Link>
                    <p><a className="" href="http://localhost:5000/login">Sign In</a></p>
                  </div>
              </div>
          )
      } else if (isLoading) {
          return (
              <div className="box">
                <h1>Password Reset</h1>
                <p>Loading User Data...</p>
              </div>
          )
      } else {
      return (
        <div className="box">
          <p className="title">Update Password</p>
          
          <Form
          name="normal_login"      
          className="login-form"
          initialValues={{
            remember: true,
          }}
        >
          <div className="mb-4 text-center">
          <span className="">Please insert the new password</span>
          </div>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
          <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" name="password" placeholder="New Password"  value={password} onChange={this.handleChange}/>
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
          <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" name="confirmPassword" placeholder="Confirm Password"  value={confirmPassword} onChange={this.handleChange}/>
          </Form.Item>
         
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.updatePassword}>
              Update Password
            </Button>
          </Form.Item>
    
          {updated && (
              <div>
                <p>Your password has been successfully reset, please try logging in again</p>              
                <Link to={`/login`}>
                    <Button type="primary" htmlType="submit" className="login-form-button">Login</Button>
                </Link>
            </div>
          )}  
        </Form></div>
      );
    }
  };
}  
export default ResetPassword;
    
    