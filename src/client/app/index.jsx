import React from 'react';
import {render} from 'react-dom';
import $ from 'jquery';
import Login from './components/login.jsx';
import Upload from './components/upload.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: []
    };
  }
  handleUpload(e) {
    e.preventDefault();
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
    return (
      <div>
        <Login/>
        <Upload upload={this.handleUpload.bind(this)} change={this.handleChange.bind(this)}/>
      </div>
    );
  }
}

render(<App/>, document.getElementById('app'));
