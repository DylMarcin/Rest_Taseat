import React, { Component} from 'react';
import { Input, Button } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';


class Login extends Component {

  state = {
    credentials: {username: '', password: ''}
  }

  login = event => {
    fetch('http://127.0.0.1:8000/auth/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(this.state.credentials)
    })
    .then( data => data.json())
    .then(
      data => {
        this.props.userLogin(data.token);
      }
    )
    .catch( error => console.error(error))
  }

  register = event => {
    fetch('http://127.0.0.1:8000/api/users/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(this.state.credentials)
    })
    .then( data => data.json())
    .then(
      data => {
        console.log(data.token);
      }
    )
    .catch( error => console.error(error))
  }
  inputChanged = event => {
    const cred = this.state.credentials;
    cred[event.target.name] = event.target.value;
    this.setState({credentials: cred});
  }

  render() {
    return (
      <div className = 'scaled' style={{padding:25, paddingTop:0}}>
        <label>
          <Input type="text" name="username" placeholder='Nazwa Użytkownika'
           value={this.state.credentials.username}
           onChange={this.inputChanged}/>
        </label>
        <br/><br/>
        <label>
          <Input.Password type="password" placeholder='Hasło' name="password" iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}

           value={this.state.credentials.password}
           onChange={this.inputChanged} />
        </label>
        <br/><br/>
        <Button type='primary' onClick={this.login}>Login</Button>
        <br/><br/>
        Jeżeli nie masz konta zarejestruj się
      </div>
    );
  }
}

export default Login;