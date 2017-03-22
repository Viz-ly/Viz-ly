import React from 'react';

var Upload = (props) => {
  return (
    <div>
      <form
        encType="multipart/form-data">
        <input id="file-select" type="file" name="sampleFile" onChange={props.change} multiple/>
        <input onClick={props.upload} type='submit' value='Upload!' />
      </form>
      <h5>Please upload photos under 4MB!</h5>
    </div>
  );
};

export default Upload;