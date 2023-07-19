import { useContext, useEffect, useState } from 'react';

import { styled, Box, Typography } from "@mui/material";

import { UserContext } from '../../../context/UserProvider';
import { AccountContext } from '../../../context/AccountProvider';

import { setConversation, getConversation } from '../../../service/api';
import { emptyProfilePicture, secreatKey } from '../../../constants/data';
import { formatDate } from '../../../utils/common-utils';
import UnreadMessage from './UnreadMessage';

const Component = styled(Box)`
    height: 45px;
    display: flex;
    padding: 13px 0;
    cursor: pointer;
`;
    
const Image = styled('img') ({
    width: 50,
    height: 50,
    objectFit: 'cover',
    borderRadius: '50%',
    
    boxShadow: '-1px 1px 7px rgba(255, 255, 255, 0.4),1px 1px 7px rgba(255, 255, 255, 0.4)'
        
});

const Container = styled(Box)`
    display: flex;
`;

const Timestamp = styled(Typography)`
    font-size: 12px;
    margin-left: auto;
    color: white;
    margin-right: 20px;
`;

const Text = styled(Typography)`
    display: block;
    color: white;
    font-size: 14px;
    
`;

const Conversation = ({ user, counts, setCounts}) => {
    const url = user.picture || emptyProfilePicture;
    
    const { setPerson } = useContext(UserContext);
    const { account, newMessageFlag }  = useContext(AccountContext);

    const [message, setMessage] = useState({});

    useEffect(() => {
        const getConversationMessage = async() => {
            const data = await getConversation({ senderId: account.sub, receiverId: user.sub });
            setMessage({ text: data?.message, timestamp: data?.updatedAt, conversationId:data._id });
        }
        getConversationMessage();
    }, [newMessageFlag]);
   
    const getUser = async () => {
        setPerson(user);
        await setConversation({ senderId: account.sub, receiverId: user.sub });
    }

    return (
        <Component onClick={() => getUser()}>
            <Box sx={{ padding:'0 14px'}}>
                <Image src={url} alt="display picture" />
            </Box>
            <Box style={{width: '100%'}}>
                <Container>
                    <Typography>{user.name}</Typography>
                    {
                        counts?.map(count=>{
                            return(
                                <UnreadMessage value = {count} conversationId = {message.conversationId} recieverId={account.sub}/>
                            )
                            
                            
                        })
                    }
                    { 
                        message?.text && 
                        <Timestamp>{formatDate(message?.timestamp)}</Timestamp>        
                    }
                </Container>
                <Box>
                    <Text>{ message?.text === secreatKey? 'message Deleted!!':message?.text?.includes('localhost') ? 'media' : message.text}</Text>
                </Box>
            </Box>
        </Component>
    )
}

export default Conversation;