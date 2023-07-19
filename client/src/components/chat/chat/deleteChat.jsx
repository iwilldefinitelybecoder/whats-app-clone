import React, { useState, useContext, useEffect } from 'react';
import { deleteMessages } from '../../../service/api';
import { deleteFunction } from './ChatBox';
import { secreatKey } from '../../../constants/data';
const DeleteChat = () => {
  const [events, setEvents] = useState([]);  
  const {event,deleteMessage,deleteTheChat,setDeleteTheChat,setDisplay,setDeleted} = useContext(deleteFunction)

  function duplicate(){
    
    const hasDuplicate = events.some(event => event.messageId[0]._id === deleteMessage[0]._id);
    const duplicateValue = events.find(event => event.messageId[0]._id === deleteMessage[0]._id);
      if(event[0].target.checked === false ){
          const uptatedList = events.filter(event=>event.messageId[0]._id !== duplicateValue.messageId[0]._id)

          setEvents(uptatedList)
    }
    return !hasDuplicate;
    
  }
  useEffect(() => {
    if (event.length > 0 && deleteMessage.length > 0) {
      if(duplicate() && event[0].target.checked){
        const updatedEvent = { even: event[0].target.checked, messageId: deleteMessage };
        setEvents(prevEvents => [...prevEvents, updatedEvent]);
      }else{
        return
        console.log(`duplicate _id:${deleteMessage[0]._id}`)
      }
        
    }
  }, [event, deleteMessage]);

  useEffect(() => {
   
    if (deleteTheChat === true) { 
      console.log(deleteTheChat)
      let hashFlag = false
         events.forEach((event,index)=>{

            if (event.even === true || hashFlag) {

                  const deleteMessageInfo = {
                    _id:event.messageId[0]._id,
                    key:secreatKey,
                    conversationId:event.messageId[0].conversationId,
                    text:secreatKey
                  };

                  execute(deleteMessageInfo);

                  console.log('working: ',index);
            } 
            
          })
          
          setDeleteTheChat(false)
          setEvents([])
          setDisplay('none')
          setDeleted(true)
          
         
         
    }
  }, [deleteTheChat]);

    async function execute(deleteMessageInfo) {
      await deleteMessages(deleteMessageInfo);
  }

  return <></>;
}

export default DeleteChat;
