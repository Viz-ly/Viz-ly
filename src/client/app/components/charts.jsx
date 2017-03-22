import React from 'react';
import {render} from 'react-dom';
import $ from 'jquery';

class Charts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: []
    };
  }
  handleUpload(e) {
    debugger;
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
        <p> Hello Viz.ly!</p>
        <form ref='uploadForm'
          id='uploadForm'
          action='http://localhost:3000/upload'
          method='post'
          encType="multipart/form-data">
          <input id="file-select" type="file" name="sampleFile" onChange={this.handleChange.bind(this)}multiple/>
          <input onClick={this.handleUpload.bind(this)} type='submit' value='Upload!' />
        </form>
        <h5>Please upload photos under 4MB!</h5>
      </div>
    );
  }
}
