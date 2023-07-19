import { useState, useContext } from 'react';
import Cookies from 'js-cookie'
import { MoreVert } from '@mui/icons-material';
import { Menu, MenuItem, styled } from '@mui/material';

import { googleLogout } from '@react-oauth/google';
import { AccountContext } from '../../../context/AccountProvider';
import { UserContext } from '../../../context/UserProvider';

import { clientId } from '../../../constants/data';

//components
import InfoDrawer from '../../drawer/Drawer'; 

const MenuOption = styled(MenuItem)`
  background-color: #006AFF;
  font-size: 18px;
  padding: 15px 60px 5px 24px;
  color: white;
  
  &:hover {
    background-color:  #006AFF; /* Set your desired background color on hover */
  }
`;

const Logout = styled(googleLogout)`
    border: none;
    box-shadow: none;
`;

const HeaderMenu = () => {
    
    const [open, setOpen] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);
    
    const { setAccount, setShowloginButton, showlogoutButton, setShowlogoutButton } = useContext(AccountContext);
    const { setPerson } = useContext(UserContext);


    const handleClick = (event) => {
        setOpen(event.currentTarget);
    };

    const handleClose = () => {
        setOpen(null);
    };

    const onSignoutSuccess = () => {
        Cookies.remove('Gid')
        alert("You have been logged out successfully");
        console.clear();
        setShowlogoutButton(false);
        setShowloginButton(true);
        setAccount('');
        setPerson({});
        window.location.reload()
    };

    const toggleDrawer = () => {
        setOpenDrawer(true);
    }


    const logout = ()=>{
        console.clear();
        Cookies.remove('Gid')
        console.clear();
        setShowlogoutButton(false);
        setShowloginButton(true);
        setAccount('');
        setPerson({});
        window.location.reload()
    }
    return (
        <>
            <MoreVert onClick={handleClick} style={{color:'white'}}/>
            <Menu
                anchorEl={open}
                keepMounted
                open={open}
                onClose={handleClose}
                getContentAnchorEl={null}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuOption onClick={() => { handleClose(); toggleDrawer()}}>Profile</MenuOption>
                <MenuOption onClick={() => { handleClose(); logout()}}>Logout
                {/* { showlogoutButton ?
                    <Logout
                        clientId={clientId}
                        buttonText="Logout"
                        onLogoutSuccess={onSignoutSuccess}
                    >
                    </Logout> : null
                } */}
                </MenuOption>
            </Menu>
            <InfoDrawer open={openDrawer} setOpen={setOpenDrawer} profile={true} />
        </>
    )
}

export default HeaderMenu;
