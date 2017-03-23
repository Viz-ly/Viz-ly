import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import {render} from 'react-dom';
import $ from 'jquery';
import Login from './components/login.jsx';
import Upload from './components/upload.jsx';
import WordList from './components/wordlist.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      wordList: [],
      color: 'gree',
      user: null
    };
  }

  componentWillMount() {
    console.log('componentWillMount fired!');
    $.ajax({
      url: '/userLoggedIn',
      type: 'GET',
      contentType: false,
      processData: false,
      success: (data) => {
        console.log('ajax sent!');
        this.setState({user: data.name});
        console.log(this.state.user);
      },
      error: function() {
        console.log('error');
      }
    });
  }



  handleUpload(e) {
    e.preventDefault();
    var self = this;
    console.log('handle upload!');
    var form = new FormData();
    var files = this.state.files;
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      // Check the file type.
      if (!file.type.match('image.*')) {
        continue;
      }
      // Add the file to the request.
      form.append('sampleFile', file, file.name);
    }
    $.ajax({
      url: '/upload',
      type: 'POST',
      data: form,
      contentType: false,
      processData: false,
      success: function(data) {
        console.log(data);
        self.setState({wordList: data});
      },
      error: function() {
        console.log('error');
      }
    });
  }
  handleChange(e) {
    this.setState({files: e.target.files})
  }
  render () {
    if (this.state.user) {
      return (
        <div>
        <h4> Welcome, {this.state.user}!</h4>
        <Upload upload={this.handleUpload.bind(this)} change={this.handleChange.bind(this)}/>
          <WordList list={this.state.wordList}/>
          </div>
      );
    } else {
      return (
        <div>
          <Login/>

        </div>
      );
    };
  }
}

render(<App/>, document.getElementById('app'));
