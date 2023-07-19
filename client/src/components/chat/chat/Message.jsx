import { useContext, createContext, useState } from 'react';

import { Box, styled, Typography } from '@mui/material';
import { GetApp as GetAppIcon } from '@mui/icons-material';
import { AccountContext } from '../../../context/AccountProvider';

import { downloadMedia, formatDate } from '../../../utils/common-utils';
import { iconPDF } from '../../../constants/data';
import { secreatKey } from '../../../constants/data';
import { deleteFunction } from './ChatBox';
import {AiFillExclamationCircle, AiOutlineExclamationCircle} from "react-icons/ai";
import { generalUtils } from '../ChatDialog';


const Wrapper = styled(Box)`
background-color: white; 
color: #333333;
    padding: 7px;
    max-width: 60%;
    width: fit-content;
    display: flex;
    border-top-left-radius: 20px;
    border-top-left-radius: 0px;
    border-top-right-radius: 20px;
    border-bottom-left-radius: 20px;
    word-break: break-word;
    margin-top:4px;
    boxShadow: '-1px 1px 7px rgba(0, 0, 0, 0.4),1px 1px 7px rgba(0, 0, 0, 0.4)'
`;
    
const Own = styled(Box)`
background-color: #2979FF; 
color: white; 
    padding: 5px;
    max-width: 60%;
    width: fit-content;
    margin-left: auto;
    display: flex;
    border-bottom-right-radius: 20px;
    border-top-right-radius: 0;
    border-bottom-left-radius: 0px;
    border-top-left-radius: 20px;
    word-break: break-word;
    margin-top:7px;
    boxShadow: '-1px 1px 7px rgba(0, 0, 0, 0.4),1px 1px 7px rgba(0, 0, 0, 0.4)'
`;

const Text = styled(Typography)`
    font-size: 18px;
    padding: 0 25px 0 5px;
`;

const Time = styled(Typography)`
    font-size: 8.5px;
    color: black;
    margin-top: 6px;
    word-break: keep-all;
    margin-top: 10px;
`;

const deletedChat = styled(Box)`
    font-size:5px;
`





const Message = ({ message, display, setDisplay }) => {
   
    const { account } = useContext(AccountContext);
    const {setEvent,setDeleteMessage} = useContext(deleteFunction)
    const {isChecked}= useContext(generalUtils)
   
    function deleteAmessage(e,message){
        setEvent([e])
        setDeleteMessage([message]) 
    }
  
    return (
        <>
    
        {
            account.sub === message.senderId ? 
                <Own >
                    
                    {   message.text === secreatKey?<deletedChat style={{fontSize:'18px'}}>Message Deleted <AiFillExclamationCircle/></deletedChat>
                    
                    :
                        message.type === 'file' ? <ImageMessage message={message}/> : <TextMessage message={message} />
                    }
                    {   message.text === secreatKey?null:isChecked===true?
                    <input type="checkbox" checked={isChecked} style={{display:display}} onChange={(e)=>{deleteAmessage(e,message)}}readOnly={!isChecked}/>
                    :
                    <input type="checkbox"  style={{display:display}} onChange={(e)=>{deleteAmessage(e,message)}} />
                    }
                </Own>
            : 
                <Wrapper>
                    {   message.text === secreatKey?null:isChecked===true?
                    <input type="checkbox" checked={isChecked} style={{display:display}} onChange={(e)=>{deleteAmessage(e,message)}}readOnly={!isChecked}/>
                    :
                    <input type="checkbox"  style={{display:display}} onChange={(e)=>{deleteAmessage(e,message)}} />
                    }
                    {
                        message.text === secreatKey?<deletedChat style={{fontSize:'18px'}} > Message Deleted <AiFillExclamationCircle/></deletedChat>
                    
                    :
                        message.type === 'file' ? <ImageMessage message={message} /> : <TextMessage message={message} />
                    }
                </Wrapper>  
        }

        
        
      
        </>
    )
}

const TextMessage = ({ message }) => {
   
    const { account } = useContext(AccountContext);
    return (
        <>
            <Text>{message.text}</Text>
           {account.sub === message.senderId ? <Time style={{color:'white'}}>{formatDate(message.createdAt)}</Time>:<Time>{formatDate(message.createdAt)}</Time>}
            
        </>
    )
}

const ImageMessage = ({ message }) => {
    const { account } = useContext(AccountContext);
    return (
        <div style={{ position: 'relative' }}>
            {
                message?.text?.includes('.pdf') ?
                    <div style={{ display: 'flex' }}>
                        <img src={iconPDF} alt="pdf-icon" style={{ width: 80,borderRadius:'8px' }} />
                        <Typography style={{ fontSize: 14 }} >{message.text.split("/").pop()}</Typography>
                    </div>
                : message?.text?.includes('.mp4') ?
                    <video src={message.text} controls style={{height:'220px',width:'300px',borderRadius:'8px'}}></video>
                :
                message?.text?.includes('.mp3') ?
                <audio src={message.text} controls />
                :
                <img style={{ width: 300, height: '100%', objectFit: 'cover',borderRadius:'8px' }} src={message.text} alt={message.text} />
            }
              {
              account.sub === message.senderId ?
              <Time style={{ position: 'absolute', bottom: 0, right: 0 ,color:'white'}}>
                   <GetAppIcon 
                    onClick={(e) => downloadMedia(e, message.text)} 
                    fontSize='small' 
                    style={{ marginRight: 10, border: '1px solid black', borderRadius: '50%', color:'white' }} />
                {formatDate(message.createdAt)}
            </Time>
                :
                <Time style={{ position: 'absolute', bottom: 0, right: 0 ,color:'white'}}>
                <GetAppIcon 
                 onClick={(e) => downloadMedia(e, message.text)} 
                 fontSize='small' 
                 style={{ marginRight: 10, border: '1px solid grey', borderRadius: '50%', color:'black' }} />
             {formatDate(message.createdAt)}
         </Time>
        }
        </div>
    )
} 
 


export default Message;


