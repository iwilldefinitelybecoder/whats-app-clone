import { useContext, useState, useEffect,createContext } from 'react';

import { Box } from '@mui/material';


import { UserContext } from '../../../context/UserProvider';
import { AccountContext } from '../../../context/AccountProvider';
import { getConversation } from '../../../service/api';

//components
import ChatHeader from './ChatHeader';
import Messages from './Messages';
import { generalUtils } from '../ChatDialog';

export const deleteFunction = createContext(null)

const ChatBox = () => {
    const { person } = useContext(UserContext);
    const { account } = useContext(AccountContext);
    const {conversation, setConversation} = useContext(generalUtils)
    const [display, setDisplay]  = useState('none')
    const [deleteMessage, setDeleteMessage] = useState([])
    const [deleteTheChat,setDeleteTheChat] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const [event, setEvent] = useState([])
    const [typing, setIsTyping] = useState(false)
    const [getTyping, setGetTyping] = useState(false)
    


    useEffect(() => {
        const getConversationDetails = async () => {
            let data = await getConversation({ senderId: account.sub, receiverId: person.sub });
            setConversation(data);
        }
        getConversationDetails();
    }, [person.sub]);

   

    return (
        <Box style={{height: '75%'}}>
            <deleteFunction.Provider value={{
                                            event
                                            ,setEvent,
                                            deleteMessage,
                                            setDeleteMessage,
                                            deleteTheChat,
                                            setDeleteTheChat,
                                            setDisplay,
                                            typing, 
                                            setIsTyping,
                                            getTyping, 
                                            setGetTyping,
                                            deleted,
                                            setDeleted,
                                            }}>

            <ChatHeader person={person}  display={display} setDisplay={setDisplay} />
            
            <Messages person={person} conversation={conversation}   display={display} setDisplay={setDisplay} />
            </deleteFunction.Provider>
        </Box>
    )
}

export default ChatBox;