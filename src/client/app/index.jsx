import React from 'react';
import {render} from 'react-dom';
import $ from 'jquery';
import Login from './components/login.jsx';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: []
    };
  }
  render () {
    return (
      <div>
        <Login/>
      </div>
    );
  }
}

render(<App/>, document.getElementById('app'));
