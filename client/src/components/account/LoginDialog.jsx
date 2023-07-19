import { useContext, useEffect } from 'react';
import  Cookies from 'js-cookie'
import { Dialog, Typography, List, ListItem, Box, styled } from '@mui/material';

import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";

import { addUser } from '../../service/api';
import { AccountContext } from '../../context/AccountProvider';
import { qrCodeImage } from '../../constants/data';

const Component = styled(Box)`
    display: flex; 
    background:black;
    color:white;
    border-radius:8px;
`;

const Container = styled(Box)`
    padding: 56px 0 56px 56px;
`;

const QRCOde = styled('img')({
    margin: '50px 0 0 50px',
    height: 264,
    width: 264
});

const Title = styled(Typography)`
    font-size: 26px;
    margin-bottom: 25px;
    color:white
    font-family: Segoe UI,Helvetica Neue,Helvetica,Lucida Grande,Arial,Ubuntu,Cantarell,Fira Sans,sans-serif;
    font-weight: 300;
`;

const StyledList = styled(List)`
    &  > li {
        padding: 0;
        margin-top: 15px;
        font-size: 18px;
        line-height: 28px;
        color: white;
    }
`;

const dialogStyle = {
    marginTop: '15%',
    height: '95%',
    width: '60%',
    maxWidth: '100',
    maxHeight: '100%',
    borderRadius: '8px',
    boxShadow: 'none',
    overflow: 'hidden'
}

const LoginDialog = () => {

    const { setAccount,showloginButton, setShowloginButton, setShowlogoutButton } = useContext(AccountContext);
   
   
    const onLoginSuccess = async (res) => {
        let decoded = jwt_decode(res.credential);
        Cookies.set('Gid',res.credential) 
        setAccount(decoded);
        setShowloginButton(false);
        setShowlogoutButton(true);
        await addUser(decoded);
    };
   

    const onLoginFailure = (res) => {
        console.log('Login Failed:', res);
    };

    const onSignoutSuccess = () => {
        alert("You have been logged out successfully");
        console.clear();
        setShowloginButton(true);
        setShowlogoutButton(false);
    };
   
    return (
        <>
         
            <Dialog
            open={true}
            BackdropProps={{style: {backgroundColor: 'unset'}}}
            maxWidth={'md'} 
            PaperProps={{ sx: dialogStyle }}
        >
           <Component>
                <Container>
                    <Title>To use chatPulse on your computer:</Title>
                    <StyledList>
                        <ListItem>1. Open chatPulse on your phone</ListItem>
                        <ListItem>2. Tap Menu Settings and select chatPulse Web</ListItem>
                        <ListItem>3. Point your phone to this screen to capture the code</ListItem>
                    </StyledList>
                </Container>
                <Box style={{position:'relative'}}>
                    <QRCOde src={qrCodeImage} alt="QR Code" />
                    <Box style={{position: 'absolute', top: '50%', transform: 'translateX(25%) translateY(-25%)'}}>
                        { showloginButton ?
                            <GoogleLogin
                            buttonText=""
                            onSuccess={onLoginSuccess}
                            onError={onLoginFailure}
                            
                            /> : null}
                    </Box>
                </Box>
            </Component>
        </Dialog>
                        
   
    </>
    )
    
}

export default LoginDialog;