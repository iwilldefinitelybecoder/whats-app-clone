import styled from '@emotion/styled'
import { Typography } from '@mui/material'
import React from 'react'

const Count = styled(Typography)`
    display:flex;
    justify-content:center;
    align-items:center;
    font-size: 14px;
    border-radius:50%;
    border:1px solid white;
    height:18px;
    width:18px; 
    background:#0b71ff;
    color:white;
    padding:8px;
`

const UnreadMessage = ({value, recieverId, conversationId}) => { 
  
  
  
  const count = value.conversationId === conversationId  && value.count >0 && <Count>{value.count}</Count>

    
    return (
    <>
    {count}
    </>
  )  
}
 
export default UnreadMessage