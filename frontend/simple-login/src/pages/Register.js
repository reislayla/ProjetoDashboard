import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'antd/dist/antd.css';
import '../styles/index.css';
import {
  Form,
  Input,
  Tooltip,
  Checkbox,
  Button,
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 6,
    },
  },
};

class Register extends Component {
constructor(props) {
    super(props);
    //iniciar vazio
    this.state = {
      email:'',
      password: '',
      nickname: '',
      residence: '',
      phone: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    console.log(this.state);
  }

  
  handleChange(event) {
    console.log('entrei no updateInput');
    this.setState({[event.target.name]: event.target.value,
    });
    console.log(this.setState)
  }

   
  handleSubmit(event) {
    console.log('handleSubmit')
    event.preventDefault();
    //get the values
    const request = {
      email: this.state.email,
      password: this.state.password,
      nickname: this.state.nickname,
      residence: this.state.residence,
      phone: this.state.phone,
    };

    console.log(request);
    console.log('antes do axios')
    //call axios
    axios.post('http://localhost:3000/api/register', request,  {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      console.log('entrei no axios')
      if (res.status === 200) {
        console.log('entrei no 200', res.status)
        this.props.history.push('/');
      } else {
        console.log('entrei no erro no 200')
        const error = new Error(res.error);
        throw error;
      }
    })
    .catch( err => {
      console.log('entrei no catch')
      console.log(err);
    })
  }

render() {
  return (
    <div className="box">
      <p className="title">Register</p>
      <Form
      {...formItemLayout}
      //form={form}
      name="register"
      className="register-form"
      //onFinish={onFinish}
      scrollToFirstError
    >
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input type="text" name="email"  value={this.state.email} onChange={this.handleChange}/>
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password type="password" name="password"  value={this.state.password} onChange={this.handleChange}/>
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject('The two passwords that you entered do not match!');
            },
          }),
        ]}
      >
        <Input.Password type="password" name="password"/>
      </Form.Item>

      <Form.Item
        name="nickname"
        label={
          <span>
            Nickname&nbsp;
            <Tooltip title="What do you want others to call you?">
              <QuestionCircleOutlined />
            </Tooltip>
          </span>
        }
        rules={[
          {
            required: true,
            message: 'Please input your nickname!',
            whitespace: true,
          },
        ]}
      >
        <Input name="nickname" type="text" value={this.state.nickname} onChange={this.handleChange}/>
      </Form.Item>

      <Form.Item
        name="residence"
        label="Habitual Residence"
        rules={[
          {
            required: true,
            message: 'Please select your habitual residence!',
          },
        ]}
      >
        <Input name="residence" type="text" value={this.state.residence} onChange={this.handleChange}/>

      </Form.Item>

      <Form.Item
        name="phone"
        label="Phone Number"
        rules={[
          {
            required: true,
            message: 'Please input your phone number!',
          },
        ]}
      >
        <Input
          name="phone"
          type="text"
          value={this.state.phone} onChange={this.handleChange}
        />
      </Form.Item>
      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject('Should accept agreement'),
          },
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>
          I have read the <a href="http://localhost:5000/">agreement</a>
        </Checkbox>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.handleSubmit}>
          Register
        </Button>
        Already have an account?<Link to="/login"> Sign In</Link>
      </Form.Item>
    </Form></div>
  );
};
}  
export default Register;

