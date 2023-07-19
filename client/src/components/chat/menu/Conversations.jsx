import { useState, useEffect, useContext, Suspense,lazy } from 'react';

import { Box, styled, Divider, filledInputClasses } from '@mui/material';

import { AccountContext } from '../../../context/AccountProvider';

//components

import { getConversation, getConvoActivity, getMessages, getUsers, upLastConvoactivity } from '../../../service/api';
import { generalUtils } from '../ChatDialog';
import Loader from '../../loader/Loader';
import { sortChats } from '../../../utils/sortConversations';

const UnreadMessages = lazy(()=>import('./UnreadMessages'))
const Conversation  = lazy(()=>import('./Conversation'))

const url = 'http://localhost:8000';

const Component = styled(Box)`
    overflow: overlay;
    height: 81vh;
    
`;

const StyledDivider = styled(Divider)`
    margin: 0 0 0 70px;
    background-color: #e9edef;
    opacity: .6;
`;

const Conversations = ({ text }) => {

    const [users, setUsers] = useState([]);
    const [prevConversation, setPrevConversation] = useState([])
    const [lastActivity,setLastActivity] = useState()
    const [localMessage, setLocalMessage] = useState([])
    const [message, setMessage] = useState({});
    const { account, socket, setActiveUsers, newMessageFlag} = useContext(AccountContext);
    const {conversation, setConversation,messages,uRMEvent,counts, setCounts} = useContext(generalUtils)
    
    useEffect(() => { 
        const fetchData = async () => {
            let data = await getUsers();
            let fiteredData = data.filter(user => user.name.toLowerCase().includes(text.toLowerCase()))
           
            let sortedValues = await sortChats(fiteredData,conversation)
            // setUsers(sortedValues)
            
            setUsers(sortedValues);
        }
        fetchData();
    }, [text || counts]);
   
    useEffect(()=>{
        conversation && setPrevConversation([...prevConversation,conversation])
    },[conversation])
    
    useEffect(()=>{
        const preValue = prevConversation[prevConversation.length - 2]
        const keysLength = Object.keys(preValue ?? {}).length;
        if(keysLength){
            socket.current.emit('upConvoActivity', { _id: preValue?._id })
        } 
    },[prevConversation])

    
    useEffect(() => {
        const handleBeforeUnload = async (event) => {
            const data = { subId: account.sub, email: account.email, conversationId: conversation._id};
            await upLastConvoactivity(data);
        };
        
        
        const handleUnload = (event) => {
            handleBeforeUnload(event);
            
        };
        
      
        
        window.addEventListener('beforeunload', handleUnload);
      
        return () => {
          window.removeEventListener('beforeunload', handleUnload);
        };
        
      }, [conversation]);
      


    useEffect(() => {
      
        socket.current.emit('addUser', account);
        socket.current.on("getUsers", users => {
            setActiveUsers(users);
           
        })
    }, [account])

    useEffect(()=>{
        const fetchData = async ()=>{
            const data = {subId:account.sub}
            const response = await getConvoActivity(data)
            setLastActivity(response)
        }
        fetchData()
    },[uRMEvent ])
    useEffect(() => {
        const getMessageDetails = async () => {
            let data = await getMessages(account.sub);
            setLocalMessage(data?.preLoadMessages);
        }
        getMessageDetails();
    },[uRMEvent ]);

    useEffect(()=>{
        async function arrangeChats(){

            let sortedValues = await sortChats(users,conversation)
            // setUsers(sortedValues)
            setUsers(sortedValues);
        }
        arrangeChats()
    },[newMessageFlag||uRMEvent])

    return (
          <Component>
               
                
            <UnreadMessages lastActivity = {lastActivity} localMessage={localMessage} setCounts={setCounts} counts = {counts} />
           
            {
                users && users.map((user, index) => (
                    user.sub !== account.sub && 
                        <>
                            <Conversation user={user} counts = {counts} setCounts={setCounts} message={message} setMessage={setMessage}   />
                            {
                                users.length !== (index + 1)  && <StyledDivider /> 
                            }
                        </>
                ))
            }
        </Component>
 
    )
}

export default Conversations;