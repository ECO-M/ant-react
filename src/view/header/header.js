import React, {Component} from 'react';
import {Icon} from 'antd';
import classNames from 'classnames';
import matchesSelector from '../../modules/matchesSelector/matchesSelector'
import ssoURL from '../../images/SSO-Icon.png';
import '../../assets/header.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
    }
  }
  
  componentDidMount() {
    this.clicks(this);
  }
  
  /**
   * clicks
   * @param self
   * 点击当前元素外的dom层,改变this.state of status value
   * 点击当前元素外的dom层,改变className style attr of value
   */
  clicks = (self) => {
    document.body.addEventListener('click', (e) => {
      ////匹配当前组件内的所有元素
      if (matchesSelector(e.target, '.relative_setting *')) {
        return;
      }
      self.setState({
        status: false,
      });
    }, false);
  };
  
  //点击下拉显示
  setting = (e) => {
    e.preventDefault();
    this.setState({
      status: true,
    })
  };
  
  //关闭
  close = (e) => {
    e.preventDefault();
    this.setState({
      status: false,
    })
  };
  
  render() {
    // card_setting
    let divClass = classNames({
        "card_setting": true,
        "active": this.state.status === true,
        "close": this.state.status === false
      })
    ;
    return (
      <header className='nav_header'>
        <div className="nav_images">
          <img src={ssoURL} alt="sso"/>
        </div>
        <div className="nav_setting">
          <ul className="relative_setting">
            <li className="setting_icon" onClick={this.setting}>
              <Icon type="setting"/>
            </li>
            <li>
              <div className={divClass}>
                <div>{this.state.message}</div>
                <div>222</div>
                <div onClick={this.close}><span>取消</span></div>
              </div>
            </li>
          </ul>
        </div>
      </header>
    )
  }
}

export default Header;
