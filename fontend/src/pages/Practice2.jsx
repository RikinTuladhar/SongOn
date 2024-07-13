import React from 'react'
import { memo } from 'react';

const Practice2 = ({handleChange}) => {
    console.log('Practice2 is rendered');


  return (
    <div>
        <h1>Inside the child component </h1>
      <button onClick={handleChange}>Inside child</button>
    </div>
  ) 
}

export default memo(Practice2)
