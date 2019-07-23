import React, {Component} from 'react';
import http from '../../http/http';
import {Card} from 'antd';
import '../../assets/table.css'

const {Meta} = Card;

const Cards = (props) => {
  const card = props.posts.map((post) =>
    <Card className="card_height" key={post.homeId} hoverable cover={<img alt="example" src={post.src}/>}>
      <div>
        <ul>
          <li>{post.title}</li>
          <li><a target="_blank" rel="noopener noreferrer" href={'https://' + post.url}>
            <Meta description={post.url}/>
          </a></li>
        </ul>
      </div>
    </Card>
  );
  return (
    <div className="card_mode">
      {card}
    </div>
  )
};

class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }
  
  componentDidMount() {
    http('/home', 'get').then(res => {
      if (res.status === 200) {
        console.log(res);
        this.setState({
          data: res.data
        })
      }
    }).catch(err => {
      console.log(err);
    })
  }
  
  render() {
    return (
      <Cards posts={this.state.data}/>
    )
  }
}

export default home;
