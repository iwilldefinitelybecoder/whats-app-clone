import { createContext, useContext, useState } from 'react';
import { Dialog, styled, Box } from '@mui/material';

import { UserContext } from '../../context/UserProvider';

//components
import Menu from './menu/Menu';
import ChatBox from './chat/ChatBox';
import EmptyChat from './chat/EmptyChat';


const Component = styled(Box)`
    display: flex;
    border-radius:5px;
    padding-top:50px;
    
`;
    
const LeftComponent = styled(Box)`
    min-width: 280px;
    background-color:black;
    color:white
`;
    
const RightComponent = styled(Box)`
    width: 80%;
    min-width: 300px;
    height: 100%;
    border-left: 1px solid rgba(0, 0, 0, 0.14);
`;

const dialogStyle = {
    height: '95%',
    width: '100%',
    margin: '20px',
    maxWidth: '100%',
    maxHeight: '100%',
    borderRadius:'8px',
    boxShadow: 'none',
    overflow: 'hidden',

};

export const generalUtils = createContext(null)

const ChatDialog = () => {

    const { person } = useContext(UserContext);

    const [counts, setCounts] = useState([])
    const [conversation, setConversation] = useState({});
    const [messages, setMessages] = useState([])
    const [uRMEvent, setURMEvent] = useState(false)
    const [isChecked, setIsChecked] = useState(false);

    return (
        <Dialog 
        open={true} 
        BackdropProps={{style: {backgroundColor: 'unset'}}}
        PaperProps={{ sx: dialogStyle }}
        maxWidth={'md'}
    >
      
        <generalUtils.Provider value={{conversation,
                                        setConversation,
                                        messages,
                                        setMessages,
                                        uRMEvent,
                                        setURMEvent,
                                        counts,
                                        setCounts,
                                        isChecked,
                                        setIsChecked}}>
        
            <Component>
                <LeftComponent>
                    <Menu/>
                </LeftComponent>
                <RightComponent>
               
                    {   
                        Object.keys(person).length  ? <ChatBox/> : <EmptyChat />
                    }
                </RightComponent>
            </Component>
        </generalUtils.Provider>
        </Dialog>
    )
}

export default ChatDialog;