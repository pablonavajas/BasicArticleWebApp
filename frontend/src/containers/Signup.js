import React from 'react';
import {
  Form,
  Input, 
  Button
} from 'antd';
import { NavLink } from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import * as actions from '../store/actions/auth';
import { connect } from 'react-redux';

const RegistrationForm = (props) => {
  const [form] = Form.useForm();

  const onFinish = values => {
    console.log('Received values of form: ', values);
    props.onAuth(
        values.username,
        values.email,
        values.password,
        values.confirm
        );
    props.history.push('/');
  };

  return (
    <Form form={form}
    name="register"
    onFinish={onFinish}>
        <Form.Item
            name="username"
            rules={[
                {
                    required: true,
                    message: 'Please input your Username!',
                },
            ]}
        >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>

        <Form.Item
            name="email"
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
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
        </Form.Item>

        <Form.Item
            name="password"
            rules={[
            {
                required: true,
                message: 'Please input your password!',
            },
            ]}
            hasFeedback
        >
            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password" />
        </Form.Item>

        <Form.Item
            name="confirm"
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
            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"/>
        </Form.Item>

        <Form.Item>
            <Button type="primary" htmlType="submit" style={{marginRight: '10px'}}>
                Sign Up
            </Button>
            Or
            <NavLink 
                style={{marginRight: '10px'}} to='/login/'> Login
            </NavLink>
        </Form.Item>
      
    </Form>
  );
};

const mapStateToProps = state => {
    return {
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps = (dispatch) => ({
    onAuth: (username, email, password1, password2) => dispatch(actions.authSignup(username, email, password1, password2))
});

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);