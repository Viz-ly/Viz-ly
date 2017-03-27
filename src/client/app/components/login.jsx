import React from 'react';

const iconStyle = {
  width: 40,
  height: 40
};

var Login = (props) => {
  return (
    <div style={{paddingLeft: 25, textAlign: 'left', height: '100%'}}>
      <h1>Viz.ly </h1>
        <div  style={{display: 'inline-block', width: '60%', paddingTop: 100, paddingRight: 10 }}>
          <h2> A picture is worth a thousand words. What do your pictures say about you?</h2>
          <p> At Viz.ly, we apply a sophisticated algorithm to your photo collection, resulting in a dynamic visual profile of who you are that you can share with the world. Getting started is easy:</p>
          <ul style={{marginBottom: 30}}>
            <p><img src={require('../../../../my-icons-collection/png/002-photo-slideshow.png')} style={iconStyle} />   Upload your collection of photographs</p>
            <p><img src={require('../../../../my-icons-collection/png/003-color-control.png')} style={iconStyle} />  Explore your results using our interactive visualization</p>
            <p><img src={require('../../../../my-icons-collection/png/007-camera-portrait-mode.png')} style={iconStyle} />  Share who you are with the world by uploading your results to your social media feeds</p>
          </ul>
          <a href="/auth/facebook" className="btn btn-primary" ><span className="fa fa-facebook"></span> Facebook Sign Up</a>
        </div>
          <img src={require('../../../../my-icons-collection/png/011-camera-and-photo-album.png')} style={{display: 'inline-block', maxWidth: '35%', paddingTop: 60, verticalAlign: 'top' }} />
        <footer style={{position: 'absolute', bottom: 0}}>Icons made by <a href='http://www.flaticon.com/authors/tintins'> Tintins </a> and <a href='http://www.freepik.com/'> FreePik </a> from <a href='http://www.flaticon.com'> www.flaticon.com</a></footer>
    </div>

  );
};

export default Login;
