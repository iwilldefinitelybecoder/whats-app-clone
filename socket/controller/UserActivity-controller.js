import UserActivity from "../modal/UserActivity.js"

export const updateUserActivity = async (usageData) => {
    const NewUpdate = new UserActivity({subId:usageData.subId,email:usageData.email})
     console.log(NewUpdate)
    
    try {
        
        await NewUpdate.save()
        console.log(`userdata updated`)
    } catch (err) {
        console.log(`error while updating ${err.message}`)
    }
}