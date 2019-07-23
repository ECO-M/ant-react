import React, {Component} from 'react';
import http from '../../http/http';
import {Form, Icon, Input, Button, Checkbox, notification} from 'antd';
import '../../assets/App.css';

let form;
const CustomizedForm = Form.create({
  //全局状态 global_state
  name: 'global_state',
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
  
  mapPropsToFields(props) {
    return {
      username: Form.createFormField({
        ...props.username,
        value: props.username.value,
      }),
      password: Form.createFormField({
        ...props.password,
        value: props.password.value,
      }),
      remember: Form.createFormField({
        ...props.remember,
        value: props.remember.value,
      }),
    };
  },
  
  onValuesChange(_, values) {
  
  },
  
})((props) => {
  form = props.form;
  const {getFieldDecorator} = props.form;
  let val = props.remember.value;
  return (
    <Form onSubmit={props.onSubmit} className="login-form">
      <Form.Item>
        {getFieldDecorator('username', {
          rules: [{required: true, message: 'Please input your username!'}],
        })(
          <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="Username"/>
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('password', {
          rules: [{required: true, message: 'Please input your Password!'}],
        })(
          <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                 placeholder="Password"/>
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('remember', {
          valuePropName: 'checked',
          initialValue: val,
        })(
          <Checkbox>Remember me</Checkbox>
        )}
        <a className="login-form-forgot" href="/forgotPassword">Forgot password</a>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <a href="/register">register now!</a>
      </Form.Item>
    </Form>
  );
});

class Login extends Component {
  state = {
    fields: {
      username: {
        value: '',
      },
      password: {
        value: ''
      },
      remember: {
        value: true
      }
    },
  };
  
  handleFormChange = (changedFields) => {
    this.setState(({fields}) => ({
      fields: {...fields, ...changedFields},
    }));
  };
  
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.fields.remember.value === false) {
      notification.open({
        message: 'notice of settlement',
        duration:2,
        description: 'Please select protocol.',
        icon: <Icon type="smile" rotate={180} style={{color: 'red',fontSize:'26px',position:'absolute'}}/>,
      });
      return;
    }
    let login = this.state.fields,
      json = {
        username: login.username.value,
        password: login.password.value,
      };
    form.validateFields((err, values) => {
      if (!err) {
        http('/login', 'post', json).then(res => {
          if (res.status === 200) {
            localStorage.setItem('token', res.token);
            this.props.history.push('/home');
          }
        }).catch(err => {
          console.log(err);
        });
      }
    });
  };
  
  render() {
    const fields = this.state.fields;
    return (
      <div className="App">
        <header className="App-header" id="components-form-demo-normal-login">
          <h1 className="App-link">SSO</h1>
          <CustomizedForm {...fields} onChange={this.handleFormChange} onSubmit={this.handleSubmit}/>
        </header>
      </div>
    );
  }
}


export default Login;
