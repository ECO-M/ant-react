import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Menu, Icon} from 'antd';
import '../../assets/table.css'

class tableNav extends Component {
  constructor(props) {
    super(props);
    let pathname = props.location.pathname.replace("/", "");
    this.state = {
      current: pathname,
      openKeys: [pathname],
    };
  }
  
  rootSubmenuKeys = ['home', 'applicationManagement', 'userManagement', 'roleManagement', 'authorizationInterface'];
  
  onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({
        openKeys
      });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };
  
  onOpenClick = e => {
    this.setState({
      current: e.key,
      openKeys: e.keyPath
    });
  };
  
  render() {
    return (
      <div className="table-vh">
        <Menu mode="inline" selectedKeys={[this.state.current]} onOpenChange={this.onOpenChange}
              onClick={this.onOpenClick}
              style={{width: 210}}>
          <Menu.Item key="/personalInformation">
            <Icon type="team" style={{fontSize: '16px'}}/>
            <Link to="/personalInformation">个人中心</Link>
          </Menu.Item>
          <Menu.Item key="home">
            <Icon type="home" style={{fontSize: '16px'}}/>
            <Link to="/home">首页</Link>
          </Menu.Item>
          <Menu.Item key="applicationManagement">
            <Icon type="appstore" theme="filled" style={{fontSize: '16px'}}/>
            <Link to="/applicationManagement">应用管理</Link>
          </Menu.Item>
          <Menu.Item key="userManagement">
            <Icon type="user" style={{fontSize: '16px'}}/>
            <Link to="/userManagement">用户管理</Link>
          </Menu.Item>
        </Menu>
      </div>
    )
  }
}

export default withRouter(tableNav);
