import { Suspense, useContext, useEffect } from 'react';

import Cookies from 'js-cookie';
import { AppBar, Toolbar, styled, Box } from '@mui/material';
import jwt_decode from "jwt-decode";
import { AccountContext } from '../context/AccountProvider';

//components
import ChatDialog from './chat/ChatDialog';
import LoginDialog from './account/LoginDialog';
import { addUser } from '../service/api';
import Loader from './loader/Loader';
import { emptyChatImage } from '../constants/data';

const Component = styled(Box)`
    height: 100vh;
    background: #ECF8F9;
    border-radius:8px;
   
   
`;

const Header = styled(AppBar)`
    background-color: #D9AFD9;
    background-image: linear-gradient(0deg, #D9AFD9 0%, #97D9E1 100%);
    background-size: 50%;
    height: 125px;
    box-shadow: none;
`;
    
const LoginHeader = styled(AppBar)`
background-color: #D9AFD9;
background-image: linear-gradient(0deg, #D9AFD9 0%, #97D9E1 100%);
    height: 200px;
    box-shadow: none;
    display:flex;
    align-items:center;
    
`;

const Messenger = () => {
    const { account, setAccount, setShowloginButton, setShowlogoutButton } = useContext(AccountContext);
    let cookieValue 
    cookieValue = Cookies.get('Gid');

    const cookieLoginSuccess = async (res) => {
        let decoded = jwt_decode(cookieValue); 
        setAccount(decoded);
        setShowloginButton(false);
        setShowlogoutButton(true);
        await addUser(decoded);
    };
   useEffect(()=>{
    cookieValue && cookieLoginSuccess()
   },[])
    return (
        <Component>
            {
                account ? 
                <>
                <Suspense fallback={<Loader/>}>
                    <Header>
                            <Toolbar></Toolbar>
                    </Header>
                    <ChatDialog />
                </Suspense>
                
                </>
                :
                <>
                    <LoginHeader>
                        <Toolbar sx={{fontSize:'35px',padding:'10px',zIndex:'10'}}>Welcome To ChatPulse</Toolbar>
                    </LoginHeader>
                    <LoginDialog />
                </>
            }
        </Component>
    )
}

export default Messenger;