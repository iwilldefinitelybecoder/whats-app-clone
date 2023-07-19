import { useContext } from 'react';
import { MdSelectAll } from "react-icons/md";
import { Box, Typography, styled } from '@mui/material';
import { Search, MoreVert, Delete, DeleteForeverOutlined, DeleteOutline } from '@mui/icons-material';

import { AccountContext } from '../../../context/AccountProvider';
import { defaultProfilePicture } from '../../../constants/data';
import {useTasks} from './Message'
import { deleteFunction } from './ChatBox';
import { RiChatDeleteFill} from "react-icons/ri";
import { generalUtils } from '../ChatDialog';

const Header = styled(Box)`
    height: 44px;
    background: black;
    color:white;
    display: flex;
    padding: 8px 16px;
    align-items: center;
    margin-top:10px
    z-index:3;
`;
    
const Image = styled('img')({
    width: 40,
    height: 40,
    objectFit: 'cover',
    borderRadius: '50%'
})

const Name = styled(Typography)`
    margin-left: 12px !important;
`;

const RightContainer = styled(Box)`
    margin-left: auto;
    & > svg {
        padding: 8px;
        font-size: 42px;
        color: #000;
    }
`;

const Status = styled(Typography)`
    font-size: 12px !important;
    color: white;
    boxShadow: '-1px 1px 7px rgba(255, 255, 255, 0.4),1px 1px 7px rgba(255, 255, 255, 0.4)'
    margin-left: 12px !important;
`;
const ChatHeader = ({ person, display, setDisplay }) => {
    const url = person.picture || defaultProfilePicture;
    const { activeUsers } = useContext(AccountContext);
    const {setIsChecked,isChecked} = useContext(generalUtils)
    const { setDeleteTheChat, getTyping, deleteTheChat } = useContext(deleteFunction);
    
    function handleDeleteClick() {
 
      console.log(deleteTheChat)
      if(deleteTheChat){
      
        setDeleteTheChat(false);
      }else{
        setDeleteTheChat(true);
        
      }
      
    }
    
          function handelDisplayClick() {
            if (display === 'none') {
              setDisplay('block');
            } else {
              setDisplay('none');
            }
          } 
          
    const handleCheckBoxChange = (event) => {
      const value = event.target.checked
      if(value !== false){
        setIsChecked(true)
      }
      console.log(value)
    };
         
    return (
      <Header >
        <Image src={url} alt="display picture" sx={{boxShadow: '-1px 1px 7px rgba(255, 255, 255, 0.4),1px 1px 7px rgba(255, 255, 255, 0.4)'}} />
        <Box>
          <Name>{person.name}</Name>
          <Status>
            {activeUsers?.find((user) => user.sub === person.sub)?getTyping?'typing...': 'online': 'offline'}
          </Status>
        </Box>
        <RightContainer>
          {display === 'block' && (
            <>
            <DeleteOutline onClick={handleDeleteClick} style={{color:'white'}}/>
            <input type="checkbox"  onChange={handleCheckBoxChange} />
            </>
          )}
          <Search style={{color:'white'}}/ >
          <MoreVert style={{color:'white'}}/>
        </RightContainer>
        <MdSelectAll onClick={handelDisplayClick} value={RiChatDeleteFill}></MdSelectAll>
      </Header>
    );
  };
  
  export default ChatHeader;
  
 