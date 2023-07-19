import React, { useState, useEffect } from 'react'



function UnreadMessages({ lastActivity, localMessage, setCounts, counts }) {
  useEffect(() => {
      const unreadMessageCount = {};
      let values = []
      const callback = (activity) => {
          let count = 0;
          let objectId = []
          localMessage?.forEach((message, i) => {
            const mesConvoId = message.conversationId;
            const mesUpTime = message.updatedAt;
            const activConvoId = activity.conversationId;
            const activeUpTime = activity.updatedAt;
            if (mesConvoId === activConvoId && mesUpTime >= activeUpTime) {
              
              count++;
              objectId.push(message._id)
            }
          });
        return {count:count,objectId:objectId};
      };

    lastActivity?.forEach((activity) => {
      const conversationId = activity.conversationId;

      if (!unreadMessageCount[conversationId]) {
              unreadMessageCount[conversationId] = {
              count: 0,
              object_id : [],
              receiverId: activity.subId,
            };
         }
         let {count , objectId}  = callback(activity);
         unreadMessageCount[conversationId].count = count
          unreadMessageCount[conversationId].object_id = objectId 
    });

    
     values = Object.entries(unreadMessageCount).map((key)=>{
          
  
          return{
            conversationId:key[0],
            count:key[1].count,
            receiverId:key[1].receiverId,
            objectId:key[1].object_id
          }
      

  })
  
    setCounts(values);

  }, [lastActivity, localMessage]);


  return <></>;
}

export default UnreadMessages;
