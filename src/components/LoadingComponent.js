import React from'react';
import './LoadingComponent.css'
import HashLoader from 'react-spinners/HashLoader'
import { css } from "@emotion/react";

const hash = css`
position: absolute;
top: 45%;
left: 45%;
transform: translate (50%, -50%);
`

const LoadingComponent = () => {
  return(
    <div className='loading'>
      <HashLoader css={hash} size={100} color={'#475841'} speedMultiplier={1} />
    </div>

  )
}

export default LoadingComponent;