import React from 'react'
import { Oval } from 'react-loader-spinner'
const OvalLoader = () => {
  return (
    <Oval
    visible={true}
    height="25"
    width="25"
    color="white"
    ariaLabel="oval-loading"
    wrapperStyle={{}}
    wrapperClass=""
    />
  )
}

export default OvalLoader
