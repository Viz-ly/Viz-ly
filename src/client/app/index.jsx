import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import {render} from 'react-dom';
import $ from 'jquery';
import Login from './components/login.jsx';
import Upload from './components/upload.jsx';
import WordList from './components/wordlist.jsx';
import Charts from './components/charts.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      wordList: [],
      uploading: false,
      error: false,
      user: null,
      duplicates: false
    };
  }

  componentDidMount() {
    console.log('componentWillMount fired!');
    $.ajax({
      url: '/userLoggedIn',
      type: 'GET',
      contentType: false,
      processData: false,
      success: (data) => {
        console.log('ajax sent!', data);
        this.setState({user: data[0], wordList: data[1]});
        console.log(this.state.user);
      },
      error: function() {
        console.log('error');
      }
    });
  }



  handleUpload(e) {
    e.preventDefault();
    this.setState({uploading: true, error: false, duplicates: false});
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
        self.setState({wordList: data[0], uploading: false, duplicates: data[1] > 0});
      },
      error: function() {
        console.log('error');
        self.setState({error: true, uploading: false});
      }
    });
  }
  handleChange(e) {
    this.setState({files: e.target.files})
  }
  render () {
    console.log('uploading?', this.state.uploading);
    if (this.state.user) {
      return (
        <div>
          <form action='/logout' method='get'>
            <input type='submit' value='Logout' />
          </form>
          <h4 className="welcome"> Welcome, {this.state.user}!</h4>
            <p className="info">To see Viz-ly at work: upload your pictures.
              The more photos you upload, the more dynamic the visualization!
            </p>
          <Upload upload={this.handleUpload.bind(this)} change={this.handleChange.bind(this)}/>
          {this.state.error && <h6>Sorry you encountered an error. Please try again later!</h6>}
          {this.state.duplicates && <h6>It seems you have submitted at least one of the same photos already. We went ahead and excluded it from our chart!</h6>}
          {this.state.uploading ? <img src="../spiffygif_46x46.gif"></img> :
                <div>
                  {this.state.wordList.length > 0 && <Charts list={this.state.wordList}/>}
                </div>
                }
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
