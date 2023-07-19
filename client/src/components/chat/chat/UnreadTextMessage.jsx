import React, { useEffect } from 'react'



 
function UnreadTextMessage({messages, setMessages,unreadTextMessages, setUnreadTextMessages,counts,setCounts,conversation,uRMEvent,personId,upMessage, setUpMessages }) { 
    useEffect(()=>{
        const unreadmessage = []
        const updatedMessages = []
        function tagMessages(){
            
            counts?.forEach(count => {
                count.objectId?.forEach(objectId=>{
                    messages?.map(message=>{
                        if(message.conversationId === count.conversationId ){
                            if(message._id=== objectId){
                                unreadmessage.push(message)
                            }else{
                                updatedMessages.push(message)
                            }
                        }
                    })
                    })
                 
            });
            
            setUpMessages(updatedMessages)
            setUnreadTextMessages(unreadmessage)
        }
        tagMessages()
    },[messages])
    
    useEffect(()=>{
        const changeValues = counts.filter(count=>count.conversationId !== conversation._id)
        setCounts(changeValues)
        // setMessages(prev => prev,upMessage)
    },[personId])
  return (
    <div></div>
  )
}

export default UnreadTextMessage 