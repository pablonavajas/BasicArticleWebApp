import React from 'react';

import { Form, Input, Button, Spin } from 'antd';
import { NavLink } from 'react-router-dom';
import { UserOutlined, LockOutlined, LoadingOutlined } from '@ant-design/icons';

import * as actions from '../store/actions/auth';

import { connect } from 'react-redux';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;


const NormalLoginForm = (props) => {
    const onFinish = (values) => {
        console.log('username is: ', values.username);
        console.log('password is:', values.password);
        props.onAuth(values.username, values.password);
        props.history.push('/');
    };

    return (
        <div>
            {
                props.loading ?

                <Spin indicator={antIcon} />

                :
    
                <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                >
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
                    name="password"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
                    ]}
                >
                    <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{marginRight: '10px'}}>
                        Log in
                        </Button>
                        Or
                        <NavLink 
                            style={{marginRight: '10px'}} to='/signup/'> Sign Up
                        </NavLink>
                </Form.Item>
                </Form>
            }
        </div>
    );
};

const mapStateToProps = state => {
    return {
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps = (dispatch) => ({
    onAuth: (username, password) => dispatch(actions.authLogin(username, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(NormalLoginForm);