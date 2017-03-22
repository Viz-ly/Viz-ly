import React from 'react';

var Word = (props) => {
  return (
    <div>
      {props.word.key} - {props.word.count}
    </div>
  );
};

export default Word;