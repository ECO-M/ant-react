import React, {Component} from 'react';
import Table from '../table/table_nav'
import {Route, Switch} from 'react-router-dom';
import Header from '../header/header'
import Personal from '../personalInformation/personalInformation'
import Home from '../home/home'
import Application from '../applicationManagement/applicationManagement'
import User from '../userManagement/userManagement'

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  
  render() {
    if (localStorage.getItem('token')) {
      console.log(this.props);
    } else {
      alert('请先去登陆!');
      this.props.history.push('/');
    }
    return (
      <div className="back_root">
        <Header/>
        <div className="table_flex">
          <Table/>
          <div className="table_context">
            <div className="table_form">
              <Switch>
                <Route path='/personalInformation' component={Personal}/>
                <Route path='/home' component={Home}/>
                <Route path='/applicationManagement' component={Application}/>
                <Route path='/userManagement' component={User}/>
              </Switch>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default Layout;
