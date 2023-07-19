import UserActivity from "../modal/UserActivity.js"

export const updateUserActivity = async (req,res) => {
    try { 
        const data = req.body
        console.log(data)
        const fetchedData =  await UserActivity.findOne({subId:data.subId,conversationId:data.conversationId})
        if(fetchedData === null){
            const NewUpdate = new UserActivity(data)
            try { 
        
                await NewUpdate.save()
                console.log(`save working`)
                res.status(200).json(`new record created`)
            } catch (err) {
                res.status(500).json(err.message)
            }
    
        }else{
            try {
                await UserActivity.findOneAndUpdate({subId:data.subId,conversationId:data.conversationId}, {updatedAt:Date.now()})
                console.log(`working`)
                res.status(200).json(`record updated`)
            } catch (error) {
                
                res.status(500).json(`${error.message} failed to update Data`)
            }   
            
        
        }
    } catch (error) {
        
        res.status(500).json(`failed to update`)
    }
    
   
}

export const getUserActivity = async (req,res)=>{ 
    try {
        const data = await UserActivity.find({subId:req.params.id})
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error.message)
    }
}