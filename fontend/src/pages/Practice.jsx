import React, { useState,useMemo, useCallback } from 'react'
import Practice2 from './Practice2';

const Practice = () => {

  const [count,setCount] = useState(0);

  const [fakeCount,setFakeCount] = useState(0);

  // const handleChange = ()=>{
  //   setCount(count + 1) ;
  // }


  const handleChange = useCallback(()=>{
    setCount(count + 1) ;
  },[count])

  return (
   <> 
   <div>{fakeCount}</div>
      <button onClick={e=>setFakeCount(fakeCount +1)}>Fake Count </button>
   <div>{count}</div>
   <button onClick={handleChange}>Parent Count</button>
   <Practice2  handleChange={handleChange}/>
   </>
  )
}

export default Practice
