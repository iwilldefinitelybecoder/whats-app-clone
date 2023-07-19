import { getAllConversation } from "../service/api";

export async function sortChats(users,conversation){
    const arr = [];
    const data = await getAllConversation()

    data?.forEach((value,index)=>{
        console.log(value.members,index)
        users?.forEach((user,i)=>{
          
            if( value.members[0] === user.sub ||  value.members[1]  === user.sub){
                const values  = users.filter(userr=>userr.sub === user.sub)
                const time = value.updatedAt
                const obj = {values:values,time:time}
                const ans = arr.find(ar=>ar.values[0].sub===values[0].sub)
                if(!ans){

                    arr.push(obj)
                }
            }
        })
    })
  
    arr?.sort((a, b) => new Date(b.time) - new Date(a.time));
    const sortedUserList = arr?.map(ar=>{
        return ar.values[0]
    })
  
    return sortedUserList
    
}