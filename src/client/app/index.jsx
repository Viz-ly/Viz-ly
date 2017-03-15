import React from 'react';
import {render} from 'react-dom';

class App extends React.Component {
  render () {
    return (
      <div>
        <p> Hello Viz.ly!</p>
      </div>
    );
  }
}

render(<App/>, document.getElementById('app'));
