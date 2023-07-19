import { useState, useEffect, useContext, useRef, createContext, Suspense, lazy } from 'react';
import { Box, styled,Checkbox } from '@mui/material';

import { io } from 'socket.io-client';

import { getMessages, newMessages } from '../../../service/api';
import { AccountContext } from '../../../context/AccountProvider';


 
import Loader from '../../loader/Loader';
import DeleteChat from './deleteChat';
import { deleteFunction } from './ChatBox';
import { CiWarning } from 'react-icons/ci';
import './css/chatbox.css'
import { formatDate } from '../../../utils/common-utils';
import { generalUtils } from '../ChatDialog';

//components
import Footer from './Footer';
import UnreadTextMessage from './UnreadTextMessage';
const Message = lazy(()=>import('./Message'))

const Wrapper = styled(Box)`
background-color: #D9AFD9;
background-image: linear-gradient(0deg, #D9AFD9 0%, #97D9E1 100%);
    background-size: 50%;
    border-radius:8px;
    width:100%
    
`;
const UnreadMes = styled(Box)`
  display: flex;
  justify-content: center;
  border-radius: 18px;
  background: white;
  color: black;
  width: 200px;
  box-shadow: inset 0px 5px 10px 0px rgba(255, 255, 255, 0.5),
    0px 5px 20px 10px rgba(0, 0, 0, 0.5);
  font-size: 18px;
  margin-left:45%;
`;


const StyledFooter = styled(Box)`
    height: 55px;
    background: #ededed;
    // position: absolute;
    width: 100%;
    // bottom: 0
`;
    
const Component = styled(Box)`
    height: 80vh;
    overflow-y: scroll;
`;

const Container = styled(Box)`
    padding: 1px 80px;
`;




const Messages = ({ person, conversation, display, setDisplay}) => {

   ;
    const [incomingMessage, setIncomingMessage] = useState(null);
    const [unreadTextMessages, setUnreadTextMessages] = useState([])
    const [value, setValue] = useState();
    const [file, setFile] = useState();
    const [image, setImage] = useState();
    const [offline, setOffline] = useState(false)
    
    const scrollRef = useRef();

   
    const { account, socket, newMessageFlag, setNewMessageFlag, activeUsers, } = useContext(AccountContext);
    const {messages, setMessages,uRMEvent, setURMEvent,counts, setCounts} = useContext(generalUtils) 
    const {typing, setIsTyping, setGetTyping, getTyping, deleted, setDeleted} = useContext(deleteFunction)
    const [upMessages,setUpMessages] = useState([])
  
    const receiverId1 = conversation?.members?.find(member => member !== account.sub);
    useEffect(()=>{
        let typeMessage = {};
        if(typing){
            typeMessage = {
                senderId: account.sub,
                receiverId: receiverId1,
                conversationId: conversation._id,
                type: 'text',
                text:typing
            };
            
            receiverId1 && socket.current.emit("typing", typeMessage)
            setIsTyping(false)
            
        }
        
    },[typing])
    
    useEffect(()=>{
        socket.current.on('typer',(data)=>{
            setGetTyping(true)
            // setGetTyping(data.text)
            setTimeout(() => {
                setGetTyping(false)
            }, 2000);
        }
        )
        
    },[getTyping])
    

    useEffect(() => {
        socket.current.on('getMessage', data => {
            setURMEvent(prev => !prev);
            
            setIncomingMessage({
                ...data,
                createdAt:Date.now()
            })
            
        })
    }, []);
    
    
    useEffect(()=>{
        let deleteMessage = {
            senderId: account.sub,
            receiverId: receiverId1,
            conversationId: conversation._id,
        };
        if(deleted){

            receiverId1 && socket.current.emit("deleted", deleteMessage)
        }
    },[deleted])

    useEffect(()=>{
        socket.current.on('deletion',(data)=>{
            setDeleted(true)
        })
    },[])

    useEffect(()=>{
        socket.current.on('offline',()=>{
            setOffline(true)
            
            setTimeout(() => {
                setOffline(false)
            }, 10000);
        })
    },[getTyping])

    useEffect(() => {
        const getMessageDetails = async () => {
            let data = await getMessages(conversation?._id);
            setMessages(data?.messages);
        } 
        getMessageDetails();
     
    }, [conversation?._id, person._id, newMessageFlag]);

    useEffect(() => {
        const getMessageDetails = async () => {
            let data = await getMessages(conversation?._id);
            setMessages(data?.messages);
        }
        getMessageDetails();
        setDeleted(false)
    },[deleted]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ transition: "smooth" })
    }, [messages]);

    useEffect(() => {
        incomingMessage && conversation?.members?.includes(incomingMessage.senderId) && 
            setMessages((prev) => [...prev, incomingMessage]);
        
    }, [incomingMessage, conversation]);
    
    const receiverId = conversation?.members?.find(member => member !== account.sub);
    
    const sendText = async (e ,code2) => {
        let code = e.keyCode || e.which;
        if(!value) return;

        if(code === 13 || code2 ===13) { 
            let message = {};
            if (!file) {
                message = {
                    senderId: account.sub,
                    receiverId: receiverId,
                    conversationId: conversation._id,
                    type: 'text',
                    text: value
                };
            } else {
                message = {
                    senderId: account.sub,
                    conversationId: conversation._id,
                    receiverId: receiverId,
                    type: 'file',
                    text: image
                };
            }

            socket.current.emit('sendMessage', message);

            await newMessages(message);

            setValue('');
            setFile();
            setImage('');
            setNewMessageFlag(prev => !prev);
        } 
    }

   


    return (
        <>
        <Wrapper>

            
            <div className='offline-container' style={{display:offline?'flex':'none'}}>
                <span className='offline'>User Offline <CiWarning/></span>
            </div>  

            <Component>
                <Suspense fallback={<Loader/>}>
                    
            <UnreadTextMessage  messages = {messages} 
                                setMessages = {setMessages} 
                                UnreadTextMessage = {unreadTextMessages}  
                                setUnreadTextMessages = {setUnreadTextMessages} 
                                counts={counts} 
                                setCounts = {setCounts} 
                                conversation = {conversation} 
                                uRMEvent={uRMEvent}
                                personId = {person._id}
                                upMessages = {upMessages}
                                setUpMessages = {setUpMessages}/>


                    {
                        upMessages.length?
                        upMessages?.map((message, index) => (
                            <>
                            
                            <Container ref={scrollRef}>
                                <Message key={index} message={message} display={display} setDisplay={setDisplay} />
                                
                            </Container>
                            
                            </>
                        ))
                        :
                        messages && messages.map((message, index) => (
                            <>
                            
                            <Container ref={scrollRef}>
                                <Message key={index} message={message} display={display} setDisplay={setDisplay} />
                                
                            </Container>
                            
                            </>
                        ))

                    }
                    
                    {!unreadTextMessages.length ? null : <UnreadMes>unread Messages</UnreadMes>}

                    {
                        
                        unreadTextMessages && unreadTextMessages.map((message, index) => (
                            <>
                            
                            <Container ref={scrollRef}>
                                
                                <Message key={index} message={message} display={display} setDisplay={setDisplay} />
                                
                            </Container>
                            
                            </>
                        )) 
                    
                }
                </Suspense>
            {activeUsers?.find((user) => user.sub === person.sub)?getTyping
            &&
            <div className="chat-bubble">
            <div className="typing">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            </div>
            </div>
            :null
            }
           
            </Component>
            <DeleteChat/>
     
            <Footer 
                sendText={sendText} 
                value={value} 
                setValue={setValue} 
                setFile={setFile} 
                file={file} 
                setImage={setImage}
                setIsTyping={setIsTyping}
            />
       
        </Wrapper> 
        </>
    )
  
}

export default Messages;